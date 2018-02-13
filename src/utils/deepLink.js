import { NativeEventEmitter, NativeModules } from 'react-native'
import { call, fork } from 'redux-saga/effects'
import createChannel from './channel'

const { DeepLink } = NativeModules

const firebaseDynamicLink = new NativeEventEmitter(DeepLink)

function* listen(channel, saga) {
  while (true) {
    const data = yield call(channel.take)
    yield fork(saga, data)
  }
}

export const onLink = cb => {
  const channel = createChannel()
  firebaseDynamicLink.addListener('firebase_link', link => channel.put(link))
  return fork(listen, channel, cb)
}
