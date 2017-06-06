import { shuffle } from '../utils'
import { createSelector } from 'reselect'
import { getCurrentUser } from './user'

const match = (name, filters) =>
  Object.keys(filters).reduce(
    (memo, key) => {
      if (memo === false || filters[key] === false) return memo
      switch (key) {
        case 'isMale': return name[key] === filters[key]
        case 'isFemale': return name[key] === filters[key]
        case 'origin': return filters[key].length ? filters[key].includes(name[key]) : true
        default: return true
      }
    }, true)

export const getNamesId = state => state.name.items

export const getNameById = (state, id) => state.name.items[id]

export const getMatchs = state => Object.keys(state.match)

export const getFilters = state => state.filter

export const getNameLoadingStatus = state => state.name.gui.loading

export const getNames = state => Object.values(state.name.items)

export const getMatchList = state => {
  const user = getCurrentUser(state)
  if (!user || !user.channels) return []
  return user.channels.reduce((memo, channelId) => {
    return [
      ...memo,
      ...(state.channel[channelId] ? state.channel[channelId].match : {})
    ]
  }, [])
}

export const makeGetNamesId = () => createSelector(
  getNamesId, getFilters,
  (names, filters) =>
    Object.keys(names).reduce((memo, key) =>
      match(names[key], filters) ? [...memo, key] : memo
      , [])
)

export const makeGetNames = () => createSelector(
  getNamesId,
  names => shuffle(Object.values(names))
)

export const getCurrentCard = state => state.card.current
export const getPreviousCard = state => state.card.previous
export const getNextCard = state => state.card.next
export const getCardNumber = state => state.card.number
