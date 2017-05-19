import { fork, call, put, select } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga/effects'
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
    yield update({
      [`channel/${invite}/users/${userId}`]: true,
      [`user/${userId}/channels/${invite}`]: true
    })
  } catch (e) {console.log(e)}
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
