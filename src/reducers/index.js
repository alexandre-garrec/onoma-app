import {combineReducers} from 'redux'
import name from './name'

const applicationReducers = {
  name
}

export default () => combineReducers(applicationReducers)
