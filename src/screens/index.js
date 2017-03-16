import { Navigation } from 'react-native-navigation'

import MainTabScreen from './main'
import LoginTabScreen from './list'

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('example.FirstTabScreen', () => MainTabScreen)
  Navigation.registerComponent('example.SecondTabScreen', () => LoginTabScreen)
}