import reducer from '../utils/reducer'
import { SET_LINK, USER_SET_CHANNEL_SUCCESS, MODAL_LINK_CLOSE } from '../actions'

const initialState = {
  link: false,
  displayLinkModal: false
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
  })
})

export default filter
