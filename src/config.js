import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import createReducer from './reducers'
import sagas from './sagas'
import { AsyncStorage } from 'react-native'
import { persistStore, autoRehydrate } from 'redux-persist'
import { composeWithDevTools } from 'remote-redux-devtools'
import { initRk } from './style'

initRk()

const sagaMiddleware = createSagaMiddleware()

const configureStore = (initialState = {}) => {
  const middlewares = [
    sagaMiddleware
  ]
  const enhancers = [
    applyMiddleware(...middlewares),
    autoRehydrate()
  ]

  const store = createStore(
    createReducer(),
    initialState,
    composeWithDevTools(...enhancers)
  )

  persistStore(store, { storage: AsyncStorage, whitelist: ['match', 'origin', 'filter', 'name', 'card'] })// .purge()

  // Extensions
  store.runSaga = sagaMiddleware.run(sagas)

  return store
}

export default configureStore
