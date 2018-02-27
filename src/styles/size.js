import { Platform } from 'react-native'
import { ifIphoneX } from 'react-native-iphone-x-helper'

export const STATUS_BAR_HEIGHT = Platform.select({
  ios: ifIphoneX(44, 20),
  android: 0
})