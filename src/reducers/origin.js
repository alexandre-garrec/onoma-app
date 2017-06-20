import reducer from '../utils/reducer'
import { UPDATE_ORIGIN } from '../actions'

const initialState = {}

const origin = reducer(initialState, {
  [UPDATE_ORIGIN]: (state, payload) => ({
    ...payload
  })
})

export default origin
