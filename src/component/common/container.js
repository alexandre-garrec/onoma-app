/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { Image, StyleSheet } from 'react-native'

import LinearGradient from 'react-native-linear-gradient'

const Container = ({children}) =>
  <LinearGradient

    locations={[0.1,0.9]} colors={['#ffff', '#f4f5f9']} style={styles.container}>
    {children}
  </LinearGradient>


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
