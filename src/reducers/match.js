import reducer from '../utils/reducer'
import { ADD_MATCH_SUCCESS, DELETE_MATCH_SUCCESS } from '../actions'

const initialState = []

const match =  reducer(initialState, {
  [ADD_MATCH_SUCCESS]: (state, payload) => ([
    ...state,
    ...payload
  ]),
  [DELETE_MATCH_SUCCESS]: (state, payload) => ([
    ...state.filter(id => id !== payload),
  ])
})

export default match
