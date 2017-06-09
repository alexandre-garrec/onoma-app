import { Dimensions } from 'react-native'

const set = (name, ...params) => {
  const tab = ['Top', 'Left', 'Bottom', 'Right']
  let currentParams = -1
  return tab.reduce((memo, position) => {
    currentParams = currentParams !== (params.length - 1) ? currentParams + 1 : 0
    return { ...memo, [`${name}${position}`]: params[currentParams] }
  }, {})
}

export const padding = (...params) => set('padding', ...params)

export const width = percent => {
  const { width } = Dimensions.get('window')
  return width * percent / 100
}

export const height = percent => {
  const { height } = Dimensions.get('window')
  return height * percent / 100
}
