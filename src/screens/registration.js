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
import LinearGradient from 'react-native-linear-gradient'
import KeyboardSpace from 'react-native-keyboard-space'

class Registration extends Component {
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
              <Text>{error}</Text>
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
              <RkButton rkType='default' onPress={() => register({ username, password })}>Suivant</RkButton>
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