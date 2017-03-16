/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native'

import Container from '../common/container'
import SwipeCards from 'react-native-swipe-cards'
import List from './list'
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view'
import FacebookTabBar from '../topbar'
import Icon from 'react-native-vector-icons/Ionicons'

const Cards = [
  {text: 'Alexandre', backgroundColor: 'red', origine: 'France'},
  {text: 'Julien', backgroundColor: 'purple'},
  {text: 'Lucien', backgroundColor: 'purple'}
]

const Card = ({ text, origine = 'NC' }) => (
  <View style={styles.card}>
    <Icon
      style={styles.icon}
      name={'md-female'}
      size={100}
      color={'rgb(59,89,152)'}
    />
    <Text style={styles.name} >{text}</Text>
    <Text style={styles.origine} >Origine: {origine}</Text>
  </View>
)

const Test = () => 
  <SwipeCards
    containerStyle={styles.cardWrapper}
    cards={Cards}
    handleYup={() => ({})}
    handleNope={() => ({})}
    showYup={false}
    showNope={false}
    allowGestureTermination={false}
    loop={true}
    renderCard={(cardData) => <Card {...cardData} />}
  />

const Profil = () => 
  <View style={stylesProfil.wrapper}>
    <Image style={stylesProfil.image} source={require('../../assets/profile.jpg')}/>
    <Text style={stylesProfil.username}>Alexandre Garrec</Text>
  </View>

var stylesProfil = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  username: {
    color: '#fff',
    margin: 20,
    fontSize: 16
  },
  image: {
    height: 100,
    borderRadius: 50,
    width: 100
  }
});

export default class onoma extends Component {
  static navigatorStyle = {
    navBarHidden: true
  };
  render() {
    return (
       <Container>
        <ScrollableTabView 
        tabBarPosition='bottom'
          initialPage={1} 
          locked={true} 
          renderTabBar={() => <FacebookTabBar />} >
          <Profil tabLabel='ios-contact'/>
          <Test tabLabel='ios-flash' />
          <List tabLabel='md-heart-outline' />
        </ScrollableTabView>
      </Container>
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
    width: 300,
    height: 400,
    borderRadius: 10,
    backgroundColor: '#fff'
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
});

