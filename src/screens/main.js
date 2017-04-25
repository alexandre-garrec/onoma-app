import React, { Component } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

import Container from '../common/container'
import List from './list'
import Profil from './profil'
import SwipeCard from '../component/swipeCards'
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view'
import FacebookTabBar from '../topbar'
import  * as firebase from 'firebase'

const config = {
  apiKey: "AIzaSyCZctzbMpMOmwd4D_auRB_nXYTnB1VShko",
  authDomain: "name-matcher-26232.firebaseapp.com",
  databaseURL: "https://name-matcher-26232.firebaseio.com",
  storageBucket: "name-matcher-26232.appspot.com",
  messagingSenderId: "266586069715"
}

function shuffle(array) {
  var tmp, current, top = array.length;
  if(top) while(--top) {
    current = Math.floor(Math.random() * (top + 1));
    tmp = array[current];
    array[current] = array[top];
    array[top] = tmp;
  }
  return array;
}

const firebaseApp = firebase.initializeApp(config);

export default class onoma extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: []
    }
    this.itemsRef = firebaseApp.database().ref('name')
  }
  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }
  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {
      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          ...child.val(),
          id: child.key
        });
      });
      this.setState({
        data: shuffle(items)
      })
    })
  }
  render() {
    return (
       <Container>
        <ScrollableTabView
          tabBarPosition='bottom'
          initialPage={1}
          locked={true}
          renderTabBar={() => <FacebookTabBar />} >
          <Profil tabLabel='ios-contact'/>
          <SwipeCard names={this.state.data} tabLabel='ios-flash' />
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
  }
})
