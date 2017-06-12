import { takeEvery, put, select } from 'redux-saga/effects'
import { NAME_LIST_UPDATE, SET_CURRENT_CARD, CARD_HANDLE_NEXT, SET_FILTER, CARD_SET_NUMBER } from '../actions'
import { getCurrentCard, getNextCard, makeGetNamesId } from '../selectors/name'
import { remove } from '../utils'

const getNamesId = makeGetNamesId()

function* initCard() {
  try {
    // const state = yield select()
    // if (!getCurrentCard(state)) {
    const card1 = yield getRandomCard()
    const card2 = yield getRandomCard(card1)
    yield put({
      type: SET_CURRENT_CARD,
      payload: {
        current: card1,
        next: card2
      }
    })
    // }
  } catch (error) { }
}

function* handleNext() {
  try {
    const state = yield select()
    const current = getCurrentCard(state)
    const next = getNextCard(state)
    const card = yield getRandomCard(next)
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

function* getRandomCard(ommit) {
  const state = yield select()
  const cards = remove(getNamesId(state), `${ommit}`)
  console.log(cards)
  yield put({
    type: CARD_SET_NUMBER,
    payload: cards.length
  })
  const randomNumber = parseInt(cards[Math.floor(Math.random() * cards.length)])
  return randomNumber
}

function* flow() {
  yield [
    takeEvery(NAME_LIST_UPDATE, initCard),
    takeEvery(SET_FILTER, initCard),
    takeEvery(CARD_HANDLE_NEXT, handleNext)
  ]
}

export default flow
