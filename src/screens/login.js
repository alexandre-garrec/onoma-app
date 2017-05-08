import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native'

import { RkButton, RkTextInput } from 'react-native-ui-kitten';
import Icon from 'react-native-vector-icons/Ionicons'
import RoundButton, { Group } from '../component/common/roundButton'
const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken
} = FBSDK;

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.current) nextProps.navigator.dismissLightBox()
  }
  render() {
    const { navigator, login, error } = this.props
    const { username, password } = this.state
    return (
      <View style={styles.wrapper}>
        <Text>{error}</Text>
        <RkTextInput
          rkType='rounded'
          onChangeText={text => this.setState({username: text})}
          label={<Icon name='ios-search-outline'/>}
          containerStyle={{marginTop: 20}}
          placeholder='username'/>
        <RkTextInput
          rkType='rounded'
          onChangeText={text => this.setState({password: text})}
          label={<Icon name='ios-search-outline'/>}
          containerStyle={{marginTop: 20}}
          placeholder='password'/>
        <RkButton onPress={() => login(username, password)}>connect</RkButton>
         <LoginButton
          publishPermissions={["publish_actions"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("login has error: " + result.error);
              } else if (result.isCancelled) {
                alert("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    alert(data.accessToken.toString())
                  }
                )
              }
            }
          }
          onLogoutFinished={() => alert("logout.")}/>
      </View>
    )
  }
}

import { connect } from 'react-redux'
import { USER_LOGIN } from '../actions'
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
  login: (username, password) => dispatch({ type: USER_LOGIN, payload: { username, password } })
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)

var styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: 200
  }
})
