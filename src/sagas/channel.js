import { fork, call, put, select } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga/effects'
import { USER_LOGIN_SUCCESS, GET_CHANNEL_SUCCESS } from '../actions'
import { FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType } from 'react-native-fcm'
import { getCurrentId } from '../selectors/user'
import { get, addListenerOnRef } from '../api'
import channelModel from '../models/channel'
import { REHYDRATE } from 'redux-persist/constants'

function* onChannelUpdate(snapshot) {
  yield put({ type: GET_CHANNEL_SUCCESS, payload: { [snapshot.key] : channelModel(snapshot.val()) } })
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
      const channelsData = yield channelsArray.map((channelId) => watchUserChannel(channelId))
    }

  } catch (error) {}
}

function* flow() {
  yield [
    takeEvery(USER_LOGIN_SUCCESS, getChannel)
  ]
}

export default flow
