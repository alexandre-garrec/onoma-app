import React from 'react'
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const SIZE = {
  small: {
    fontSize: 26,
    width: 50,
    height: 50,
    image: {
      width: 26,
      height: 26
    }
  },
  normal: {
    fontSize: 32,
    width: 60,
    height: 60,
    image: {
      width: 28,
      height: 28
    }
  }
}

const RoundButton = ({ icon = false, image = false, size = 'normal', color, onPress, style }) => {
  const genStyle = styles(size)
  return (
    <TouchableOpacity style={genStyle.button} onPress={onPress}>
      {icon
        ? <Icon name={icon} size={SIZE[size].fontSize} color={color} style={[{ marginTop: 5 }, style]} />
        : <Image source={image} style={[SIZE[size].image, style]} resizeMode='contain' />
      }
    </TouchableOpacity>
  )
}

export const Group = ({ children, style }) =>
  <View style={[{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }, style]}>
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
