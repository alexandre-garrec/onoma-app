import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Query from '../../utils/query'
import { GET_NAME } from '../../actions'
import { width, height } from '../../utils/style'


const Card = ({ id: defaultId, name: { name, id, isFemale, isMale }, origin, style }) =>
  <View key={id} style={[styles.card, style]}>
    {isFemale || isMale ? <Icon
      style={styles.icon}
      name={isFemale ? 'md-female' : 'md-male'}
      size={100}
      color={isFemale ? 'rgb(248,187,208)' : 'rgb(59,89,152)'}
    /> : null}
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
    shadowOpacity: 0.1
  },
  icon: {
    padding: 50
  },
  name: {
    fontSize: 40
  },
  origine: {
    marginTop: 20
  }
})

export default Card
