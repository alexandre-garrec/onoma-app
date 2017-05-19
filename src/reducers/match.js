import reducer from '../utils/reducer'
import { UPDATE_MATCH } from '../actions'

const initialState = {}

const match =  reducer(initialState, {
  [UPDATE_MATCH]: (state, payload) => ({
    ...payload
  })
})

export default match
