import nameSaga from './name'
import cardSaga from './card'
import userSaga from './user'
import notificationSaga from './notification'
import dynamicLinkSaga from './dynamicLink'
import channelSaga from './channel'

function * rootSaga () {
  yield [
    nameSaga(),
    cardSaga(),
    userSaga(),
    notificationSaga(),
    dynamicLinkSaga(),
    channelSaga()
  ]
}

export default rootSaga
