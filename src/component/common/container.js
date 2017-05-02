/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { Image, StyleSheet } from 'react-native'

import LinearGradient from 'react-native-linear-gradient'

const onClick = router =>
  router.showLightBox({
    screen: "example.login", // unique ID registered with Navigation.registerScreen
    passProps: {}, // simple serializable object that will pass as props to the modal (optional)
    navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
    style: {
      backgroundBlur: "dark", // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
      backgroundColor: "#ffffff90" // tint color for the background, you can specify alpha here (optional)
   }
  })

class Container extends Component {
  componentWillMount() {
    this.props.router && onClick(this.props.router)
  }
  render() {
    const { children } = this.props
    return (
       <LinearGradient
        locations={[0.1,0.9]} colors={['#ffff', '#f4f5f9']} style={styles.container}>
        {children}
      </LinearGradient>
     )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingTop: 20
  }
})

export default Container