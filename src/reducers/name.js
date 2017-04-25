import reducer from '../utils/reducer'
import { GET_NAME, GET_NAME_SUCCESS, GET_NAME_ERROR } from '../actions'

const initialState = {
  items: {},
  gui: {
    loading: false,
    error: false
  }
}

const name =  reducer(initialState, {
  [GET_NAME]: (state, payload) => ({
    ...state,
    gui: {
      ...state.gui,
      loading: true,
      error: false
    }
  }),
  [GET_NAME_SUCCESS]: (state, payload) => ({
    ...state,
    items: {
      ...state.items,
      ...payload
    },
    gui: {
      ...state.gui,
      loading: false,
      error: false
    }
  }),
  [GET_NAME_ERROR]: (state, payload) => ({
    ...state,
    gui: {
      ...state.gui,
      loading: false,
      error: true
    }
  })
})

export default name
