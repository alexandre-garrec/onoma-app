import { fork, call, put, select } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga/effects'
import { USER_LOGIN, USER_LOGIN_SUCCESS, USER_LOGIN_ERROR, USER_LOGOUT, USER_LOGOUT_SUCCESS, USER_LOGOUT_ERROR, USER_NEED_LOGIN, USER_FACEBOOK_LOGIN } from '../actions'
import { FireSaga } from '../config'
import Firestack from 'react-native-firestack'
import userModel from '../models/user'
import notification from '../utils/notification'
import { getCurrentId } from '../selectors/user'
import { AccessToken, LoginManager } from 'react-native-fbsdk'
import { REHYDRATE } from 'redux-persist/constants'

const firestack = new Firestack()

const firebaseAuth = (email, password) =>
  firestack.auth.signInWithEmail(email, password).then(data => data.user)

 const firebaseAuthFacebook = (token) =>
  firestack.auth.signInWithProvider('facebook', token, '')
    .then(data => data.user)

const getCurrentAccessToken = () =>
  AccessToken.getCurrentAccessToken().then(data => data ? data.accessToken.toString() : false)

const getToken = () => firestack.auth.getToken()
  .then(res => res.token)

const getCurrentUser = () =>
 firestack.auth.getCurrentUser().then(user => user).catch(() => ({authenticated: false}))

 const logInWithReadPermissions = () =>
  LoginManager.logInWithReadPermissions().then(result => result.accessToken.toString())

const signOut = () =>
 firestack.auth.signOut().then(data => data)

function* login({ payload: { username, password } }) {
  try {
    const user = yield firebaseAut(username, password)
    yield put({ type: USER_LOGIN_SUCCESS, payload: userModel(user)})
  } catch ({ message }) {
    yield put({ type: USER_LOGIN_ERROR, payload: message})
  }
}

function* loginFacebook() {
  try {
    const token = yield logInWithReadPermissions()
    const user = yield firebaseAuthFacebook(token)
    yield put({ type: USER_LOGIN_SUCCESS, payload: userModel(user)})
  } catch ({ message }) {
    yield put({ type: USER_LOGIN_ERROR, payload: message})
  }
}

function* logout() {
  try {
    const state = yield select()
    const userId = getCurrentId(state)

    const data = yield signOut()
    notification.unsubscribeFromTopic(`/topics/user/${userId}`)
    yield put({ type: USER_LOGOUT_SUCCESS })
  } catch ({ message }) {
    yield put({ type: USER_LOGOUT_ERROR, payload: message})
  }
}

function* checkUser () {
  try {
    const { authenticated, user } = yield getCurrentUser()
    if (authenticated) yield put({ type: USER_LOGIN_SUCCESS, payload: userModel(user)})
    else {
      const facekookToken = yield getCurrentAccessToken()
      console.log('facekookToken', facekookToken)
      if (facekookToken) {
         const user = yield firebaseAuthFacebook(facekookToken)
        yield put({ type: USER_LOGIN_SUCCESS, payload: userModel(user)})
      }
      yield put({ type: USER_NEED_LOGIN })
    }
  } catch (e) {
    yield put({ type: USER_NEED_LOGIN })
  }
}

function* flow() {
  yield [
    takeEvery(USER_LOGIN, login),
    takeEvery(USER_LOGOUT, logout),
    takeEvery(USER_FACEBOOK_LOGIN, loginFacebook),
    takeEvery(REHYDRATE, checkUser)
  ]
}

export default flow
