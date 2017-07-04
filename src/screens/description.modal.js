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
import withOutNavbar from '../utils/withOutNavbar'
import { COLOR_BLACK, COLOR_PINK, COLOR_BLUE } from '../style'
import Icon from 'react-native-vector-icons/Ionicons'
import GenderIcon from '../component/common/genderIcon'
import Chart from 'react-native-chart'

import { RkText, RkButton } from 'react-native-ui-kitten'

const getGenderColor = isFemale => isFemale ? COLOR_PINK : COLOR_BLUE

const Profil = ({ name: { name, isFemale, isMale, giveIn }, origin, navigator, withOutNavbar = false }) => {

  const color = getGenderColor(isFemale)
  const dates = Object.keys(giveIn)
  const data = giveIn ? dates.reduce((memo, key) =>
    ([...memo, [key, giveIn[key]]]), []) : []

  return (
    <View>
      {withOutNavbar ? <View style={styles.topbar}>
        <Icon name='ios-arrow-down' color={COLOR_BLUE} size={36} onPress={() => navigator.dismissModal()} />
      </View> : null
      }
      <ScrollView style={styles.wrapper}>
        <RkText style={{ color: color, fontSize: 38, marginBottom: 20 }}>
          {name} <GenderIcon size={38} isFemale={isFemale} isMale={isMale} />
        </RkText>
        {origin
          ? <View style={{ marginBottom: 20, flexDirection: 'row' }}>
            <RkText style={{ color: COLOR_BLACK }}>Origine : </RkText>
            <RkText style={{ color: '#989898' }}>prénoms {origin.name}</RkText>
          </View>
          : null
        }
        <RkText style={{ color: COLOR_BLACK, marginBottom: 20 }}>Étymologie :</RkText>
        <RkText style={{ color: '#989898', marginBottom: 20 }}>
          {'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate porro, illo unde voluptas amet laboriosam accusamus optio ratione expedita ad, laborum possimus quo similique ullam, eligendi dolorum. Debitis, incidunt, sed!'}
        </RkText>
        {giveIn ? <RkText style={{ color: COLOR_BLACK, marginBottom: 20 }}>Statistiques :</RkText> : null}

        {giveIn ? <Chart
          style={styles.chart}
          data={data}
          type='line'
          cornerRadius={5}
          lineWidth={2}
          dataPointRadius={0}
          axisColor='#989898'
          axisLabelColor='#989898'
          showGrid={false}
          xAxisTransform={(val) => {
            const index = dates.indexOf(val)
            if (index % 2) return ''
            return val
          }}
          showDataPoint={true}
          color={COLOR_PINK}
        /> : null}
      </ScrollView>
    </View >
  )
}

const mapStateToProps = (state, { id }) => {
  const name = getNameById(state, id) || false
  const origin = name ? getOriginById(state, name.origin) : false
  return {
    name,
    origin
  }
}

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
  },
  chart: {
    flex: 1,
    height: 150
  }
})

export default connect(mapStateToProps)(Profil)
export const DescriptionwithOutNavbar = connect(mapStateToProps)(withOutNavbar(Profil))
