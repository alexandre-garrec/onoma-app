import firebase from 'firebase'
import { call, fork } from 'redux-saga/effects'
import createChannel from './channel'

const _query = [
  'orderByChild',
  'orderByKey',
  'limitToLast',
  'limitToFirst',
  'orderByValue',
  'startAt',
  'off',
  'onDisconnect',
  'set',
  'remove'
]

const _auth = [
  'signInWithCustomToken',
  'getRedirectResult',
  'createUserWithEmailAndPassword',
  'signInWithEmailAndPassword',
  'signOut'
]

class FireSaga {
  constructor (config) {
    firebase.initializeApp(config)
    this.database = firebase.database()
    this._listenRef = {}
  }

  removeListeners () {
    this._listenRef = Object.keys(this._listenRef).reduce((memo, key) => {
      this._listenRef[key].off()
    }, {})
    return this
  }

  isAlreadyWatch (path) {
    return !!this._listenRef[path]
  }

  addListener (ref, path) {
    this._listenRef[path] = ref
  }

  ref (ref) {
    return this._call(this.database.ref(ref), ref)
  }

  _call (ref, path) {
    return {
      ..._query.reduce((memo, action) =>
        ({...memo, [action]: (...props) => this._call(ref[action](...props))}), {}),
      once: (type) => _once(ref, type),
      push: (data) => _push(ref, data),
      on: (action, cb) => {
        this.addListener(ref, path)
        return _on(ref, action, cb)
      },
      isAlreadyWatch: () => this.isAlreadyWatch(ref, path),
      // Alias
      get: () => _once(ref, 'value')
    }
  }

  getCurrentUser () {
    return firebase.auth().currentUser
  }

  update (updatedData) {
    const fnc = () => new Promise((resolve, reject) => {
      this.database.ref().update(updatedData, (error) => {
        if (error) return reject(error)
        resolve(this)
      })
    })
    return call(fnc)
  }

  auth () {
    return _makeAuthPromise(firebase.auth())
  }
}

const onAuthStateChanged = (auth, saga) => {
  const channel = createChannel()
  auth.onAuthStateChanged(user => channel.put(user))
  return fork(listen, channel, saga)
}


const _makeAuthPromise = (auth) => ({
  ..._auth.reduce((memo, key) =>
    ({...memo, [key]: ( ...params) => auth[key](...params).then((data) => data)}), {}),
  onAuthStateChanged: ( ...params) => onAuthStateChanged(auth, ...params)
})

const _once = (ref, type) => new Promise(resolve => ref.once(type, data => resolve(data)))

const _push = (ref, data) => {
  const newRef = ref.push()
  newRef.set(data)
  return newRef.key
}

function _on (ref, action, saga = false) {
  const channel = createChannel()
  ref.on(action, snapshot => channel.put(snapshot))
  return fork(listen, channel, saga)
}

function* listen (channel, saga) {
  while (true) {
    const data = yield call(channel.take)
    yield fork(saga, data)
  }
}

export default FireSaga
