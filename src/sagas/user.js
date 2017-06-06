import { put, takeEvery } from 'redux-saga/effects'
import { USER_LOGIN, USER_LOGIN_SUCCESS, USER_LOGIN_ERROR, USER_LOGOUT, USER_LOGOUT_SUCCESS, USER_LOGOUT_ERROR, USER_NEED_LOGIN, USER_FACEBOOK_LOGIN, USER_REGISTER } from '../actions'
import userModel from '../models/user'
import { REHYDRATE } from 'redux-persist/constants'
import { firebaseAut, logInWithReadPermissions, firebaseAuthFacebook, getCurrentUser, getCurrentAccessToken, signOut, createUserWithEmail } from '../api'

function* userRegister({ payload: { username, password } }) {
  try {
    const user = yield createUserWithEmail(username, password)
    console.log(user)
    yield put({ type: USER_LOGIN_SUCCESS, payload: userModel(user) })
  } catch ({ message }) {
    yield put({ type: USER_LOGIN_ERROR, payload: message })
  }
}

function* login({ payload: { username, password } }) {
  try {
    const user = yield firebaseAut(username, password)
    yield put({ type: USER_LOGIN_SUCCESS, payload: userModel(user) })
  } catch ({ message }) {
    yield put({ type: USER_LOGIN_ERROR, payload: message })
  }
}

function* loginFacebook() {
  try {
    const token = yield logInWithReadPermissions()
    if (token) {
      const user = yield firebaseAuthFacebook(token)
      yield put({ type: USER_LOGIN_SUCCESS, payload: userModel(user) })
    } else {
      const token = yield getCurrentAccessToken()
      const user = yield firebaseAuthFacebook(token)
      yield put({ type: USER_LOGIN_SUCCESS, payload: userModel(user) })
    }
  } catch ({ message }) {
    yield put({ type: USER_LOGIN_ERROR, payload: message })
  }
}

function* logout() {
  try {
    yield signOut()
    yield put({ type: USER_LOGOUT_SUCCESS })
  } catch ({ message }) {
    yield put({ type: USER_LOGOUT_ERROR, payload: message })
  }
}

function* checkUser() {
  // return yield put({ type: USER_NEED_LOGIN })
  try {
    const { authenticated, user } = yield getCurrentUser()
    if (authenticated) yield put({ type: USER_LOGIN_SUCCESS, payload: userModel(user) })
    else {
      const facekookToken = yield getCurrentAccessToken()
      if (facekookToken) {
        const user = yield firebaseAuthFacebook(facekookToken)
        yield put({ type: USER_LOGIN_SUCCESS, payload: userModel(user) })
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
    takeEvery(USER_REGISTER, userRegister),
    takeEvery(REHYDRATE, checkUser)
  ]
}

export default flow
