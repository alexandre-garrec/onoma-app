import React, { Component } from 'react'
import {
  StyleSheet,
  ScrollView
} from 'react-native'

import { getNameById } from '../selectors/name'
import { getOriginById } from '../selectors/origin'
import { connect } from 'react-redux'
import { padding } from '../utils/style'
import { COLOR_BLACK, COLOR_PINK, COLOR_BLUE } from '../style'
import Icon from 'react-native-vector-icons/Ionicons'

import { RkText, RkButton } from 'react-native-ui-kitten'

const getGenderColor = isFemale => isFemale ? COLOR_PINK : COLOR_BLUE

class Profil extends Component {
  static navigatorStyle = {
    navBarButtonColor: COLOR_PINK,
  }
  render() {
    const { name: { name, isFemale, isMale }, origin, navigator } = this.props
    const color = getGenderColor(isFemale)
    return (
      <ScrollView style={styles.wrapper}>
        <RkText style={{ color: color, fontSize: 38, marginBottom: 20 }}>
          {name}  {isFemale || isMale ? <Icon
            style={styles.icon}
            name={isFemale ? 'md-female' : 'md-male'}
            size={40}
            color={color}
          /> : null}
        </RkText>
        {origin
          ? <RkText style={{ color: COLOR_BLACK, marginBottom: 20 }}>Origine : prénoms {origin.name}</RkText>
          : null
        }
        <RkText style={{ color: COLOR_BLACK, marginBottom: 20 }}>Étymologie :</RkText>
        <RkText style={{ color: COLOR_BLACK, marginBottom: 20 }}>
          {'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate porro, illo unde voluptas amet laboriosam accusamus optio ratione expedita ad, laborum possimus quo similique ullam, eligendi dolorum. Debitis, incidunt, sed!'}
        </RkText>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state, { id }) => {
  const name = getNameById(state, id) || false
  const origin = name ? getOriginById(state, name.origin) : false
  console.log(name)
  return {
    name,
    origin
  }
}

export default connect(mapStateToProps)(Profil)

var styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    ...padding(20)
  }
})
