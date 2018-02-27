import { fork, take } from 'redux-saga/effects'

export function* listen(channel, saga) {
  while (true) {
    const payload = yield take(channel)
    yield fork(saga, payload)
  }
}
