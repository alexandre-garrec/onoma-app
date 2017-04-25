import React, { Component } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

import Query from '../utils/query'
import { GET_NAME } from '../actions'

import Container from '../common/container'
import List from './list'
import Profil from './profil'
import SwipeCard from '../component/swipeCards'
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view'
import FacebookTabBar from '../component/topbar'

export default class onoma extends Component {
  render() {
    return (
       <Container>
        <Query action={GET_NAME} />
        <ScrollableTabView
          tabBarPosition='bottom'
          initialPage={1}
          locked={true}
          renderTabBar={() => <FacebookTabBar />} >
          <Profil tabLabel='ios-contact'/>
          <SwipeCard names={[]} tabLabel='ios-flash' />
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
