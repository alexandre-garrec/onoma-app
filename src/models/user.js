const User = ({ uid, email, displayName, photoURL }) => ({
  id: uid,
  email,
  displayName: displayName,
  picture: photoURL
})

export default User
