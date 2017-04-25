import nameSaga from './name'

function* rootSaga () {
  yield [
    nameSaga()
  ]
}

export default rootSaga
