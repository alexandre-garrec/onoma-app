import {applyMiddleware, compose, createStore} from 'redux'
import createSagaMiddleware from 'redux-saga'
import createReducer from './reducers'
import sagas from './sagas'
import Storage from 'react-native-storage'
import { AsyncStorage } from 'react-native'

import Fireonsaga from './utils/fireonsaga'

const config = {
  apiKey: "AIzaSyCZctzbMpMOmwd4D_auRB_nXYTnB1VShko",
  authDomain: "name-matcher-26232.firebaseapp.com",
  databaseURL: "https://name-matcher-26232.firebaseio.com",
  storageBucket: "name-matcher-26232.appspot.com",
  messagingSenderId: "266586069715"
}

export const FireSaga = new Fireonsaga(config)

export const storage = new Storage({
  // maximum capacity, default 1000
  size: 1000,

  // Use AsyncStorage for RN, or window.localStorage for web.
  // If not set, data would be lost after reload.
  storageBackend: AsyncStorage,

  // expire time, default 1 day(1000 * 3600 * 24 milliseconds).
  // can be null, which means never expire.
  defaultExpires: 1000 * 3600 * 24,

  // cache data in the memory. default is true.
  enableCache: true,

  // if data was not found in storage or expired,
  // the corresponding sync method will be invoked and return
  // the latest data.
  sync: {
      // we'll talk about the details later.
  }
})

const sagaMiddleware = createSagaMiddleware()

const configureStore = (initialState = {}) => {
  const middlewares = [
    sagaMiddleware
  ]

  let enhancers = [
    applyMiddleware(...middlewares)
  ]

  const store = createStore(
    createReducer(),
    initialState,
    compose(...enhancers)
  )

  // Extensions
  store.runSaga = sagaMiddleware.run(sagas)

  return store
}

export default configureStore
