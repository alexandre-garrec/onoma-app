import { Navigation } from 'react-native-navigation'

import MainTabScreen from './main'
import LoginTabScreen from './list'
import NameScreen from './name'
import FilterScreen from './filter'
import LoginScreen from './login'
import ChannelScreen from './channel'
import SettingScreen from './setting'
import RegistrationScreen from './registration'
import JoinModal from './join.modal'
import MatchModal from './match.modal'
import ListAll from './listAll'
import DescriptionModal, { DescriptionwithOutNavbar } from './description.modal'

export function registerScreens(store, provider) {
  Navigation.registerComponent('example.FirstTabScreen', () => MainTabScreen, store, provider)
  Navigation.registerComponent('example.SecondTabScreen', () => LoginTabScreen, store, provider)
  Navigation.registerComponent('example.NameScreen', () => NameScreen, store, provider)
  Navigation.registerComponent('example.filter', () => FilterScreen, store, provider)
  Navigation.registerComponent('example.login', () => LoginScreen, store, provider)
  Navigation.registerComponent('example.channel', () => ChannelScreen, store, provider)
  Navigation.registerComponent('example.setting', () => SettingScreen, store, provider)
  Navigation.registerComponent('example.registration', () => RegistrationScreen, store, provider)
  Navigation.registerComponent('example.description.modal', () => DescriptionwithOutNavbar, store, provider)
  Navigation.registerComponent('example.list.all', () => ListAll, store, provider)
  // Modal
  Navigation.registerComponent('example.join.modal', () => JoinModal, store, provider)
  Navigation.registerComponent('example.match.modal', () => MatchModal, store, provider)
  Navigation.registerComponent('example.description', () => DescriptionModal, store, provider)
}
