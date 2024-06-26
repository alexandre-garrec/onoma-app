import { select, takeEvery } from 'redux-saga/effects'
import {
  USER_LOGIN_SUCCESS,
  USER_CLEAR_BADGE
} from '../actions'
import { FCMEvent } from 'react-native-fcm'
import { getCurrentId } from '../selectors/user'
import notification from '../utils/notification'
import { update } from '../api'
import NavigationActions from '../utils/navigationActions'

function* onNotification({ notification }) {
  try {
    const name = notification.body.split(' ')[4]
    NavigationActions.showLightBox({
      screen: 'example.match.modal',
      animationType: 'slide-up',
      style: {
        backgroundBlur: 'light',
        backgroundColor: '#b474af80'
      },
      passProps: {
        name: name
      }
    })
  } catch (e) {
    console.log(e)
  }
}

function* watchNotification() {
  try {
    const state = yield select()
    const userId = getCurrentId(state)
    notification.requestPermissions() // for iOS

    notification.subscribeToTopic('/topics/setup_topic')

    const token = yield notification.getFCMToken()
    yield update({ [`user/${userId}/notificationToken/${token}`]: true })
    yield notification.on(FCMEvent.Notification, onNotification)
  } catch (error) {
    console.log(error)
  }
}

function* clearBadge() {
  try {
    const state = yield select()
    const userId = getCurrentId(state)
    notification.removeAllDeliveredNotifications()
    notification.setBadgeNumber(0)
    yield update({ [`user/${userId}/badge`]: 0 })
  } catch (e) { }
}

function* flow() {
  yield [
    takeEvery(USER_CLEAR_BADGE, clearBadge),
    takeEvery(USER_LOGIN_SUCCESS, watchNotification)
  ]
}

export default flow
