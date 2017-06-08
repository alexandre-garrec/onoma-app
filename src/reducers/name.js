import reducer from '../utils/reducer'
import { GET_NAME, GET_NAME_SUCCESS, GET_NAME_ERROR, NAME_LIST_UPDATE } from '../actions'

const initialState = {
  items: {},
  list: [],
  gui: {
    loading: true,
    error: false
  }
}

const name = reducer(initialState, {
  [NAME_LIST_UPDATE]: (state, payload) => ({
    ...state,
    list: payload
  }),
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
