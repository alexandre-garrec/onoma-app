import { shuffle } from '../utils'
import { createSelector } from 'reselect'

const match = (name, filters) =>
  !Object.keys(filters).reduce(
    (memo, f) => memo || name[f] !== filters[f]
  , false)

export const getNamesId = state => state.name.items

export const getNameById = (state, id) => state.name.items[id]

export const getMatchs = state => state.match

export const getFilters = state => state.filter

export const getNames = state => Object.values(state.name.items)

export const makeGetNamesId = () => createSelector(
  getNamesId, getFilters,
  (names, filters) =>
    Object.keys(names).reduce((memo, key) =>
      match(names[key], filters) ? [ ...memo, key ] :  memo
    , [])
)

export const makeGetNames = () => createSelector(
  getNamesId,
  names => shuffle(Object.values(names))
)
