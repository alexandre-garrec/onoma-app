import { takeEvery, put, select } from 'redux-saga/effects'
import { USER_LOGIN_SUCCESS, GET_CHANNEL_SUCCESS, USER_SET_CHANNEL_SUCCESS } from '../actions'
import { getCurrentId } from '../selectors/user'
import { get, addListenerOnRef } from '../api'
import channelModel from '../models/channel'

function* onChannelUpdate(snapshot) {
  yield put({ type: GET_CHANNEL_SUCCESS, payload: { [snapshot.key]: channelModel(snapshot.val()) } })
}

function* watchUserChannel(channelId) {
  yield addListenerOnRef(`channel/${channelId}`, onChannelUpdate)
}

function* getChannel() {
  try {
    const state = yield select()
    const userId = getCurrentId(state)

    const channels = yield get(`user/${userId}/channels`)
    const channelsArray = Object.keys(channels)
    if (channelsArray.length) {
      yield channelsArray.map((channelId) => watchUserChannel(channelId))
    }
  } catch (error) { }
}

function* flow() {
  yield [
    takeEvery(USER_LOGIN_SUCCESS, getChannel),
    takeEvery(USER_SET_CHANNEL_SUCCESS, getChannel)
  ]
}

export default flow
