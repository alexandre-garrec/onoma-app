import { select, takeEvery, put } from 'redux-saga/effects'
import { USER_LOGIN_SUCCESS, USER_CLEAR_BADGE, MODAL_MATCH_OPEN } from '../actions'
import { FCMEvent } from 'react-native-fcm'
import { getCurrentId } from '../selectors/user'
import notification from '../utils/notification'
import { update } from '../api'

function* onNotification({ notification }) {
  const { body } = notification
  const name = body.replace('Vous avez le prénom ', '').replace(' en commun', '')
  yield put({ type: MODAL_MATCH_OPEN, payload: name })
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
