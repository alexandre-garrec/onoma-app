import { fork, takeEvery, select, put } from 'redux-saga/effects'
import FirebaseLink from '../utils/FirebaseLink'
import { extractParams } from '../utils'
import { update, addListenerOnRef } from '../api'
import { getCurrentId } from '../selectors/user'
import { getLink } from '../selectors/gui'
import NavigationActions from '../utils/navigationActions'
import { SET_LINK, USER_LOGIN_SUCCESS, USER_SET_CHANNEL_SUCCESS, USER_SET_DYNAMICLINK } from '../actions'

const BASE_URL = 'https://ono.ma/'

function* onDynamicLink({ payload: url }) {
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
      yield put({ type: USER_SET_CHANNEL_SUCCESS })

      NavigationActions.showLightBox({
        screen: 'example.join.modal',
        animationType: 'slide-up',
        style: {
          backgroundBlur: 'dark',
          backgroundColor: '#ffffff80'
        }
      })
    }
  } catch (e) { }
}

function* initDeepLink() {
  try {
    const initialLink = yield FirebaseLink.getInitialLink()
    if (initialLink) {
      yield fork(onDynamicLink, { payload: initialLink })
    }
    yield FirebaseLink.onLink(onDynamicLink)
  } catch (e) {
    console.log(e)
  }
}

function* watchUserDinamiclink() {
  try {
    const state = yield select()
    const userId = getCurrentId(state)
    yield addListenerOnRef(`user/${userId}/link`, function* (snapshot) {
      const val = snapshot.val()
      if (val) {
        const { shortLink } = val
        yield put({ type: USER_SET_DYNAMICLINK, payload: shortLink })
      }
    })
  } catch (error) { }
}

function* flow() {
  yield [
    takeEvery(USER_LOGIN_SUCCESS, linkUser),
    takeEvery(USER_LOGIN_SUCCESS, watchUserDinamiclink),
    fork(initDeepLink)
  ]
}

export default flow
