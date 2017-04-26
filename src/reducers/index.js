import {combineReducers} from 'redux'
import name from './name'
import match from './match'

const applicationReducers = {
  name,
  match
}

export default () => combineReducers(applicationReducers)
