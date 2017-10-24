import React from 'react'
import {
  StyleSheet,
  View
} from 'react-native'

import { connect } from 'react-redux'

import { RkText, RkButton } from 'react-native-ui-kitten'

const Profil = ({ closeModal, navigator }) =>
  <View style={styles.wrapper}>
    <View style={{ width: 300 }}>
      <RkText rkType='big'>Vous étes maintenant lier a votre partenaire</RkText>
      <RkButton rkType='border big' onPress={() => {
        navigator.dismissLightBox()
        closeModal()
      }}>Fermer</RkButton>
    </View>
  </View>

const mapStateToProps = (state) => {
  return {
  }
}

export default connect(mapStateToProps)(Profil)

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
