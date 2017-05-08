import reducer from '../utils/reducer'
import { USER_LOGIN, USER_LOGIN_SUCCESS, USER_LOGIN_ERROR, USER_NEED_LOGIN } from '../actions'

const initialState = {
  current: false,
  users: {},
  gui: {
    loading: false,
    error: false,
    displayLogin: false
  }
}

const user =  reducer(initialState, {
   [USER_NEED_LOGIN]: (state, payload) => ({
    ...state,
    gui: {
      ...state.gui,
      displayLogin: true
    }
  }),
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
      error: false,
      displayLogin: false
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
