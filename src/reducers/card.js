import reducer from '../utils/reducer'
// import { remove } from '../utils'
import { SET_CURRENT_CARD, CARD_SET_NUMBER, CARD_HANDLE_BACK } from '../actions'

const initialState = {
  current: false,
  previous: false,
  next: false,
  history: [],
  number: 0
}

const card = reducer(initialState, {
  [CARD_HANDLE_BACK]: (state, payload) => ({
    ...state,
    current: state.previous,
    next: state.current,
    previous: state.previous
    // previous: state.history[0],
    // history: remove(state.history, state.history[0])
  }),
  [SET_CURRENT_CARD]: (state, payload) => ({
    ...state,
    ...payload,
    history: [payload.current, ...state.history]
  }),
  [CARD_SET_NUMBER]: (state, payload) => ({
    ...state,
    number: payload
  })
})

export default card
