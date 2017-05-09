import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native'

import { RkButton, RkTextInput, RkConfig } from 'react-native-ui-kitten';
import { Hoshi } from 'react-native-textinput-effects'
import Icon from 'react-native-vector-icons/Ionicons'
import RoundButton, { Group } from '../component/common/roundButton'
const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken
} = FBSDK;

import LinearGradient from 'react-native-linear-gradient'

class Login extends Component {
  static navigatorStyle = {
     navBarHidden: true
  }
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.current) nextProps.navigator.pop()
  }
  render() {
    const { navigator, login, error, loginFb } = this.props
    const { username, password } = this.state
    return (
      <LinearGradient
        end={{x: 0.0, y: 0}}
        start={{x: 1, y: 0}}
        locations={[0.3,0.7]} colors={['#F8BBD0', '#C5CAE9']} style={styles.wrapper}>
        <Image style={styles.image} resizeMode='contain' source={require('../../assets/onoma-png-logo-blanc.png')}/>
        <View style={styles.section}>
          <Text style={styles.titleText}>Connexion</Text>
          <View style={styles.rowContainer}>
            <View style={{flex: 1}}>
            <Text>{error}</Text>
            <Hoshi
              label={'Adresse email'}
              // this is used as active and passive border color
              borderColor={'#9b537a'}
              clearButtonMode='always'
              onChangeText={text => this.setState({username: text})}
            />
            <Hoshi
              label={'Mot de passe'}
              onChangeText={text => this.setState({password: text})}
              secureTextEntry={true}
              style={{marginTop: 10}}
              clearButtonMode='always'
              // this is used as active and passive border color
              borderColor={'#9b537a'}
            />
            <RkButton style={{marginTop: 10}} rkType='basic medium' onPress={() => login({username, password})}>Connexion</RkButton>
            <RkButton style={{marginTop: 10}} rkType='medium outline' onPress={() => loginFb()}>
              <Icon style={{marginRight: 5, fontSize: 18}} name={'logo-facebook'}/>
              Connexion avec Facebook
            </RkButton>
        </View>
        </View>
        </View>
      </LinearGradient>
    )
  }
}

import { connect } from 'react-redux'
import { USER_LOGIN, USER_FACEBOOK_LOGIN } from '../actions'
import { getError, getCurrentId } from '../selectors/user'

const mapStateToProps = (state) => {
  const error = getError(state)
  const current = getCurrentId(state)
  return {
    error,
    current
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (data) => dispatch({ type: USER_LOGIN, payload: data }),
  loginFb: (data) => dispatch({ type: USER_FACEBOOK_LOGIN })
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)

var styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    //backgroundColor: ''
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 200
  },
  titleText: {
    fontSize: 20,
    textAlign: 'center'
  },
  rowContainer: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap'
  },
   section: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    width: 300,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderColor: '#d8dce5',
    borderWidth: 1,
    shadowOffset:{
      width: 0,
      height: 2,
    },
    shadowColor: 'black',
    shadowOpacity: 0.1,
  },
})
