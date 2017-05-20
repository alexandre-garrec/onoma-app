import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native'

import { RkText, RkButton } from 'react-native-ui-kitten'
import Icon from 'react-native-vector-icons/Ionicons'

const onClick = (router) => {
  router.push({
    screen: 'example.channel',
    animated: true,
    backButtonTitle: '',
    title: 'Partenaire'
  })
}

const Profil = ({ user, logout, router }) =>
  user ?
  <View style={styles.wrapper}>
    <View style={{width: 300}}>
      <View style={styles.image_wrapper}>
        <Image style={styles.image} source={user.picture ? { uri: user.picture } : require('../../assets/profile.jpg')} />
        <RkText style={{marginTop: 20, fontSize: 20}}>{user.displayName || user.email}</RkText>
      </View>
      <RkButton onPress={() => onClick(router)} rkType='default' >
        <Icon name='ios-link-outline' style={{marginRight: 10, fontSize: 18}} />
        Partenaire
      </RkButton>
      <RkButton rkType='default' >
        <Icon name='ios-flask-outline' style={{marginRight: 10, fontSize: 18}} />
        Réglages
      </RkButton>
      <RkButton rkType='default facebook' onPress={logout}>Déconnexion</RkButton>
    </View>
  </View> : <View/>


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

export default connect(mapStateToProps, mapDispatchToProps)(Profil)

var styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  image_wrapper:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginVertical: 40
  },
  image: {
    height: 100,
    borderRadius: 50,
    width: 100
  }
})
