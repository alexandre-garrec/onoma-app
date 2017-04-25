import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native'

const Profil = () => 
  <View style={stylesProfil.wrapper}>
    <Image style={stylesProfil.image} source={require('../../assets/profile.jpg')}/>
    <Text style={stylesProfil.username}>Alexandre Garrec</Text>
    <Text style={stylesProfil.username}>Ajouter ma partenaire</Text>
    <Text style={stylesProfil.username}>Offline</Text>
  </View>

var stylesProfil = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  username: {
    color: '#fff',
    margin: 20,
    fontSize: 16
  },
  image: {
    height: 100,
    borderRadius: 50,
    width: 100
  }
})

export default Profil
