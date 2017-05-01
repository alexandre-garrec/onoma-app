import {combineReducers} from 'redux'
import name from './name'
import match from './match'
import filter from './filter'
import card from './card'
import user from './user'

const applicationReducers = {
  name,
  match,
  filter,
  card,
  user
}

export default () => combineReducers(applicationReducers)
