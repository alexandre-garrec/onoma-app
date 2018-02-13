import React from 'react'
import { StyleSheet, FlatList, View } from 'react-native'
import Item from '../item'

import { connect } from 'react-redux'
import { getMatchs, getMatchList } from '../../../selectors/name'

const MatchList = ({ matchsId, router, deleteItem, loading }) => {
  if (loading) return <View />
  return (
    <FlatList
      style={styles.container}
      data={matchsId}
      renderItem={({ item }) => <Item key={item} router={router} id={item} />}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})

const mapStateToProps = (state, { personal = false }) => ({
  loading: false,
  matchsId: personal ? getMatchs(state) : getMatchList(state)
})

export default connect(mapStateToProps)(MatchList)
