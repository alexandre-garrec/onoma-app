import reducer from '../utils/reducer'
import { SET_LINK } from '../actions'

const initialState = {
  link: false,
  matchName: 'test'
}

const filter = reducer(initialState, {
  [SET_LINK]: (state, payload) => ({
    ...state,
    link: payload
  })
})

export default filter
