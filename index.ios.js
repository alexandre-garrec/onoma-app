import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'
import configureStore from './src/config'
import { registerScreens } from './src/screens'

import { displayLogin } from './src/selectors/user'

const store = configureStore()

registerScreens(store, Provider)

class App {
  constructor() {
    store.subscribe(this.onStoreUpdate.bind(this))
    this.state = {
      currentScreen: false
    }
  }

  onStoreUpdate() {
    const state = store.getState()
    const { currentScreen } = this.state
    if (displayLogin(state) === true && currentScreen !== 'userNeedLogin') {
      this.state.currentScreen = 'userNeedLogin'
      return this.userNeedLogin()
    } else if (displayLogin(state) === false && currentScreen !== 'userConnected') {
      this.state.currentScreen = 'userConnected'
      return this.userConnected()
    }
  }

  userConnected() {
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
  }
  userNeedLogin() {
    Navigation.startSingleScreenApp({
      screen: {
        screen: 'example.login',
        title: 'ONOMA',
        navigatorStyle: {
          drawUnderNavBar: true,
          navBarTextColor: '#fff',
          navBarButtonColor: '#fff'
        }
      }
    })
  }
}

new App()
