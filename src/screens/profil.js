import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native'

import { RkText } from 'react-native-ui-kitten'
import Icon from 'react-native-vector-icons/Ionicons'

const Profil = () =>
  <View style={styles.wrapper}>
    <View>
      <View style={styles.image_wrapper}>
        <Image style={styles.image} source={require('../../assets/profile.jpg')}/>
        <RkText>John Doe</RkText>
      </View>
      <RkText><Icon name='ios-link-outline' />Partenaire</RkText>
      <RkText><Icon name='ios-flask-outline' />Réglages</RkText>
      <RkText><Icon name='ios-beer-outline' /> Déconnexion</RkText>
    </View>
  </View>

var styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  image_wrapper:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginBottom: 40
  },
  image: {
    height: 100,
    borderRadius: 50,
    width: 100
  }
})

export default Profil
