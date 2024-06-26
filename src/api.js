import Firestack from 'react-native-firestack'
import { AccessToken, LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk'
import createChannel from './utils/channel'
import { call, fork } from 'redux-saga/effects'

const firestack = new Firestack({ debug: false })

function* listen(channel, saga) {
  while (true) {
    const data = yield call(channel.take)
    yield fork(saga, data)
  }
}

export const addListenerOnRef = (ref, cb) => {
  const channel = createChannel()
  firestack.database.ref(ref).on('value', snaphot => channel.put(snaphot))
  return fork(listen, channel, cb)
}

export const firebaseAuth = (email, password) =>
  firestack.auth.signInWithEmail(email, password).then(data => data.user)

export const firebaseAuthFacebook = (token) =>
  firestack.auth.signInWithProvider('facebook', token, '')
    .then(data => data.user)

export const getCurrentAccessToken = () =>
  AccessToken.getCurrentAccessToken().then(data => {
    return data ? data.accessToken.toString() : false
  })

export const getToken = () =>
  firestack.auth.getToken().then(res => res.token)

export const getCurrentUser = () =>
  firestack.auth.getCurrentUser().then(user => user).catch(() => ({ authenticated: false }))

export const logInWithReadPermissions = () =>
  LoginManager.logInWithReadPermissions(['public_profile']).then(result => {
    return result.accessToken ? result.accessToken.toString() : false
  })

export const getFacebookInfo = () => {
  return new Promise((revolve, reject) => {
    const infoRequest = new GraphRequest(
      '/me?fields=picture.type(large)',
      null,
      (error, result) => {
        if (error) return reject(error)
        return revolve(result)
      }
    )
    // Start the graph request.
    new GraphRequestManager().addRequest(infoRequest).start()
  })
}

export const signOut = () =>
  firestack.auth.signOut().then(data => data)

export const updateFirebaseUser = (data) =>
  firestack.auth.updateUserProfile(data).then(res => res)

export const createUserWithEmail = (email, password) =>
  firestack.auth.createUserWithEmail(email, password)
    .then(data => data)

export const get = ref =>
  firestack.database.ref(ref).once('value')
    .then(snapshot => snapshot.val())

export const update = updates =>
  firestack.database.ref().update(updates)
    .then(snapshot => snapshot)

const generateQuery = (ref, where) =>
  Object.keys(where).reduce((memo, key) => {
    return memo.orderByChild(key).equalTo(where[key])
  }, ref)

const getNamebyRequest = ({ where = [] } = {}) =>
  generateQuery(firestack.database
    .ref(`name`), where)
    .once('value')
    .then(snapshot => snapshot)

export const generateFilter = (genres, filters, origins) => genres.reduce((memo, genre) => {
  if (filters.origin && filters.origin.length) {
    return [
      ...memo,
      ...filters.origin.map(origin =>
        call(getNamebyRequest, {
          where: { genreAndOrgin: `${genre}_${origin}` }
        }))
    ]
  } else {
    return [
      ...memo,
      ...[...Object.keys(origins), 'undefined'].map(origin =>
        call(getNamebyRequest, {
          where: { genreAndOrgin: `${genre}_${origin}` }
        }))
    ]
  }
}, [])
