import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import createReducer from './reducers'
import sagas from './sagas'
import Storage from 'react-native-storage'
import { AsyncStorage } from 'react-native'
import { persistStore, autoRehydrate } from 'redux-persist'
import { composeWithDevTools } from 'remote-redux-devtools'

import Fireonsaga from './utils/fireonsaga'

const config = {
  apiKey: "AIzaSyCZctzbMpMOmwd4D_auRB_nXYTnB1VShko",
  authDomain: "name-matcher-26232.firebaseapp.com",
  databaseURL: "https://name-matcher-26232.firebaseio.com",
  storageBucket: "name-matcher-26232.appspot.com",
  messagingSenderId: "266586069715"
}

export const FireSaga = new Fireonsaga(config)

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

  persistStore(store, { storage: AsyncStorage })

  // Extensions
  store.runSaga = sagaMiddleware.run(sagas)

  return store
}

export default configureStore
