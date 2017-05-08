import { fork, call, put, select } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga/effects'
import { USER_LOGIN, USER_LOGIN_SUCCESS, USER_LOGIN_ERROR, USER_LOGOUT, USER_LOGOUT_SUCCESS, USER_LOGOUT_ERROR, USER_NEED_LOGIN } from '../actions'
import { FireSaga } from '../config'
import Firestack from 'react-native-firestack'
import userModel from '../models/user'
import notification from '../utils/notification'
import { getCurrentId } from '../selectors/user'
import { AccessToken } from 'react-native-fbsdk'
import { REHYDRATE } from 'redux-persist/constants'

const firestack = new Firestack()

const firebaseAuth = (email, password) => firestack.auth.signInWithEmail(email, password)
  .then(data => data.user)

 const firebaseAuthFacebook = (token) =>
  firestack.auth.signInWithProvider('facebook', token, '')
    .then(data => data.user)

const getCurrentAccessToken = () =>
  AccessToken.getCurrentAccessToken().then(data => data ? data.accessToken.toString() : false)

const getToken = () => firestack.auth.getToken()
  .then(res =>res.token)

const getCurrentUser = () =>
 firestack.auth.getCurrentUser().then(user => user).catch(() => ({authenticated: false}))

function* login({ payload: { username, password, token } }) {
  try {
    const apiCall = token
      ? call(firebaseAuthFacebook, token)
      : call(firebaseAut, username, password)
    const user = yield apiCall
    yield put({ type: USER_LOGIN_SUCCESS, payload: userModel(user)})
  } catch ({ message }) {
    yield put({ type: USER_LOGIN_ERROR, payload: message})
  }
}

function* logout() {
  try {
    const state = yield select()
    const userId = getCurrentId(state)

    yield firestack.auth().signOut()
    notification.unsubscribeFromTopic(`/topics/user/${userId}`)
    yield put({ type: USER_LOGOUT_SUCCESS })
  } catch ({ message }) {
    yield put({ type: USER_LOGOUT_ERROR, payload: message})
  }
}

function* checkUser () {
  console.log('checkUser')
  try {
    const { authenticated, user } = yield getCurrentUser()
    console.log('user', user)
    yield put({ type: USER_LOGIN_SUCCESS, payload: userModel(user)})
    if (!authenticated) yield put({ type: USER_NEED_LOGIN })
  } catch (e) {
    console.log('error', e)
    yield put({ type: USER_NEED_LOGIN })
  }

}

function* flow() {
  yield [
    takeEvery(USER_LOGIN, login),
    takeEvery(USER_LOGOUT, logout),
    takeEvery(REHYDRATE, checkUser)
  ]
}

export default flow
