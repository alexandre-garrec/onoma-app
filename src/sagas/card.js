import { fork, call, put, select } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga/effects'
import { CARD_INIT, SET_CURRENT_CARD, CARD_HANDLE_NEXT } from '../actions'
import { getCurrentCard, getPreviousCard, getNextCard } from '../selectors/name'

function* initCard() {
  try {
    console.log('init ! ')
    const state = yield select()
    yield put({ type: SET_CURRENT_CARD, payload: {
      current: 1,
      next: 2
    } })
  } catch (error) {
  }
}

function* handleNext() {
  try {
    const state = yield select()
    const current = getCurrentCard(state)
    const previous = getPreviousCard(state)
    const next = getNextCard(state)

    yield put({ type: SET_CURRENT_CARD, payload: {
      current: current + 1,
      previous: current,
      next: current + 2
    }})
  } catch (error) {
  }
}


function* flow() {
  yield [
    takeEvery(CARD_INIT, initCard),
    takeEvery(CARD_HANDLE_NEXT, handleNext),
  ]
}

export default flow
