import React from 'react'
import { StyleSheet, View, Image } from 'react-native'

import { RkText, RkButton } from 'react-native-ui-kitten'

import { connect } from 'react-redux'
import { getCurrentUser } from '../selectors/user'
import { USER_LOGOUT } from '../actions'

import { H1 } from '../styles/text'

const onClick = router => {
  router.push({
    screen: 'example.channel',
    animated: true,
    backButtonTitle: '',
    title: 'Partenaire'
  })
}

const onClickFilter = router => {
  router.push({
    screen: 'example.filter',
    animated: true,
    backButtonTitle: '',
    title: 'Filtres'
  })
}

const onClickListAll = router => {
  router.push({
    screen: 'example.list.all',
    animated: true,
    backButtonTitle: '',
    title: 'List'
  })
}

const ICON = {
  resizeMode: 'contain',
  style: { height: 24, width: 24, marginRight: 10 }
}

const Profil = ({ user, logout, router }) =>
  user ? (
    <View style={styles.wrapper}>
      <View
        style={{ width: 300, justifyContent: 'center', alignItems: 'center' }}
      >
        <View style={styles.image_wrapper}>
          <Image
            style={styles.image}
            source={
              user.picture
                ? { uri: user.picture }
                : require('../../assets/profile.jpg')
            }
          />
          <H1 style={{ marginTop: 20, fontSize: 22, color: '#555555' }}>
            {user.displayName || user.email}
          </H1>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
          <RkButton
            onPress={() => onClick(router)}
            rkType='default clean blue medium'
          >
            <Image
              {...ICON}
              source={require('../../assets/icons/onoma-partenaire.png')}
            />
            Partenaire
          </RkButton>
          <RkButton
            onPress={() => onClickFilter(router)}
            rkType='default clean purple medium'
          >
            <Image
              {...ICON}
              source={require('../../assets/icons/onoma-reglages.png')}
            />
            Filtres
          </RkButton>
          {/* <RkButton
            onPress={() => onClickListAll(router)}
            rkType='default clean purple medium'
          >
            <Image
              {...ICON}
              source={require('../../assets/icons/onoma-reglages.png')}
            />
            List all
          </RkButton> */}
          <RkButton rkType='default clean medium' onPress={logout}>
            <Image
              {...ICON}
              source={require('../../assets/icons/onoma-deco.png')}
            />
            Déconnexion
          </RkButton>
        </View>
      </View>
    </View>
  ) : (
    <View />
  )

const mapStateToProps = state => {
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
