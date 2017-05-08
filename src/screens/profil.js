import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native'

import { RkText, RkButton } from 'react-native-ui-kitten'
import Icon from 'react-native-vector-icons/Ionicons'

const Profil = ({ user: { email, displayName, picture }, logout }) =>
  <View style={styles.wrapper}>
    <View>
      <View style={styles.image_wrapper}>
        <Image style={styles.image} source={picture ? {uri : picture } : require('../../assets/profile.jpg')}/>
        <RkText>{displayName || email}</RkText>
      </View>
      <RkText><Icon name='ios-link-outline' />Partenaire</RkText>
      <RkText><Icon name='ios-flask-outline' />Réglages</RkText>
      <RkButton onPress={logout}>Déconnexion</RkButton>
    </View>
  </View>


import { connect } from 'react-redux'
import { getCurrentUser } from '../selectors/user'
import { USER_LOGOUT } from '../actions'

const mapStateToProps = (state) => {
  const user = getCurrentUser(state)
  return {
    user
  }
}

const mapDispatchToProps = (dispatch, { id }) => ({
  logout: () => dispatch({ type: USER_LOGOUT })
})

export default connect(mapStateToProps, mapStateToProps)(Profil)

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
