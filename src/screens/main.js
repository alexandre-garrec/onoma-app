import React from 'react'

import Container from '../component/common/container'
import List from './list'
import Profil from './profil'
import SwipeCard from '../component/swipeCards'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import FacebookTabBar from '../component/topbar'
import withOutNavbar from '../utils/withOutNavbar'

import { connect } from 'react-redux'
import { USER_CLEAR_BADGE } from '../actions'

const Onoma = ({ navigator, clear }) =>
  <Container router={navigator}>
    <ScrollableTabView
      prerenderingSiblingsNumber={Infinity}
      tabBarPosition='top'
      initialPage={1}
      onChangeTab={({ i }) => i === 2 && clear()}
      locked={false}
      renderTabBar={() => <FacebookTabBar setLocked={value => this.setLocked(value)} />} >
      <Profil router={navigator} />
      <SwipeCard router={navigator} />
      <List router={navigator} tabLabel='md-heart-outline' />
    </ScrollableTabView>
  </Container>

const mapDispatchToProps = (dispatch) => ({
  clear: () => dispatch({ type: USER_CLEAR_BADGE })
})

export default connect(() => ({}), mapDispatchToProps)(withOutNavbar(Onoma))
