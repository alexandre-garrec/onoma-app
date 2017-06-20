const Channel = ({ uid, dynamicLink = '', match = {}, users = {} }) => ({
  id: uid,
  dynamicLink,
  match: Object.keys(match).map(id => parseInt(id)),
  users: Object.keys(users)
})

export default Channel
