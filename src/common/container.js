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
    end={{x: 0.0, y: 0}}
    start={{x: 1, y: 0}}
    locations={[0.1,0.9]} colors={['#F8BBD0', '#C5CAE9']} style={styles.container}>
    {children}
  </LinearGradient>


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingTop: 20
  },
  logo: {
    marginTop: 20,
    width: 100,
    resizeMode: 'contain',
  }
})

export default Container

