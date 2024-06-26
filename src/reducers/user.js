import reducer from '../utils/reducer'
import { USER_LOGIN, USER_LOGIN_SUCCESS, USER_LOGIN_ERROR, USER_NEED_LOGIN, USER_LOGOUT_SUCCESS, GET_CHANNEL_SUCCESS, USER_UPDATE_BADGE, USER_SET_DYNAMICLINK, USER_LOADING_SUCCESS } from '../actions'

const initialState = {
  current: false,
  users: {},
  gui: {
    loading: false,
    error: false,
    displayLogin: true,
    badge: 0,
    dynamiclink: false
  }
}

const user = reducer(initialState, {
  [USER_SET_DYNAMICLINK]: (state, payload) => ({
    ...state,
    gui: {
      ...state.gui,
      dynamiclink: payload
    }
  }),
  [USER_UPDATE_BADGE]: (state, payload) => ({
    ...state,
    gui: {
      ...state.gui,
      badge: payload
    }
  }),
  [GET_CHANNEL_SUCCESS]: (state, payload) => ({
    ...state,
    users: {
      ...state.users,
      [state.current]: {
        ...state.users[state.current],
        channels: Object.keys(payload)
      }
    }
  }),
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
  [USER_LOGOUT_SUCCESS]: (state, payload) => ({
    ...state,
    current: false,
    gui: {
      ...state.gui,
      displayLogin: true
    }
  }),
  [USER_LOGIN_SUCCESS]: (state, payload) => ({
    ...state,
    current: payload.id,
    users: {
      ...state.users,
      [payload.id]: payload
    },
    gui: {
      ...state.gui,
      loading: false,
      error: false,
      displayLogin: false
    }
  }),
  [USER_LOGIN_SUCCESS]: (state, payload) => ({
    ...state,
    current: payload.id,
    users: {
      ...state.users,
      [payload.id]: payload
    },
    gui: {
      ...state.gui,
      loading: false,
      error: false,
      displayLogin: false
    }
  }),
  [USER_LOADING_SUCCESS]: (state, payload) => ({
    ...state,
    users: {
      ...state.users,
      [payload.id]: payload
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
