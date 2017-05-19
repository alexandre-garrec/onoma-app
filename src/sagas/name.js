import { fork, call, put, select } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga/effects'
import { GET_NAME, GET_NAME_SUCCESS, UPDATE_MATCH, ADD_MATCH, ADD_MATCH_ERROR, DELETE_MATCH, DELETE_MATCH_ERROR, CARD_INIT, USER_LOGIN_SUCCESS } from '../actions'
import { getNamesId, getMatchs } from '../selectors/name'
import { getCurrentId } from '../selectors/user'
import { makeAssociativeTable } from '../utils/reducer'
import { isEmpty } from '../utils'
import { REHYDRATE } from 'redux-persist/constants'
import { get, update, addListenerOnRef } from '../api'

function* onMatchUpdate(snapshot) {
  const namesArray = snapshot.val()
  yield put({ type: UPDATE_MATCH, payload: namesArray })
}

function* watchUserMatch() {
  try {
    const state = yield select()
    const userId = getCurrentId(state)
    yield addListenerOnRef(`user/${userId}/match`, onMatchUpdate)
  } catch (error) { }
}

function* getAllName() {
  try {
    const state = yield select()
    const localName = getNamesId(state)
    if (isEmpty(localName)) {
      const names = yield get('name')
      yield put({ type: GET_NAME_SUCCESS, payload: makeAssociativeTable(names) })
      yield put({ type: CARD_INIT, payload: names })
    }
  } catch (error) {
  }
}

function* saveMatch({ payload }) {
  try {
    const state = yield select()
    const userId = getCurrentId(state)
    yield update({[`user/${userId}/match/${payload}`]: true })
  } catch (error) {
    yield put({ type: ADD_MATCH_ERROR })
  }
}

function* deleteMatch({ payload }) {
  try {
    const state = yield select()
    const userId = getCurrentId(state)
    yield update({[`user/${userId}/match/${payload}`]: null })
  } catch (error) {
    yield put({ type: DELETE_MATCH_ERROR })
  }
}

function* flow() {
  yield [
    takeEvery(USER_LOGIN_SUCCESS, watchUserMatch),
    takeEvery(REHYDRATE, getAllName),
    takeEvery(ADD_MATCH, saveMatch),
    takeEvery(DELETE_MATCH, deleteMatch),
  ]
}

export default flow
