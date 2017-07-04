import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import Query from '../../utils/query'
import { GET_NAME } from '../../actions'
import { width, height, padding } from '../../utils/style'
import GenderIcon from '../common/genderIcon'
import { COLOR_PINK, COLOR_BLUE, COLOR_BLACK } from '../../style'

const ICON = {
  resizeMode: 'contain',
  style: { height: 32, width: 32 }
}

const Card = ({ id: defaultId, name: { name, id, isFemale, isMale }, origin, style }) =>
  <View key={id} style={[styles.card, style]}>
    <View style={styles.iconWrapper}>
      <GenderIcon size={100} isMale={isMale} isFemale={isFemale} />
    </View>
    <Text style={[styles.name, { color: isFemale ? COLOR_PINK : COLOR_BLUE }]}>{name}</Text>
    {
      origin
        ? <View style={{ marginTop: 20, flexDirection: 'row' }}>
          <Text style={{ color: '#414141' }}>Origine : </Text>
          <Text style={{ color: '#989898' }}>prénoms {origin.name}</Text>
        </View>
        : null
    }
    <Query action={GET_NAME} id={defaultId} />
  </View >

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width(80),
    height: height(60),
    borderRadius: 10,
    backgroundColor: '#fff',
    borderColor: '#d8dce5',
    borderWidth: 1,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowColor: 'black',
    shadowOpacity: 0.1,
    padding: 40
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    display: 'flex'
  },
  name: {
    fontSize: 35,
    textAlign: 'center'
  },
  origine: {
    marginTop: 20,
    color: COLOR_BLACK
  }
})

export default Card
