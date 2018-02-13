import reducer from '../utils/reducer'
import { GET_DESCRIPTION_SUCCESS } from '../actions'

const initialState = {
  items: {}
}

const name = reducer(initialState, {
  [GET_DESCRIPTION_SUCCESS]: (state, payload) => ({
    ...state,
    items: {
      ...state.items,
      ...payload
    }
  })
})

export default name
