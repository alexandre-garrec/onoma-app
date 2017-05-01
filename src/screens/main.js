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

class Onoma extends Component {
  static navigatorStyle = {
     navBarHidden: true
  }
  constructor(props) {
    super(props)
    this.state = {
      locked: true
    }
  }
  setLocked (locked) {
    this.setState({ locked })
  }
  render() {
    const { id, navigator } = this.props
    return (
      <Container router={navigator}>
        {/*<Query action={GET_NAME} />*/}
        <ScrollableTabView
          tabBarPosition='top'
          initialPage={1}
          locked={this.state.locked}
          renderTabBar={() => <FacebookTabBar setLocked={value => this.setLocked(value)} />} >
          <Profil />
          <SwipeCard router={navigator} />
          <List router={navigator} tabLabel='md-heart-outline' />
        </ScrollableTabView>
      </Container>
     )
  }
}

export default Onoma
