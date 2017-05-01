import reducer from '../utils/reducer'
import { SET_CURRENT_CARD } from '../actions'

const initialState = {
  current: false,
  previous: false,
  next: false
}

const card =  reducer(initialState, {
  [SET_CURRENT_CARD]: (state, payload) => ({
    ...state,
    ...payload
  })
})

export default card
