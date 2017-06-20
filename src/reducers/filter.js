import reducer from '../utils/reducer'
import { SET_FILTER } from '../actions'

const initialState = {}

const filter = reducer(initialState, {
  [SET_FILTER]: (state, payload) => ({
    ...state,
    ...payload
  })
})

export default filter
