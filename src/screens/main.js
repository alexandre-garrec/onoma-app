import React, { Component } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

// import Query from '../utils/query'
// import { GET_NAME } from '../actions'

import Container from '../component/common/container'
import List from './list'
import Profil from './profil'
import SwipeCard from '../component/swipeCards'
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view'
import FacebookTabBar from '../component/topbar'

const Onoma = ({ navigator }) =>
  <Container>
    {/*<Query action={GET_NAME} />*/}
    <ScrollableTabView
      tabBarPosition='bottom'
      initialPage={1}
      locked={true}
      renderTabBar={() => <FacebookTabBar />} >
      <Profil tabLabel='ios-contact'/>
      <SwipeCard tabLabel='ios-flash' />
      <List router={navigator} tabLabel='md-heart-outline' />
    </ScrollableTabView>
  </Container>

export default Onoma
