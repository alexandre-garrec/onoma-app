import { put, takeEvery, takeLatest, select, call } from 'redux-saga/effects'
import { USER_LOGIN, USER_LOGIN_SUCCESS, USER_LOGIN_ERROR, USER_LOGOUT, USER_LOGOUT_SUCCESS, USER_LOGOUT_ERROR, USER_NEED_LOGIN, USER_FACEBOOK_LOGIN, USER_REGISTER, SET_FILTER, NAME_LIST_UPDATE, GET_NAME_SUCCESS, USER_UPDATE_BADGE, USER_LOADING_SUCCESS } from '../actions'
import userModel from '../models/user'
import { REHYDRATE } from 'redux-persist/constants'
import { update, updateFirebaseUser, getFacebookInfo, get, firebaseAuth, logInWithReadPermissions, firebaseAuthFacebook, getCurrentUser, getCurrentAccessToken, signOut, createUserWithEmail, generateFilter, addListenerOnRef } from '../api'
import { getFilters } from '../selectors/name'
import { getOrigins } from '../selectors/origin'
import { getCurrentId } from '../selectors/user'
import notification from '../utils/notification'

function* onSetFilter() {
  try {
    const state = yield select()
    const filters = getFilters(state)
    const origins = getOrigins(state)
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

    const namesSnapshtot = yield generateFilter(genres, filters, origins)

    const namesArray = namesSnapshtot.reduce((memo, names) =>
      ({ ...memo, ...names.val() })
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
  } catch (e) {
    yield put({ type: USER_LOGIN_ERROR, payload: `Email ou mot de passe incorrect` })
  }
}

function* loginFacebook() {
  try {
    const token = yield logInWithReadPermissions()
    if (token) {
      const user = yield firebaseAuthFacebook(token)
      console.log('loginFacebook', { user })
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
  const facekookToken = yield getCurrentAccessToken()
  if (facekookToken) {
    const info = yield call(getFacebookInfo)
    if (userBdd.photoURL !== info.picture.data.url) {
      // @TODO: J'ai honte
      // user = yield updateFirebaseUser({ photoURL: info.picture.data.url })
      yield update({
        [`user/${user.uid}/photoURL`]: info.picture.data.url
      })
    }
  }
  yield put({ type: USER_LOGIN_SUCCESS, payload: userModel({ ...user, ...userBdd }) })
}

export function* loadUserById(uid) {
  const userBdd = yield get(`user/${uid}`)
  yield put({ type: USER_LOADING_SUCCESS, payload: userModel({ uid, ...userBdd }) })
}

function* watchUpdateBadge() {
  const state = yield select()
  const userId = getCurrentId(state)
  yield addListenerOnRef(`user/${userId}/badge`, function* (snapshot) {
    const number = snapshot.val()
    notification.setBadgeNumber(number)
    yield put({ type: USER_UPDATE_BADGE, payload: number })
  })
}

function* flow() {
  yield [
    takeEvery(USER_LOGIN_SUCCESS, watchUpdateBadge),
    takeEvery(USER_LOGIN, login),
    takeEvery(USER_LOGOUT, logout),
    takeEvery(USER_FACEBOOK_LOGIN, loginFacebook),
    takeEvery(USER_REGISTER, userRegister),
    takeLatest(SET_FILTER, onSetFilter),
    takeEvery(REHYDRATE, checkUser)
  ]
}

export default flow
