import nameSaga from './name'
import cardSaga from './card'
import userSaga from './user'
import notificationSaga from './notification'

function* rootSaga () {
  yield [
    nameSaga(),
    cardSaga(),
    userSaga(),
    notificationSaga()
  ]
}

export default rootSaga
