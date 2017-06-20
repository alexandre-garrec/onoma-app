const User = ({ uid, email, displayName, photoURL, channels = [], link }) => ({
  id: uid,
  email,
  displayName: displayName,
  picture: photoURL,
  channels: Object.keys(channels),
  link
})

export default User
