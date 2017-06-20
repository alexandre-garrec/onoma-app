import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const SIZE = {
  small: {
    fontSize: 26,
    width: 50,
    height: 50
  },
  normal: {
    fontSize: 32,
    width: 60,
    height: 60
  }
}

const RoundButton = ({ icon, size = 'normal', color, onPress, style }) => {
  const genStyle = styles(size)
  return (
    <TouchableOpacity style={genStyle.button} onPress={onPress}>
      <Icon name={icon} size={SIZE[size].fontSize} color={color} style={[{ marginTop:5 }, style ]} />
    </TouchableOpacity>
  )
}

export const Group = ({ children }) =>
  <View style={{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
    {children}
  </View>

const styles = size => StyleSheet.create({
  button: {
    width: SIZE[size].width,
    height: SIZE[size].height,
    borderWidth: 1,
    borderColor: '#e7e7e7',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    margin: 15,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowColor: 'black',
    shadowOpacity: 0.1
  }
})

export default RoundButton
