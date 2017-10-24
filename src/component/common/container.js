import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import NavigationActions from '../../utils/navigationActions'

import LinearGradient from 'react-native-linear-gradient'

class Container extends Component {
  constructor(props) {
    super(props)
    NavigationActions.setNavigator(props.navigator)
  }
  render() {
    const { children } = this.props
    return (
      <LinearGradient
        locations={[0.1, 0.9]} colors={['#ffff', '#f4f5f9']} style={styles.container}>
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
