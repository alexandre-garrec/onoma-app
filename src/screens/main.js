/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'

import LinearGradient from 'react-native-linear-gradient'
import SwipeCards from 'react-native-swipe-cards'

const Cards = [
  {text: 'Alexandre', backgroundColor: 'red'},
  {text: 'Julien', backgroundColor: 'purple'},
  {text: 'Lucien', backgroundColor: 'purple'}
]

const Card = ({ text }) => (
  <View style={styles.card}>
    <Text>{text}</Text>
  </View>
)

export default class onoma extends Component {
  render() {
    return (
      <LinearGradient 
        end={{x: 0.0, y: 0}}
        start={{x: 1, y: 0}}
        locations={[0.3,0.7]} colors={['#F8BBD0', '#C5CAE9']} style={styles.container}>
        <SwipeCards
          containerStyle={styles.cardWrapper}
          cards={Cards}
          handleYup={() => ({})}
          handleNope={() => ({})}
          showYup={false}
          showNope={false}
          loop={true}
          renderCard={(cardData) => <Card {...cardData} />}
        />
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  cardWrapper : {
    backgroundColor: 'transparent'
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center', 
    width: 200,
    height: 200,
    backgroundColor: '#fff'
  }
});

