import reducer from '../utils/reducer'
import { SET_LINK, USER_SET_CHANNEL_SUCCESS, MODAL_LINK_CLOSE, MODAL_MATCH_OPEN, MODAL_MATCH_CLOSE } from '../actions'

const initialState = {
  link: false,
  displayLinkModal: false,
  displayMatchModal: false,
  matchName: ''
}

const filter = reducer(initialState, {
  [SET_LINK]: (state, payload) => ({
    ...state,
    link: payload
  }),
  [USER_SET_CHANNEL_SUCCESS]: (state, payload) => ({
    ...state,
    displayLinkModal: true
  }),
  [MODAL_LINK_CLOSE]: (state, payload) => ({
    ...state,
    displayLinkModal: false
  }),
  [MODAL_MATCH_OPEN]: (state, payload) => ({
    ...state,
    displayMatchModal: true,
    matchName: payload
  }),
  [MODAL_MATCH_CLOSE]: (state, payload) => ({
    ...state,
    displayMatchModal: false,
    matchName: ''
  })
})

export default filter
