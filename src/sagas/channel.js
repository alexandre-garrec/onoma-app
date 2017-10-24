import { takeEvery, put, select, fork } from 'redux-saga/effects'
import { USER_LOGIN_SUCCESS, GET_CHANNEL_SUCCESS, USER_SET_CHANNEL_SUCCESS } from '../actions'
import { getCurrentId } from '../selectors/user'
import { addListenerOnRef } from '../api'
import channelModel from '../models/channel'
import { loadUserById } from './user'

function* onChannelUpdate(snapshot) {
  const channel = channelModel(snapshot.val())
  const state = yield select()
  const userId = getCurrentId(state)

  // @TODO: check firebase security <3
  // load channels users
  yield channel.users.reduce((memo, uid) => uid === userId ? memo : [...memo, fork(loadUserById, uid)])

  yield put({ type: GET_CHANNEL_SUCCESS, payload: { [snapshot.key]: channelModel(snapshot.val()) } })
}

function* watchChannel(channelId) {
  yield addListenerOnRef(`channel/${channelId}`, onChannelUpdate)
}

function* watchUserChannel(snapshot) {
  const channels = snapshot.val()
  if (channels) {
    const channelsArray = Object.keys(channels)
    yield channelsArray.map((channelId) => watchChannel(channelId))
  }
}

function* getChannel() {
  try {
    const state = yield select()
    const userId = getCurrentId(state)
    yield addListenerOnRef(`user/${userId}/channels`, watchUserChannel)
  } catch (error) { }
}

function* flow() {
  yield [
    takeEvery(USER_LOGIN_SUCCESS, getChannel),
    takeEvery(USER_SET_CHANNEL_SUCCESS, getChannel)
  ]
}

export default flow
