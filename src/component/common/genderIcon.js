import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { COLOR_PINK, COLOR_BLUE } from '../../style'

const GenderIcon = ({ isFemale = false, isMale = false, style = {}, size = 24 }) => {
  return isFemale || isMale
    ? <Icon
      style={style}
      name={isFemale ? 'md-female' : 'md-male'}
      size={size}
      color={isFemale ? COLOR_PINK : COLOR_BLUE}
    /> : null
}

export default GenderIcon
