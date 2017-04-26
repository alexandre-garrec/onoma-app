import reducer from '../utils/reducer'
import { ADD_MATCH_SUCCESS } from '../actions'

const initialState = []

const match =  reducer(initialState, {
  [ADD_MATCH_SUCCESS]: (state, payload) => ([
    ...state,
    ...payload
  ]),
})

export default match
