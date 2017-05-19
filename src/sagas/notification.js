import { select, takeEvery } from 'redux-saga/effects'
import { USER_LOGIN_SUCCESS } from '../actions'
import { FCMEvent } from 'react-native-fcm'
import { getCurrentId } from '../selectors/user'
import notification from '../utils/notification'
import { update } from '../api'

function * onNotification (notif) {
  console.log(notif)
}

function * watchNotification () {
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

function * flow () {
  yield [
    takeEvery(USER_LOGIN_SUCCESS, watchNotification)
  ]
}

export default flow
