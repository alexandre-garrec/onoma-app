import React, { Component } from 'react'
import {
  StyleSheet,
  ScrollView,
  View
} from 'react-native'

import { getNameById } from '../selectors/name'
import { getOriginById } from '../selectors/origin'
import { connect } from 'react-redux'
import { padding } from '../utils/style'
import { COLOR_BLACK, COLOR_PINK, COLOR_BLUE } from '../style'
import Icon from 'react-native-vector-icons/Ionicons'
import GenderIcon from '../component/common/genderIcon'

import { RkText, RkButton } from 'react-native-ui-kitten'

const getGenderColor = isFemale => isFemale ? COLOR_PINK : COLOR_BLUE

class Profil extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }
  render() {
    const { name: { name, isFemale, isMale }, origin, navigator } = this.props
    const color = getGenderColor(isFemale)
    return (
      <View>
        <View style={styles.topbar}>
          <Icon name='ios-arrow-down' color={COLOR_BLUE} size={36} onPress={() => navigator.dismissModal()} />
        </View>
        <ScrollView style={styles.wrapper}>
          <RkText style={{ color: color, fontSize: 38, marginBottom: 20 }}>
            {name} <GenderIcon size={38} isFemale={isFemale} isMale={isMale} />
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
      </View >
    )
  }
}

const mapStateToProps = (state, { id }) => {
  const name = getNameById(state, id) || false
  const origin = name ? getOriginById(state, name.origin) : false
  return {
    name,
    origin
  }
}

export default connect(mapStateToProps)(Profil)

var styles = StyleSheet.create({
  topbar: {
    borderTopWidth: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 55,
    paddingLeft: 15,
    paddingRight: 15,
  },
  wrapper: {
    flexGrow: 1,
    ...padding(20)
  }
})
