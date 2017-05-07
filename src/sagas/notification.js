import { fork, call, put, select } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga/effects'
import { USER_LOGIN_SUCCESS } from '../actions'
import { FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType } from 'react-native-fcm'
import { getCurrentId } from '../selectors/user'
import notification from '../utils/notification'

function* onNotification(notif) {
  console.log(notif)
}

function* watchNotification() {
  try {
    const state = yield select()
    const userId = getCurrentId(state)

    notification.requestPermissions(); // for iOS

    const token = yield notification.getFCMToken()

    notification.subscribeToTopic('/topics/setup_topic')
    notification.subscribeToTopic(`/topics/user/${userId}`)

    yield notification.on(FCMEvent.Notification, onNotification)

  } catch (error) {
    console.log(error)
  }
}

function* flow() {
  yield [
    takeEvery(USER_LOGIN_SUCCESS, watchNotification)
  ]
}

export default flow
