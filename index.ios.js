import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'
import configureStore from './src/config'
import { registerScreens } from './src/screens'

const store = configureStore()

registerScreens(store, Provider) // this is where you register all of your app's screens

Navigation.startSingleScreenApp({
  screen: {
    screen: 'example.FirstTabScreen', // unique ID registered with Navigation.registerScreen
    title: 'ONOMA', // title of the screen as appears in the nav bar (optional)
    navigatorStyle: {
      drawUnderNavBar: true,
      navBarBlur: true,
      navBarTextColor: '#fff',
      navBarButtonColor: '#fff',
      // statusBarTextColorScheme: 'light',
      // navBarTransparent: true,
    }
  },

  passProps: {}, // simple serializable object that will pass as props to all top screens (optional)
  animationType: 'none' // optional, add transition animation to root change: 'none', 'slide-down', 'fade'
})
