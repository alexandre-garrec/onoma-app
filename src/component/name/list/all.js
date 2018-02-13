import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import Item from '../item'

import { connect } from 'react-redux'
import { getNamesIds } from '../../../selectors/name'

const List = ({ nameIds, router }) =>
  <FlatList
    style={styles.container}
    data={nameIds}
    renderItem={({ item }) => <Item key={item} router={router} id={item} />}
  />

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})

const mapStateToProps = (state) => ({
  nameIds: getNamesIds(state)
})

export default connect(mapStateToProps)(List)
