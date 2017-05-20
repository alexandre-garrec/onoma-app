const User = ({ uid, email, displayName, photoURL, channels = [] }) => ({
  id: uid,
  email,
  displayName: displayName,
  picture: photoURL,
  channels: channels
})

export default User
