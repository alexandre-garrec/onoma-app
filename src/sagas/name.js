import { fork, call, put, select } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga/effects'
import { GET_NAME, GET_NAME_SUCCESS } from '../actions'
import { save, load } from '../utils/localStorage'
import { getNames } from '../selectors/name'
import { makeAssociativeTable } from '../utils/reducer'

import Fireonsaga from '../utils/fireonsaga'

function shuffle(array) {
  var tmp, current, top = array.length;
  if(top) while(--top) {
    current = Math.floor(Math.random() * (top + 1));
    tmp = array[current];
    array[current] = array[top];
    array[top] = tmp;
  }
  return array;
}

const isEmpty = obj => {
  for(var prop in obj) {
    if(obj.hasOwnProperty(prop))
      return false;
  }
  return JSON.stringify(obj) === JSON.stringify({});
}

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
    const localName = getNames(state)
    if (!localName.length) {
      const data = yield FireSaga.ref('name').get()
      const names =  makeAssociativeTable(data.val())
      yield put({ type: GET_NAME_SUCCESS, payload: names })
      save('names', names)
    }
  } catch (error) {
  }
}

function* getLocalNames() {
  try {
    const names = yield load('names')
    if (names) {
	    yield put({ type: GET_NAME_SUCCESS, payload: names })
    }
  } catch (error) {
    console.log(error)
  }
}


function* flow() {
  yield [
    takeEvery(GET_NAME, getAllName),
    fork(getLocalNames)
  ]
}

export default flow
