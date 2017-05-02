import { Navigation } from 'react-native-navigation'

import MainTabScreen from './main'
import LoginTabScreen from './list'
import NameScreen from './name'
import FilterScreen from './filter'
import LoginScreen from './login'

// register all screens of the app (including internal ones)
export function registerScreens(store, provider) {
  Navigation.registerComponent('example.FirstTabScreen', () => MainTabScreen, store, provider)
  Navigation.registerComponent('example.SecondTabScreen', () => LoginTabScreen, store, provider)
  Navigation.registerComponent('example.NameScreen', () => NameScreen, store, provider)
  Navigation.registerComponent('example.ModalScreenFilter', () => FilterScreen, store, provider)
  Navigation.registerComponent('example.login', () => LoginScreen, store, provider)
}
