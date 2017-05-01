import reducer from '../utils/reducer'
import { USER_LOGIN, USER_LOGIN_SUCCESS, USER_LOGIN_ERROR } from '../actions'

const initialState = {
  current: false,
  users: {},
  gui: {
    loading: false,
    error: false
  }
}

const user =  reducer(initialState, {
  [USER_LOGIN]: (state, payload) => ({
    ...state,
    gui: {
      ...state.gui,
      loading: true,
      error: false
    }
  }),
  [USER_LOGIN_SUCCESS]: (state, payload) => ({
    ...state,
    current: payload.id,
    users: {
      ...state.users,
      [ payload.id]: payload
    },
    gui: {
      ...state.gui,
      loading: false,
      error: false
    }
  }),
  [USER_LOGIN_ERROR]: (state, payload) => ({
    ...state,
    gui: {
      ...state.gui,
      loading: false,
      error: payload
    }
  })
})

export default user
