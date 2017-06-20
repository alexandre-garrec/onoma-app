import React, { Component } from 'react'
import {
  StyleSheet,
  View
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import { TextField } from 'react-native-material-textfield'
import { validateEmail, validatePassword } from '../../utils/validator'
import { RkButton } from 'react-native-ui-kitten'

class EmailPassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      secureTextEntry: true,
      username: { value: '', error: '' },
      password: { value: '', error: '' }
    }
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

    const name = secureTextEntry
      ? 'md-eye'
      : 'md-eye-off'

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
    const { onSubmit } = this.props
    const usernameValid = validateEmail(username)
    const passwordValid = validatePassword(password)
    if (usernameValid && passwordValid) {
      onSubmit({ username, password })
      this.setError('username', '')
      this.setError('password', '')
    } else {
      this.setError('username', usernameValid ? '' : `Email non valide`)
      this.setError('password', passwordValid ? '' : `Minimum 6 caractères `)
    }
  }

  render() {
    const { username, password, secureTextEntry } = this.state
    const { submitText = 'submit' } = this.props
    return (
      <View style={styles.wrapper}>
        <TextField
          label='Adresse email'
          autoCapitalize='none'
          autoCorrect={false}
          enablesReturnKeyAutomatically={true}
          clearButtonMode='never'
          onFocus={() => this.setError('username', '')}
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
          onFocus={() => this.setError('password', '')}
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
        <RkButton rkType='default' onPress={() =>
          this.onSubmit()
        }>
          {submitText}
        </RkButton>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  wrapper: {
  }
})

export default EmailPassword
