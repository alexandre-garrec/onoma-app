import { put, takeEvery, select, call } from 'redux-saga/effects'
import { USER_LOGIN, USER_LOGIN_SUCCESS, USER_LOGIN_ERROR, USER_LOGOUT, USER_LOGOUT_SUCCESS, USER_LOGOUT_ERROR, USER_NEED_LOGIN, USER_FACEBOOK_LOGIN, USER_REGISTER, SET_FILTER, NAME_LIST_UPDATE, GET_NAME_SUCCESS } from '../actions'
import userModel from '../models/user'
import { REHYDRATE } from 'redux-persist/constants'
import { get, firebaseAuth, logInWithReadPermissions, firebaseAuthFacebook, getCurrentUser, getCurrentAccessToken, signOut, createUserWithEmail, getNamebyRequest } from '../api'
import { getFilters } from '../selectors/name'
import { getOrigins } from '../selectors/origin'

export const getSnapshotKeysVal = snapshot => {
  const val = snapshot.val()
  return snapshot.val()
}

function* onSetFilter() {
  try {
    const state = yield select()
    const filters = getFilters(state)
    // const userId = getCurrentId(state)
    const origins = getOrigins(state)

    /* yield update({
      [`user/${userId}/filters`]: filters
    }) */

    const genres = (() => {
      switch (true) {
        case filters.isMale && filters.isFemale:
          return ['isMale', 'isFemale']
        case filters.isMale:
          return ['isMale']
        case filters.isFemale:
          return ['isFemale']
        default: return ['isMale', 'isFemale']
      }
    })()

    const requests = genres.reduce((memo, genre) => {
      if (filters.origin && filters.origin.length) {
        return [
          ...memo,
          ...filters.origin.map(origin =>
            call(getNamebyRequest, {
              where: { genreAndOrgin: `${genre}_${origin}` }
            }))
        ]
      } else {
        return [
          ...memo,
          ...[...Object.keys(origins), 'undefined'].map(origin =>
            call(getNamebyRequest, {
              where: { genreAndOrgin: `${genre}_${origin}` }
            }))
        ]
      }
    }, [])

    const namesSnapshtot = yield requests

    const namesArray = namesSnapshtot.reduce((memo, names) =>
      ({ ...memo, ...getSnapshotKeysVal(names) })
      , {})

    yield [
      put({ type: NAME_LIST_UPDATE, payload: Object.keys(namesArray) }),
      put({ type: GET_NAME_SUCCESS, payload: namesArray })
    ]

  } catch (e) { console.log(e) }
}

function* userRegister({ payload: { username, password } }) {
  try {
    const user = yield createUserWithEmail(username, password)
    yield onUserLogin(user)
  } catch ({ message }) {
    yield put({ type: USER_LOGIN_ERROR, payload: message })
  }
}

function* login({ payload: { username, password } }) {
  try {
    const user = yield firebaseAuth(username, password)
    yield onUserLogin(user)
  } catch ({ message }) {
    yield put({ type: USER_LOGIN_ERROR, payload: message })
  }
}

function* loginFacebook() {
  try {
    const token = yield logInWithReadPermissions()
    if (token) {
      const user = yield firebaseAuthFacebook(token)
      yield onUserLogin(user)
    } else {
      const token = yield getCurrentAccessToken()
      const user = yield firebaseAuthFacebook(token)
      yield onUserLogin(user)
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
  try {
    const { authenticated, user } = yield getCurrentUser()
    if (authenticated) yield onUserLogin(user)
    else {
      const facekookToken = yield getCurrentAccessToken()
      if (facekookToken) {
        const user = yield firebaseAuthFacebook(facekookToken)
        yield onUserLogin(user)
      }
      yield put({ type: USER_NEED_LOGIN })
    }
  } catch (e) {
    yield put({ type: USER_NEED_LOGIN })
  }
}


function* onUserLogin(user) {
  const userBdd = yield get(`user/${user.uid}`)
  yield put({ type: USER_LOGIN_SUCCESS, payload: userModel({ ...user, ...userBdd }) })
}

function* flow() {
  yield [
    takeEvery(USER_LOGIN, login),
    takeEvery(USER_LOGOUT, logout),
    takeEvery(USER_FACEBOOK_LOGIN, loginFacebook),
    takeEvery(USER_REGISTER, userRegister),
    takeEvery(SET_FILTER, onSetFilter),
    takeEvery(REHYDRATE, checkUser)
  ]
}

export default flow
