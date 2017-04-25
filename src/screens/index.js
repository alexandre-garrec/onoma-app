import { Navigation } from 'react-native-navigation'

import MainTabScreen from './main'
import LoginTabScreen from './list'

// register all screens of the app (including internal ones)
export function registerScreens(store, provider) {
  Navigation.registerComponent('example.FirstTabScreen', () => MainTabScreen, store, provider)
  Navigation.registerComponent('example.SecondTabScreen', () => LoginTabScreen, store, provider)
}
