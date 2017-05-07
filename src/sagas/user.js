import { fork, call, put, select } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga/effects'
import { USER_LOGIN, USER_LOGIN_SUCCESS, USER_LOGIN_ERROR, USER_LOGOUT, USER_LOGOUT_SUCCESS, USER_LOGOUT_ERROR } from '../actions'
import { FireSaga } from '../config'
import Firestack from 'react-native-firestack'
import userModel from '../models/user'
import notification from '../utils/notification'
import { getCurrentId } from '../selectors/user'

const firestack = new Firestack()

const firebaseAuth = (email, password) => firestack.auth.signInWithEmail(email, password)
  .then(data => data.user)

function* login({ payload: { username, password } }) {
  try {
    const user = yield firebaseAuth(username, password)
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

function* flow() {
  yield [
    takeEvery(USER_LOGIN, login),
    takeEvery(USER_LOGOUT, logout)
  ]
}

export default flow
