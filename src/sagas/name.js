import { put, select, takeEvery } from 'redux-saga/effects'
import { GET_NAME, GET_NAME_SUCCESS, UPDATE_MATCH, ADD_MATCH, ADD_MATCH_ERROR, DELETE_MATCH, DELETE_MATCH_ERROR, CARD_INIT, USER_LOGIN_SUCCESS, UPDATE_ORIGIN, NAME_LIST_UPDATE } from '../actions'
import { getCurrentId } from '../selectors/user'
import { getOriginsId } from '../selectors/origin'
import { getNameById as getNameByIdSelector } from '../selectors/name'
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

function* getOrigins() {
  try {
    const state = yield select()
    const localOrigins = getOriginsId(state)
    if (isEmpty(localOrigins)) {
      const origins = yield get('origin')
      yield put({ type: UPDATE_ORIGIN, payload: makeAssociativeTable(origins) })
    }
  } catch (error) { }
}

function* onListUpdate(snapshot) {
  const namesArray = snapshot.val()
  if (namesArray) {
    yield put({ type: NAME_LIST_UPDATE, payload: Object.keys(namesArray) })
    yield put({ type: CARD_INIT })
  }
}

function* watchUserList() {
  try {
    const state = yield select()
    const userId = getCurrentId(state)
    yield addListenerOnRef(`list/${userId}`, onListUpdate)
  } catch (error) { }
}

function* getNameById({ payload: { id } }) {
  try {
    const state = yield select()
    const localName = getNameByIdSelector(state, id) || false
    if (localName) return true
    const name = yield get(`name/${id}`)
    yield put({ type: GET_NAME_SUCCESS, payload: { [id]: name } })
  } catch (error) {
    yield put({ type: ADD_MATCH_ERROR })
  }
}


function* saveMatch({ payload }) {
  try {
    const state = yield select()
    const userId = getCurrentId(state)
    yield update({ [`user/${userId}/match/${payload}`]: true })
  } catch (error) {
    yield put({ type: ADD_MATCH_ERROR })
  }
}

function* deleteMatch({ payload }) {
  try {
    const state = yield select()
    const userId = getCurrentId(state)
    yield update({ [`user/${userId}/match/${payload}`]: null })
  } catch (error) {
    yield put({ type: DELETE_MATCH_ERROR })
  }
}

function* flow() {
  yield [
    takeEvery(USER_LOGIN_SUCCESS, watchUserMatch),
    takeEvery(USER_LOGIN_SUCCESS, watchUserList),
    takeEvery(REHYDRATE, getOrigins),
    takeEvery(ADD_MATCH, saveMatch),
    takeEvery(GET_NAME, getNameById),
    takeEvery(DELETE_MATCH, deleteMatch)
  ]
}

export default flow
