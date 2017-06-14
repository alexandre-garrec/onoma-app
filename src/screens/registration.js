import React, { Component } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { RkButton, RkText, RkConfig } from 'react-native-ui-kitten';
import { Hoshi } from 'react-native-textinput-effects'
import Icon from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient'
import KeyboardSpace from 'react-native-keyboard-space'

const validateEmail = (email = '') => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

const validatePassword = (password = '') => {
  return password.length < 6
}

class Registration extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      error: false
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.current) nextProps.navigator.push({
      screen: 'example.FirstTabScreen',
      animated: true,
      backButtonTitle: '',
    })
  }
  render() {
    const { navigator, register } = this.props
    const { username, password, error } = this.state
    return (
      <View style={styles.wrapper}>
        <View style={styles.section}>
          <View style={styles.rowContainer}>
            <View style={{ flex: 1 }}>
              <RkText rkType='error'>{error}</RkText>
              <Hoshi
                labelStyle={{ color: '#fff' }}
                inputStyle={{ color: '#fff' }}
                label={'Adresse email'}
                borderColor={'transparent'}
                clearButtonMode='always'
                onChangeText={text => this.setState({ username: text })}
                autoCapitalize={'none'}
                autoCorrect={false}
              />
              <Hoshi
                labelStyle={{ color: '#fff' }}
                inputStyle={{ color: '#fff' }}
                label={'Mot de passe'}
                onChangeText={text => this.setState({ password: text })}
                secureTextEntry={true}
                style={{ marginTop: 10 }}
                clearButtonMode='always'
                borderColor={'transparent'}
              />
              <RkButton rkType='default' onPress={() => {
                if (!validateEmail(username)) {
                  return this.setState({ error: `Votre email n'est pas valide` })
                }
                else if (validatePassword(password)) {
                  return this.setState({ error: `Votre mot de passe doit contenir au moins 6 caractères` })
                }
                register({ username, password })
              }}>Suivant</RkButton>
              <RkButton rkType='default' onPress={() => navigator.pop()}>Retour</RkButton>
              <KeyboardSpace />
            </View>
          </View>
        </View>
      </View>
    )
  }
}

import { connect } from 'react-redux'
import { USER_REGISTER } from '../actions'
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
  register: (data) => dispatch({ type: USER_REGISTER, payload: data }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Registration)

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
