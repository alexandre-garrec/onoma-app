import { combineReducers } from 'redux'
import name from './name'
import match from './match'
import filter from './filter'
import card from './card'
import user from './user'
import channel from './channel'
import origin from './origin'
import gui from './gui'
import description from './description'

const applicationReducers = {
  name,
  match,
  filter,
  card,
  user,
  channel,
  origin,
  gui,
  description
}

export default () => combineReducers(applicationReducers)
