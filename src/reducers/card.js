import reducer from '../utils/reducer'
import { SET_CURRENT_CARD } from '../actions'

const initialState = {
  current: false,
  previous: false,
  next: false,
  history: []
}

const card =  reducer(initialState, {
  [SET_CURRENT_CARD]: (state, payload) => ({
    ...state,
    ...payload,
    history: [ ...state.history, payload.current ]
  })
})

export default card
