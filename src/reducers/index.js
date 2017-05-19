import {combineReducers} from 'redux'
import name from './name'
import match from './match'
import filter from './filter'
import card from './card'
import user from './user'
import channel from './channel'

const applicationReducers = {
  name,
  match,
  filter,
  card,
  user,
  channel
}

export default () => combineReducers(applicationReducers)
