/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class onoma extends Component {
  render() {
    return (
      <View 
        end={{x: 0.0, y: 0}}
        start={{x: 1, y: 0}}
        locations={[0.3,0.7]} colors={['#F8BBD0', '#C5CAE9']} style={styles.container}>
        <Text>Alexandre</Text>
        <Text>Thomas</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent'
  }
});

