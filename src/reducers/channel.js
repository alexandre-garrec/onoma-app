import reducer from '../utils/reducer'
import { GET_CHANNEL_SUCCESS } from '../actions'

const initialState = {}

const channel =  reducer(initialState, {
  [GET_CHANNEL_SUCCESS]: (state, payload) => ({
    ...state,
    ...payload
  })
})

export default channel
