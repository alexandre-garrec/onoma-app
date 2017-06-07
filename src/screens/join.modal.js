import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native'

import { RkText, RkButton } from 'react-native-ui-kitten'
import Icon from 'react-native-vector-icons/Ionicons'

const Profil = ({ user, logout, router }) =>
  <View style={styles.wrapper}>
    <View style={{ width: 300 }}>
      <RkText>Vous étes maintenant lier a ...</RkText>
      <RkButton>Fermer</RkButton>
    </View>
  </View>


import { connect } from 'react-redux'
import { getCurrentUser } from '../selectors/user'
import { } from '../actions'

const mapStateToProps = (state) => {
  const user = getCurrentUser(state)
  return {
    user
  }
}

const mapDispatchToProps = (dispatch, { id }) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Profil)

var styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  image_wrapper: {
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
