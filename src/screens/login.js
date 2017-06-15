import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native'

import { RkButton, RkTextInput, RkConfig } from 'react-native-ui-kitten'
import Icon from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient'
import KeyboardSpace from 'react-native-keyboard-space'
import { TextField } from 'react-native-material-textfield'
import { validateEmail, validatePassword } from '../utils/validator'

const onClick = (router) => {
  router.push({
    screen: 'example.registration',
    animated: true,
    backButtonTitle: '',
    title: 'Filtre'
  })
}

class Login extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }
  constructor(props) {
    super(props)
    this.state = {
      secureTextEntry: true,
      username: { value: '', error: '' },
      password: { value: '', error: '' }
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.current) nextProps.navigator.pop()
  }

  onTextChange(key, value) {
    const { error } = this.state[key]
    this.setState({ [key]: { error, value } })
  }

  setError(key, error) {
    const { value } = this.state[key]
    this.setState({ [key]: { error, value } })
  }

  onAccessoryPress() {
    this.setState(({ secureTextEntry }) => ({ secureTextEntry: !secureTextEntry }))
  }

  renderPasswordAccessory() {
    const { secureTextEntry } = this.state

    const name = secureTextEntry ?
      'md-eye' :
      'md-eye-off';

    return (
      <Icon
        size={24}
        name={name}
        color={'#fff'}
        onPress={() => this.onAccessoryPress()}
        suppressHighlighting
      />
    )
  }


  onSubmit() {
    const { password: { value: password }, username: { value: username } } = this.state
    this.setError('username', validateEmail(username) ? '' : `Email non valide`)
    this.setError('password', validatePassword(password) ? '' : `Minimum 6 caractères `)
  }

  render() {
    const { navigator, login, error, loginFb } = this.props
    const { username, password, secureTextEntry } = this.state
    return (
      <View style={styles.wrapper}>
        <Image style={styles.image} resizeMode='contain' source={require('../../assets/onoma-png-logo-blanc.png')} />
        <View style={styles.section}>
          <View style={styles.rowContainer}>
            <View style={{ flex: 1 }}>
              <Text>{error}</Text>
              <TextField
                label='Adresse email'
                autoCapitalize='none'
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                clearButtonMode='never'
                onChangeText={username => this.onTextChange('username', username)}
                onSubmitEditing={() => this.refs.password.focus()}
                error={username.error}
                returnKeyType='next'
                tintColor='#fff'
                textColor='#fff'
                baseColor='#fff'
              />
              <TextField
                ref='password'
                baseColor='#fff'
                tintColor='#fff'
                textColor='#fff'
                label='Mot de passe'
                autoCorrect={false}
                autoCapitalize='none'
                onChangeText={text => this.onTextChange('password', text)}
                onSubmitEditing={() => {
                  this.refs.password.blur()
                  this.onSubmit()
                }}
                returnKeyType='done'
                error={password.error}
                secureTextEntry={secureTextEntry}
                clearButtonMode='never'
                renderAccessory={() => this.renderPasswordAccessory()}
              />
              <RkButton rkType='default' onPress={() => login({ username: username.value, password: password.value })}>Connexion</RkButton>
              <RkButton rkType='default' onPress={() => onClick(navigator)}>Inscription</RkButton>
              <RkButton rkType='default facebook' onPress={() => loginFb()}>
                <Icon style={{ marginRight: 10 }} name={'logo-facebook'} />
                Connexion avec Facebook
            </RkButton>
              <KeyboardSpace />
            </View>
          </View>
        </View>
      </View>
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f06292'
  },
  image: {
    width: 170,
    marginBottom: 0
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
  },
})
