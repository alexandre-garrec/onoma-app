import React from 'react'

import MatchList from '../component/matchList'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import { COLOR_BLACK, COLOR_PINK, COLOR_BLUE } from '../style'

const List = ({ router }) =>
  <ScrollableTabView
    tabBarInactiveTextColor={COLOR_BLACK}
    tabBarTextStyle={{ fontWeight: 'normal' }}
    tabBarActiveTextColor={COLOR_PINK}
    tabBarUnderlineStyle={{ height: 2, backgroundColor: COLOR_BLUE }}
    locked={true}>
    <MatchList router={router} tabLabel='Liste des matchs' />
    <MatchList personal={true} router={router} tabLabel='Liste personnelle' />
  </ScrollableTabView>

export default List
