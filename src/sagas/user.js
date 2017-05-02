import { fork, call, put, select } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga/effects'
import { USER_LOGIN, USER_LOGIN_SUCCESS, USER_LOGIN_ERROR, USER_LOGOUT, USER_LOGOUT_SUCCESS, USER_LOGOUT_ERROR } from '../actions'
import { FireSaga } from '../config'
import { save, load } from '../utils/localStorage'

const userModel = ({ uid, email, credential }) => ({
  id: uid,
  email,
})

function* login({ payload: { username, password } }) {
  try {
    const user = yield FireSaga.auth().signInWithEmailAndPassword(username, password)
    yield save('user', { username, password })
    yield put({ type: USER_LOGIN_SUCCESS, payload: userModel(user)})
  } catch ({ message }) {
    yield put({ type: USER_LOGIN_ERROR, payload: message})
  }
}

function* logout() {
  try {
    yield FireSaga.auth().signOut()
    yield save('user', false)
    yield put({ type: USER_LOGOUT_SUCCESS })
  } catch ({ message }) {
    yield put({ type: USER_LOGOUT_ERROR, payload: message})
  }
}
function* getlocalUser() {
  try {
    const userData = yield load('user')
    if (userData) {
      const { username, password } = userData
      const user = yield FireSaga.auth().signInWithEmailAndPassword(username, password)
      yield put({ type: USER_LOGIN_SUCCESS, payload: userModel(user)})
    }
  } catch ({ message }) {
    yield put({ type: USER_LOGIN_ERROR, payload: message})
  }
}

function* flow() {
  yield [
    takeEvery(USER_LOGIN, login),
    takeEvery(USER_LOGOUT, logout),
    fork(getlocalUser)
  ]
}

export default flow
