import { fork, call, put, select } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga/effects'
import { GET_NAME, GET_NAME_SUCCESS, ADD_MATCH, ADD_MATCH_SUCCESS, ADD_MATCH_ERROR } from '../actions'
import { save, load } from '../utils/localStorage'
import { getNamesId, getMatchs } from '../selectors/name'
import { makeAssociativeTable } from '../utils/reducer'
import { isEmpty } from '../utils'
import Fireonsaga from '../utils/fireonsaga'

const config = {
  apiKey: "AIzaSyCZctzbMpMOmwd4D_auRB_nXYTnB1VShko",
  authDomain: "name-matcher-26232.firebaseapp.com",
  databaseURL: "https://name-matcher-26232.firebaseio.com",
  storageBucket: "name-matcher-26232.appspot.com",
  messagingSenderId: "266586069715"
}

const FireSaga = new Fireonsaga(config)

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

function* getLocalState() {
  try {
    const names = yield load('names')
    if (names) yield put({ type: GET_NAME_SUCCESS, payload: names })
	  else yield put({ type: GET_NAME, payload: names })

    const matchs = yield load('matchs')
    if (matchs) yield put({ type: ADD_MATCH_SUCCESS, payload: matchs })

  } catch (error) {
    yield put({ type: GET_NAME, payload: names })
  }
}

function* saveMatch({ payload }) {
  try {
    const state = yield select()
    const matchs = [ ...getMatchs(state), payload ]
    yield save('matchs', matchs)
    yield put({ type: ADD_MATCH_SUCCESS, payload: [ payload ] })
  } catch (error) {
    yield put({ type: ADD_MATCH_ERROR })
  }
}


function* flow() {
  yield [
    takeEvery(GET_NAME, getAllName),
    takeEvery(ADD_MATCH, saveMatch),
    fork(getLocalState)
  ]
}

export default flow
