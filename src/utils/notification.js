import FCM from 'react-native-fcm'
import { call, fork } from 'redux-saga/effects'
import createChannel from './channel'

export const on = (action, cb) => {
  const channel = createChannel()
  FCM.on(action, notification => channel.put(notification))
  return fork(listen, channel, cb)
}

export const getFCMToken = () =>
  FCM.getFCMToken().then(token => token)

export const getBadgeNumber = () =>
  FCM.getBadgeNumber().then(number => number)

function* listen(channel, saga) {
  while (true) {
    const data = yield call(channel.take)
    yield fork(saga, data)
  }
}

export default {
  ...FCM,
  on,
  getFCMToken,
  getBadgeNumber
}
