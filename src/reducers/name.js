import reducer from '../utils/reducer'
import { SET_FILTER, GET_NAME_SUCCESS, GET_NAME_ERROR, NAME_LIST_UPDATE } from '../actions'

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
  [SET_FILTER]: (state, payload) => ({
    ...state,
    gui: {
      ...state.gui,
      loading: true
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
