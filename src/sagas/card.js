import { fork, call, put, select } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga/effects'
import { CARD_INIT, SET_CURRENT_CARD, CARD_HANDLE_NEXT } from '../actions'
import { getCurrentCard, getPreviousCard, getNextCard, makeGetNamesId } from '../selectors/name'

const getNamesId = makeGetNamesId()

function* initCard() {
  try {
    const card1 = yield getRandomCard()
    const card2 = yield getRandomCard()
    yield put({ type: SET_CURRENT_CARD, payload: {
      current: card1,
      next: card2
    } })
  } catch (error) {}
}

function* handleNext() {
  try {
    const state = yield select()
    const current = getCurrentCard(state)
    const next = getNextCard(state)
    const card = yield getRandomCard()
    yield put({ type: SET_CURRENT_CARD, payload: {
      current: next,
      previous: current,
      next: card
    }})
  } catch (error) {}
}

function* getRandomCard() {
  const state = yield select()
  const cards = getNamesId(state)
  const randomNumber = Math.floor(Math.random() * cards.length)
  return randomNumber
}


function* flow() {
  yield [
    takeEvery(CARD_INIT, initCard),
    takeEvery(CARD_HANDLE_NEXT, handleNext),
  ]
}

export default flow
