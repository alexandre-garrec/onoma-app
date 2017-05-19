import React from 'react'

import MatchList from '../component/matchList'
import ScrollableTabView from 'react-native-scrollable-tab-view'


const List = ({ router }) =>
  <ScrollableTabView locked={true}>
    <MatchList router={router} tabLabel='Liste des matchs' />
    <MatchList personal={true} router={router} tabLabel='Liste personnelle' />
  </ScrollableTabView>


export default List
