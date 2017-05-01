import { fork, call, put, select } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga/effects'
import { GET_NAME, GET_NAME_SUCCESS, ADD_MATCH, ADD_MATCH_SUCCESS, ADD_MATCH_ERROR, DELETE_MATCH, DELETE_MATCH_SUCCESS, DELETE_MATCH_ERROR, CARD_INIT } from '../actions'
import { save, load } from '../utils/localStorage'
import { getNamesId, getMatchs } from '../selectors/name'
import { getCurrentId } from '../selectors/user'
import { makeAssociativeTable } from '../utils/reducer'
import { isEmpty } from '../utils'

import { FireSaga } from '../config'

function* getAllName() {
  try {
    const state = yield select()
    const localName = getNamesId(state)
    if (isEmpty(localName)) {
      const data = yield FireSaga.ref('name').get()
      const names =  makeAssociativeTable(data.val())
      yield put({ type: GET_NAME_SUCCESS, payload: names })
      yield save('names', names)
    }
  } catch (error) {
  }
}

function* saveMatch({ payload }) {
  try {
    const state = yield select()
    const userId = getCurrentId(state)
    const matchs = [ ...getMatchs(state), payload ]
    const updatedData = {
      [`user/${userId}/match/${payload}`]: true
    }
    yield FireSaga.update(updatedData)
    yield save('matchs', matchs)
    yield put({ type: ADD_MATCH_SUCCESS, payload: [ payload ] })
  } catch (error) {
    yield put({ type: ADD_MATCH_ERROR })
  }
}

function* deleteMatch({ payload }) {
  try {
    const state = yield select()
    const matchs = getMatchs(state).filter(id => `${id}` !== `${payload}`)
    yield save('matchs', matchs)
    yield put({ type: DELETE_MATCH_SUCCESS, payload: payload })
  } catch (error) {
    yield put({ type: DELETE_MATCH_ERROR })
  }
}

function* getLocalState() {
  try {
    const names = yield load('names')
    if (names) {
      yield put({ type: GET_NAME_SUCCESS, payload: names })
      yield put({ type: CARD_INIT, payload: names })

    }
	  else yield put({ type: GET_NAME })

    const matchs = yield load('matchs')
    if (matchs) yield put({ type: ADD_MATCH_SUCCESS, payload: matchs })

  } catch (error) {}
}

function* flow() {
  yield [
    takeEvery(GET_NAME, getAllName),
    takeEvery(ADD_MATCH, saveMatch),
    takeEvery(DELETE_MATCH, deleteMatch),
    fork(getLocalState)
  ]
}

export default flow
