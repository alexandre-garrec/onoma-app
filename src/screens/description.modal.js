import React from 'react'
import {
  StyleSheet,
  ScrollView,
  View,
  Share
} from 'react-native'

import { getNameById, getDescriptionById } from '../selectors/name'
import { getOriginById } from '../selectors/origin'
import { CARD_HANDLE_NEXT, ADD_MATCH, CARD_HANDLE_BACK, DELETE_MATCH, GET_DESCRIPTION } from '../actions'
import { connect } from 'react-redux'
import { padding } from '../utils/style'
import withOutNavbar from '../utils/withOutNavbar'
import { COLOR_BLACK, COLOR_PINK, COLOR_BLUE } from '../style'
import Icon from 'react-native-vector-icons/Ionicons'
import GenderIcon from '../component/common/genderIcon'
import Chart from 'react-native-chart'
import RoundButton, { Group } from '../component/common/roundButton'
import { RkText } from 'react-native-ui-kitten'
import Query from '../utils/query'

const getGenderColor = isFemale => isFemale ? COLOR_PINK : COLOR_BLUE

const Profil = ({ description: { desc, orig, hist }, name: { id, name, isFemale, isMale, giveIn }, deleteItem, onLeft, onRight, handleNext, onBack, origin, navigator, withOutNavbar = false }) => {

  const color = getGenderColor(isFemale)
  const dates = Object.keys(giveIn)
  const data = giveIn ? dates.reduce((memo, key) =>
    ([...memo, [key, giveIn[key]]]), []) : []

  return (
    <View style={{ justifyContent: 'space-between', display: 'flex', flex: 1 }}>
      {withOutNavbar ? <View style={styles.topbar} >
        <Icon name='ios-arrow-down' color={COLOR_BLUE} size={36} onPress={() => navigator.dismissModal()} />
      </View> : null
      }
      <Query action={GET_DESCRIPTION} id={id} />
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
          {desc || orig || hist}
        </RkText>

        {giveIn ? <RkText style={{ color: COLOR_BLACK, marginBottom: 20 }}>Statistiques :</RkText> : null}
        {giveIn ? <RkText style={{ color: '#989898', marginBottom: 5 }}>En milliers</RkText> : null}
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
      <Group>
        <RoundButton image={require('../../assets/icons/onoma-button-close.png')} onPress={() => {
          if (withOutNavbar) {
            onLeft()
            handleNext()
            navigator.dismissModal()
          } else {
            deleteItem()
            navigator.pop()
          }
        }} />
        <RoundButton image={require('../../assets/icons/onoma-share.png')} size={withOutNavbar ? 'small' : 'normal'} onPress={() => {
          Share.share({
            message: 'Rejoignez votre partenaire sur onoma',
            title: 'Onoma invite'
          })
        }} />
        {withOutNavbar ? <RoundButton image={require('../../assets/icons/onoma-button-heart.png')} onPress={() => {
          onRight()
          handleNext()
          withOutNavbar && navigator.dismissModal()
        }} /> : null}
      </Group>
    </View >
  )
}

const mapStateToProps = (state, { id }) => {
  const name = getNameById(state, id) || false
  const origin = name ? getOriginById(state, name.origin) : false
  const description = getDescriptionById(state, id) || {}

  return {
    name,
    origin,
    description
  }
}

const mapDispatchToProps = (dispatch, { id }) => ({
  deleteItem: () => dispatch({ type: DELETE_MATCH, payload: id }),
  handleNext: () => dispatch({ type: CARD_HANDLE_NEXT }),
  onRight: () => dispatch({ type: ADD_MATCH, payload: { id, yes: true } }),
  onLeft: () => dispatch({ type: ADD_MATCH, payload: { id, yes: false } }),
  onBack: () => dispatch({ type: CARD_HANDLE_BACK })
})

var styles = StyleSheet.create({
  topbar: {
    borderTopWidth: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 55,
    paddingLeft: 15,
    paddingRight: 15
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

export default connect(mapStateToProps, mapDispatchToProps)(Profil)

export const DescriptionwithOutNavbar = connect(mapStateToProps, mapDispatchToProps)(withOutNavbar(Profil))
