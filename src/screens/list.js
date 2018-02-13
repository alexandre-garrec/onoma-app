import React from 'react'
import { SegmentedControlIOS } from 'react-native'
import MatchList from '../component/name/list/match'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import { COLOR_BLACK, COLOR_PINK, COLOR_BLUE } from '../style'

const Topbar = ({ goToPage, activeTab }) =>
  <SegmentedControlIOS
    style={{
      margin: 20
    }}
    tintColor={COLOR_PINK}
    selectedIndex={activeTab}
    onChange={event => goToPage(event.nativeEvent.selectedSegmentIndex)}
    values={['Liste des matchs', 'Liste personnelle']}
  />

const List = ({ router }) =>
  <ScrollableTabView
    tabBarInactiveTextColor={COLOR_BLACK}
    tabBarTextStyle={{ fontWeight: 'normal' }}
    tabBarActiveTextColor={COLOR_PINK}
    tabBarUnderlineStyle={{ height: 2, backgroundColor: COLOR_BLUE }}
    renderTabBar={() => <Topbar />}
    locked={true}>
    <MatchList router={router} />
    <MatchList personal={true} router={router} />
  </ScrollableTabView>

export default List
