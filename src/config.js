import { applyMiddleware, createStore, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import createReducer from './reducers'
import sagas from './sagas'
import { AsyncStorage } from 'react-native'
import { persistStore, autoRehydrate } from 'redux-persist'
// @TODO: REMOVE
//import { composeWithDevTools } from 'remote-redux-devtools'
import { initRk } from './style'

initRk()

const sagaMiddleware = createSagaMiddleware()

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

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
    composeEnhancers(...enhancers),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

  persistStore(store, {
    storage: AsyncStorage,
    whitelist: ['match', 'origin', 'filter', 'name', 'card', 'user']
  })// .purge()

  // Extensions
  store.runSaga = sagaMiddleware.run(sagas)

  return store
}

export default configureStore
