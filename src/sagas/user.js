import { fork, call, put, select } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga/effects'
import { USER_LOGIN, USER_LOGIN_SUCCESS, USER_LOGIN_ERROR, USER_LOGOUT, USER_LOGOUT_SUCCESS, USER_LOGOUT_ERROR } from '../actions'
import { FireSaga } from '../config'
import { save, load } from '../utils/localStorage'
import Firestack from 'react-native-firestack'
const Permissions = require('react-native-permissions');

import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';


const firestack = new Firestack();

const firebaseAuth = (email, password) => firestack.auth.signInWithEmail(email, password)
  .then(data => data.user)

const userModel = ({ uid, email, credential }) => ({
  id: uid,
  email,
})

function* login({ payload: { username, password } }) {
  try {
    console.log(username, password)
    const user = yield firebaseAuth(username, password)
    console.log(user)
    yield save('user', { username, password })
    yield put({ type: USER_LOGIN_SUCCESS, payload: userModel(user)})
  } catch ({ message }) {
    yield put({ type: USER_LOGIN_ERROR, payload: message})
  }
}

function* logout() {
  try {
    yield FireSaga.auth().signOut()
    yield save('user', false)
    yield put({ type: USER_LOGOUT_SUCCESS })
  } catch ({ message }) {
    yield put({ type: USER_LOGOUT_ERROR, payload: message})
  }
}

const requestPermission = (name) =>  Permissions.requestPermission(name).then(status => status)

function* getlocalUser() {
  try {
    //const status = yield requestPermission('notification')
    //console.log(status)

    //if (status === 'authorized') {
      /*firestack.cloudMessaging.getToken().then(function (token) {
        console.log('device token', token);
      });

      firestack.cloudMessaging.subscribeToTopic("setup_topic").then(function (topic) {
          console.log('Subscribe:', topic);
      }).catch(function(err){
        console.error(err);
      });

      firestack.cloudMessaging.onRemoteMessage(notification => {
        console.log('Received remote notification', notification);
      })

          firestack.cloudMessaging.onLocalMessage(notification => {
        console.log('Received local notification', notification);
      })*/
    //}

    const userData = yield load('user')
    if (userData) {
      const { username, password } = userData
      const user = yield firebaseAuth(username, password)
      yield put({ type: USER_LOGIN_SUCCESS, payload: userModel(user)})

       FCM.requestPermissions(); // for iOS
      FCM.getFCMToken().then(token => {
          console.log(token)
          // store fcm token in your server
      });
      FCM.subscribeToTopic('/topics/setup_topic');

      FCM.on(FCMEvent.Notification, (notif) => {
        console.log(notif)
          // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
          if(notif.local_notification){
            //this is a local notification
          }
          if(notif.opened_from_tray){
            //app is open/resumed because user clicked banner
          }

            //optional
            //iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see the above documentation link.
            //This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
            //notif._notificationType is available for iOS platfrom
            switch(notif._notificationType){
              case NotificationType.Remote:
                notif.finish(RemoteNotificationResult.NewData) //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
                break;
              case NotificationType.NotificationResponse:
                notif.finish();
                break;
              case NotificationType.WillPresent:
                notif.finish(WillPresentNotificationResult.All) //other types available: WillPresentNotificationResult.None
                break;
            }
        })
    FCM.on(FCMEvent.RefreshToken, (token) => {
      console.log(token)
      // fcm token may not be available on first load, catch it here
    });
      FCM.presentLocalNotification({
            title: "My Notification Title",                     // as FCM payload
            body: "My Notification Message",                    // as FCM payload (required)
            sound: "default",                                   // as FCM payload
            priority: "high",                                   // as FCM payload
            click_action: "ACTION",                             // as FCM payload
            badge: 10,                                          // as FCM payload IOS only, set 0 to clear badges
            icon: "ic_launcher",                                // as FCM payload, you can relace this with custom icon you put in mipmap
            my_custom_data:'my_custom_field_value',             // extra data you want to throw
            lights: true,                                       // Android only, LED blinking (default false)
            show_in_foreground: true                                  // notification when app is in foreground (local & remote)
        });
    }

  } catch (error) {
    console.log(error)
    const { message } = error
    yield put({ type: USER_LOGIN_ERROR, payload: message})
  }
}

function* flow() {
  yield [
    takeEvery(USER_LOGIN, login),
    takeEvery(USER_LOGOUT, logout),
    fork(getlocalUser)
  ]
}

export default flow
