import { takeEvery, put, select } from 'redux-saga/effects'
import { CARD_INIT, SET_CURRENT_CARD, CARD_HANDLE_NEXT, SET_FILTER, CARD_SET_NUMBER } from '../actions'
import { getCurrentCard, getNextCard, makeGetNamesId } from '../selectors/name'

const getNamesId = makeGetNamesId()

function* initCard() {
  try {
    const state = yield select()
    if (!getCurrentCard(state)) {
      const card1 = yield getRandomCard()
      const card2 = yield getRandomCard()
      yield put({
        type: SET_CURRENT_CARD,
        payload: {
          current: card1,
          next: card2
        }
      })
    }
  } catch (error) { }
}

function* handleNext() {
  try {
    const state = yield select()
    const current = getCurrentCard(state)
    const next = getNextCard(state)
    const card = yield getRandomCard()
    yield put({
      type: SET_CURRENT_CARD,
      payload: {
        current: next,
        previous: current,
        next: card
      }
    })
  } catch (error) { }
}

function* getRandomCard() {
  const state = yield select()
  const cards = getNamesId(state)
  yield put({
    type: CARD_SET_NUMBER,
    payload: cards.length
  })
  const randomNumber = parseInt(cards[Math.floor(Math.random() * cards.length)])
  return randomNumber
}

function* flow() {
  yield [
    takeEvery(CARD_INIT, initCard),
    takeEvery(SET_FILTER, initCard),
    takeEvery(CARD_HANDLE_NEXT, handleNext),
  ]
}

export default flow
