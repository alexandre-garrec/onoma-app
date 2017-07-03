import React, { cloneElement } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

export const ButtonWrapper = ({ children }) =>
  <View style={styles.genderButtonWrapper}>
    {children.map((elm, i) => cloneElement(elm, { key: i, style: { flex: children.length } }))}
  </View>

export const Button = ({ style, children, onPress, isActive }) =>
  <TouchableOpacity style={[
    styles.genderButton,
    isActive ? styles.genderButtonActive : {},
    style
  ]}
    onPress={onPress}>
    {children}
  </TouchableOpacity>

var styles = StyleSheet.create({
  genderButton: {
    borderRadius: 4,
    borderColor: '#e5e5e5',
    borderWidth: 1,
    backgroundColor: '#fff',
    height: 100,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  genderButtonActive: {
    // backgroundColor: '#fff'
  },
  genderButtonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10
  },
})
