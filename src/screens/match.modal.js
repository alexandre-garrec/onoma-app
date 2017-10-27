import React from 'react'
import { StyleSheet, View, Image } from 'react-native'

import { connect } from 'react-redux'
import { getUserById } from '../selectors/user'

import { RkText, RkButton } from 'react-native-ui-kitten'
import withOutNavbar from '../utils/withOutNavbar'
import { getChannel } from '../selectors/channel'

const getPicture = (picture) => picture ? { uri: picture } : require('../../assets/profile.jpg')

const Profil = ({ navigator, name, users }) =>
  <View style={styles.wrapper}>
    <Image style={styles.logo} resizeMode='contain' source={require('../../assets/onoma-png-logo-blanc.png')} />
    <View style={{ width: 200 }}>
      <View style={styles.image_wrapper}>
        {users.map(user => <Image key={user.id} style={styles.image} source={getPicture(user.picture)} />)}
      </View>
      <RkText rkType='big'>{name}</RkText>
      <RkText rkType='error'>Vous et votre partenaire aimez ce prénom</RkText>
      <RkButton rkType='border big' onPress={() => {
        navigator.dismissLightBox()
      }}>Fermer</RkButton>
    </View>
  </View>

const mapStateToProps = (state) => {
  const [channel] = getChannel(state)
  const users = channel ? channel.users.map(id => getUserById(state, id)) : []
  return {
    users
  }
}

export default connect(mapStateToProps)(withOutNavbar(Profil))

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
