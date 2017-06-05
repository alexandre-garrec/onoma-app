import { combineReducers } from 'redux'
import name from './name'
import match from './match'
import filter from './filter'
import card from './card'
import user from './user'
import channel from './channel'
import origin from './origin'

const applicationReducers = {
  name,
  match,
  filter,
  card,
  user,
  channel,
  origin
}

export default () => combineReducers(applicationReducers)
