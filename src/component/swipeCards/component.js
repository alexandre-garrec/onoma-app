import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import SwipeCards from 'react-native-swipe-cards'
import Icon from 'react-native-vector-icons/Ionicons'
import Loading from '../loading'

const SwipeCard = ({ names, match }) =>
  <View style={styles.container}>
    <SwipeCards
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
    <View style={styles.buttons}>
      <TouchableOpacity style={styles.button}>
        <Icon name='md-close' size={36} color="#505aac" style={{marginTop:5}} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button_small}>
        <Icon name='md-refresh' size={26} color="#bb56cb" style={{marginTop:5}} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Icon name='md-heart' size={36} color="#f0568a" style={{marginTop:5}} />
      </TouchableOpacity>
    </View>
  </View>



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
  container: {
    flex: 1,
  },
  cardWrapper : {
    backgroundColor: 'transparent',
  },
  buttons:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button:{
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: '#e7e7e7',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    margin: 20,
    shadowOffset:{
      width: 0,
      height: 2,
    },
    shadowColor: 'black',
    shadowOpacity: 0.1,
  },
  button_small:{
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#e7e7e7',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    margin: 20,
     shadowOffset:{
      width: 0,
      height: 2,
    },
    shadowColor: 'black',
    shadowOpacity: 0.1,
  },
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

export default SwipeCard
