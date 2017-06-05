import reducer from '../utils/reducer'
import { SET_CURRENT_CARD, CARD_SET_NUMBER } from '../actions'

const initialState = {
  current: false,
  previous: false,
  next: false,
  history: [],
  number: 0
}

const card = reducer(initialState, {
  [SET_CURRENT_CARD]: (state, payload) => ({
    ...state,
    ...payload,
    history: [...state.history, payload.current]
  }),
  [CARD_SET_NUMBER]: (state, payload) => ({
    ...state,
    number: payload,
  })
})

export default card
