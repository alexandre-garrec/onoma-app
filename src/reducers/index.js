import {combineReducers} from 'redux'
import name from './name'
import match from './match'
import filter from './filter'

const applicationReducers = {
  name,
  match,
  filter
}

export default () => combineReducers(applicationReducers)
