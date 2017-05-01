import nameSaga from './name'
import cardSaga from './card'
import userSaga from './user'

function* rootSaga () {
  yield [
    nameSaga(),
    cardSaga(),
    userSaga()
  ]
}

export default rootSaga
