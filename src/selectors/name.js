import { shuffle, difference } from '../utils'
import { createSelector } from 'reselect'
import { getCurrentUser } from './user'

export const getNamesId = state => state.name.list

export const getNameById = (state, id) => state.name.items[id]

export const getMatchs = state => Object.keys(state.match).reduce((memo, id) =>
  state.match[id]
    ? [...memo, id] : memo, [])

const getAllMatch = state => Object.keys(state.match)

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
  [getNamesId, getAllMatch, getCurrentCard],
  (names, match, current) => {
    if (current) return difference(names, [...match, current])
    return difference(names, match)
  }
)

export const makeGetNames = () => createSelector(
  getNamesId,
  names => shuffle(Object.values(names))
)

export const getCurrentCard = state => state.card.current
export const getPreviousCard = state => state.card.previous
export const getNextCard = state => state.card.next
export const getCardNumber = state => state.card.number
