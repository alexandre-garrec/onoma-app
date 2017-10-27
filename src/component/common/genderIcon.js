import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { COLOR_PINK, COLOR_BLUE } from '../../style'
import { StyleSheet, View, Image } from 'react-native'

const getSize = (size, style) => ({
  style: { ...style, height: size, width: size }
})

const GenderIcon = ({ isFemale = false, isMale = false, style = {}, size = 24 }) => {
  return isFemale || isMale
    ? <Icon
      style={style}
      name={isFemale ? 'md-female' : 'md-male'}
      size={size}
      color={isFemale ? COLOR_PINK : COLOR_BLUE}
    /> : null
}

export const GenderImage = ({ isFemale = false, isMale = false, style = {}, size = 24 }) => {
  return isFemale || isMale
    ? <Image resizeMode='contain' style={[{ height: size, width: size }, style]} source={isFemale ? require('../../../assets/icons/female.png') : require('../../../assets/icons/male.png')} />
    : null
}

export default GenderIcon
