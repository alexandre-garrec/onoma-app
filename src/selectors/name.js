import { shuffle } from '../utils'
import { createSelector } from 'reselect'

export const getNamesId = state => state.name.items

export const getNameById = (state, id) => state.name.items[id]

export const getMatchs = state => state.match

export const getNames = state => Object.values(state.name.items)

export const makeGetNamesId = () => createSelector(
  getNamesId,
  names => shuffle(Object.keys(names))
)

export const makeGetNames = () => createSelector(
  getNamesId,
  names => shuffle(Object.values(names))
)
