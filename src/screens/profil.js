import React from 'react'
import { StyleSheet, View, Image } from 'react-native'

import { RkText, RkButton } from 'react-native-ui-kitten'
import Icon from 'react-native-vector-icons/Ionicons'

import { connect } from 'react-redux'
import { getCurrentUser } from '../selectors/user'
import { USER_LOGOUT } from '../actions'

import { COLOR_BLACK } from '../style'

const onClick = (router) => {
  router.push({
    screen: 'example.channel',
    animated: true,
    backButtonTitle: '',
    title: 'Partenaire'
  })
}


const onClickFilter = (router) => {
  router.push({
    screen: 'example.filter',
    animated: true,
    backButtonTitle: '',
    title: 'Filtres'
  })
}

const Profil = ({ user, logout, router }) =>
  user ?
    <View style={styles.wrapper}>
      <View style={{ width: 300, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.image_wrapper}>
          <Image style={styles.image} source={user.picture ? { uri: user.picture } : require('../../assets/profile.jpg')} />
          <RkText style={{ marginTop: 20, fontSize: 22, color: '#555555' }}>{user.displayName || user.email}</RkText>
        </View>
        <RkButton onPress={() => onClickFilter(router)} rkType='default clean blue medium' >
          <Icon name='ios-options' style={{ marginRight: 15, fontSize: 20 }} />
          Filtres
        </RkButton>
        <RkButton onPress={() => onClick(router)} rkType='default clean purple medium' >
          <Icon name='ios-link-outline' style={{ marginRight: 15, fontSize: 20 }} />
          Partenaire
        </RkButton>
        <RkButton rkType='default clean medium' onPress={logout}>
          <Icon name='md-bicycle' style={{ marginRight: 15, fontSize: 20 }} />
          Déconnexion
        </RkButton>
      </View>
    </View> : <View />


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
