import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Query from '../../utils/query'
import { GET_NAME } from '../../actions'
import { width, height } from '../../utils/style'
import { COLOR_BLACK } from '../../style'
import GenderIcon from '../common/genderIcon'

const Card = ({ id: defaultId, name: { name, id, isFemale, isMale }, origin, style }) =>
  <View key={id} style={[styles.card, style]}>
    <View style={styles.iconWrapper}>
      <GenderIcon size={100} isMale={isMale} isFemale={isFemale} />
    </View>
    <Text style={styles.name}>{name}</Text>
    {origin ? <Text style={styles.origine}>Origine : prénoms {origin.name}</Text> : null}
    <Query action={GET_NAME} id={defaultId} />
  </View>

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
    color: COLOR_BLACK,
    textAlign: 'center'
  },
  origine: {
    marginTop: 20,
    color: COLOR_BLACK
  }
})

export default Card
