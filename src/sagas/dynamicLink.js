import { fork, select } from 'redux-saga/effects'
import { onLink } from '../utils/deepLink'
import { extractParams } from '../utils'
import { update } from '../api'
import { getCurrentId } from '../selectors/user'

const BASE_URL = 'https://ono.ma/'

function* onDynamicLink({ url }) {
  try {
    const state = yield select()
    const userId = getCurrentId(state)
    const { invite } = extractParams(url, BASE_URL)
    const channelId = `${invite}_${userId}`
    yield update({
      [`channel/${channelId}/users/${userId}`]: true,
      [`channel/${channelId}/users/${invite}`]: true,
      [`user/${userId}/channels/${channelId}`]: true,
      [`user/${invite}/channels/${channelId}`]: true
    })
  } catch (e) { console.log(e) }
}

function* watchLink() {
  try {
    yield onLink(onDynamicLink)
  } catch (error) {
    console.log(error)
  }
}

function* flow() {
  yield [
    fork(watchLink)
  ]
}

export default flow
