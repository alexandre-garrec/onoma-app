import React from 'react'

import MatchList from '../component/matchList'
import ScrollableTabView from 'react-native-scrollable-tab-view'


const List = ({ router }) =>
  <ScrollableTabView tabBarActiveTextColor='#f06292' tabBarUnderlineStyle={{height: 2}} locked={true}>
    <MatchList router={router} tabLabel='Liste des matchs' />
    <MatchList personal={true} router={router} tabLabel='Liste personnelle' />
  </ScrollableTabView>


export default List
