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
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'

export default class onoma extends Component {
  render() {
    return (
      <View 
        end={{x: 0.0, y: 0}}
        start={{x: 1, y: 0}}
        locations={[0.3,0.7]} colors={['#F8BBD0', '#C5CAE9']} style={styles.container}>
        <View style={styles.row}>
         <Icon style={styles.icon} name={'md-female'} size={20} color={'rgb(59,89,152)'} />
          <Text>Alexandre</Text>
        </View>
        <View style={styles.row}>
         <Icon style={styles.icon} name={'md-female'} size={20} color={'rgb(59,89,152)'} />
          <Text>Thomas</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  icon: {
    paddingRight: 20
  },
  row: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    flexDirection: 'row'
  }
});

