import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const Card = ({ name: { firstname, genre, origin = 'NC' } }) =>
  <View key={firstname} style={styles.card}>
    <Icon
      style={styles.icon}
      name={genre === 'f' ? 'md-female' : 'md-male'}
      size={100}
      color={genre === 'f' ? 'rgb(248,187,208)' : 'rgb(59,89,152)'}
    />
    <Text style={styles.name}>{firstname}</Text>
    { origin ? <Text style={styles.origine}>Origine: {origin}</Text> : null }
  </View>

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 400,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderColor: '#d8dce5',
    borderWidth: 1,
    shadowOffset:{
      width: 0,
      height: 2,
    },
    shadowColor: 'black',
    shadowOpacity: 0.1,
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
