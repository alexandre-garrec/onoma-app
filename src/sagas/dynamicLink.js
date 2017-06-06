import { fork, takeEvery, select, put } from 'redux-saga/effects'
import { onLink } from '../utils/deepLink'
import { extractParams } from '../utils'
import { update } from '../api'
import { getCurrentId } from '../selectors/user'
import { getLink } from '../selectors/gui'
import { SET_LINK, USER_LOGIN_SUCCESS } from '../actions'

const BASE_URL = 'https://ono.ma/'

function* onDynamicLink({ url }) {
  yield put({ type: SET_LINK, payload: url })
  yield linkUser()
}

function* linkUser() {
  try {
    const state = yield select()
    const link = getLink(state)
    const userId = getCurrentId(state)
    if (link && userId) {
      const { invite } = extractParams(link, BASE_URL)
      const channelId = `${invite}_${userId}`
      yield update({
        [`channel/${channelId}/users/${userId}`]: true,
        [`channel/${channelId}/users/${invite}`]: true,
        [`user/${userId}/channels/${channelId}`]: true,
        [`user/${invite}/channels/${channelId}`]: true
      })
    }
  } catch (e) { }
}

function* watchLink() {
  try {
    yield onLink(onDynamicLink)
  } catch (e) { }
}

function* flow() {
  yield [
    takeEvery(USER_LOGIN_SUCCESS, linkUser),
    fork(watchLink)
  ]
}

export default flow
