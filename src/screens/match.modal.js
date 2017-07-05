import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Image
} from 'react-native'

import { connect } from 'react-redux'
import { MODAL_MATCH_CLOSE } from '../actions'
import { getCurrentUser } from '../selectors/user'
import { getMatchName } from '../selectors/gui'

import { RkText, RkButton } from 'react-native-ui-kitten'

const getPicture = (picture) => picture ? { uri: picture } : require('../../assets/profile.jpg')

const Profil = ({ closeModal, navigator, name, user: { picture } = {} }) =>
  <View style={styles.wrapper}>
    <Image style={styles.logo} resizeMode='contain' source={require('../../assets/onoma-png-logo-blanc.png')} />
    <View style={{ width: 200 }}>
      <RkText rkType='big'>{name}</RkText>
      <RkText rkType='error'>Vous et votre partenaire aimez ce prénom</RkText>
      <View style={styles.image_wrapper}>
        <Image style={styles.image} source={getPicture(picture)} />
        <Image style={styles.image} source={require('../../assets/profile.jpg')} />
      </View>
      <RkButton rkType='border big' onPress={() => {
        navigator.dismissLightBox()
        closeModal()
      }}>Fermer</RkButton>
    </View>
  </View>

const mapDispatchToProps = (dispatch, { id }) => ({
  closeModal: (data) => dispatch({ type: MODAL_MATCH_CLOSE })
})

const mapStateToProps = (state) => {
  const user = getCurrentUser(state)
  const name = getMatchName(state)
  return {
    user,
    name
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profil)

var styles = StyleSheet.create({
  logo: {
    width: 170,
    marginBottom: 40
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  image_wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginVertical: 40
  },
  image: {
    margin: 10,
    height: 100,
    borderRadius: 50,
    width: 100
  }
})
