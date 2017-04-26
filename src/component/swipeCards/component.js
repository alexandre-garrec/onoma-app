import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import SwipeCards from 'react-native-swipe-cards'
import Icon from 'react-native-vector-icons/Ionicons'
import Loading from '../loading'

const SwipeCard = ({ names, match }) => {
  return <SwipeCards
    containerStyle={styles.cardWrapper}
    cards={names}
    handleYup={name => {
      match(name.id)
      return
    }}
    handleNope={() => {
      return
    }}
    loop={true}
    showYup={true}
    showNope={true}
    renderNoMoreCards={() => <Loading />}
    allowGestureTermination={false}
    handleMaybe={this.handleMaybe}
    renderCard={(cardData) => <Card {...cardData} />}
  />
}


const Card = ({ firstname, genre, origin = 'NC' }) =>
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
  cardWrapper : {
    backgroundColor: 'transparent'
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 400,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowOffset:{
      width: 10,
      height: 10,
    },
    shadowColor: 'black',
    shadowOpacity: 0.2,
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

export default SwipeCard
