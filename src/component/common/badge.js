import React from 'React'
import { Text, View, StyleSheet } from 'react-native'
import { COLOR_PINK } from '../../style'

const Badge = ({ number = 0, children }) =>
  <View style={styles.wrapper}>
    {children}
    {number ? <View style={styles.badge}>
      <Text style={styles.text}>{number}</Text>
    </View> : <View />}
  </View>

var styles = StyleSheet.create({
  wrapper: {
    position: 'relative'
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -8,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR_PINK
  },
  text: {
    color: '#fff',
    fontSize: 10
  }
})

export default Badge
