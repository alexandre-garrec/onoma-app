import Firestack from 'react-native-firestack'

const firestack = new Firestack()

export const firebaseAuth = (email, password) =>
  firestack.auth.signInWithEmail(email, password).then(data => data.user)

export const firebaseAuthFacebook = (token) =>
  firestack.auth.signInWithProvider('facebook', token, '')
    .then(data => data.user)

export const getCurrentAccessToken = () =>
  AccessToken.getCurrentAccessToken().then(data => data ? data.accessToken.toString() : false)

export const getToken = () => firestack.auth.getToken()
  .then(res => res.token)

export const getCurrentUser = () =>
 firestack.auth.getCurrentUser().then(user => user).catch(() => ({authenticated: false}))

export const logInWithReadPermissions = () =>
  LoginManager.logInWithReadPermissions().then(result => result.accessToken.toString())

export const signOut = () =>
 firestack.auth.signOut().then(data => data)

export const get = ref =>
  firestack.database.ref(ref).once('value')
  .then(snapshot => snapshot.val())

export const update = updates =>
 firestack.database.ref().update(updates)
  .then(snapshot => snapshot)
