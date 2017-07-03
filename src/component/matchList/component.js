import React from 'react'
import { StyleSheet, FlatList, Text, View, TouchableHighlight } from 'react-native'
import Query from '../../utils/query'
import { GET_NAME } from '../../actions'
import GenderIcon from '../common/genderIcon'

import { connect } from 'react-redux'
import { getNameById } from '../../selectors/name'

const onClick = (router, id, firstname) => {
  router.push({
    screen: 'example.NameScreen',
    passProps: { id },
    animated: true,
    backButtonTitle: 'Liste',
    title: firstname
  })
}

const Name = ({ id, name: { name = '', isFemale = false, isMale = false }, router }) =>
  <TouchableHighlight onPress={() => onClick(router, id, name)} >
    <View style={styles.row}>
      <GenderIcon style={styles.icon} size={20} isFemale={isFemale} isMale={isMale} />
      <Text>{name}</Text>
      <Query action={GET_NAME} id={id} />
    </View>
  </TouchableHighlight>

const makeMapStateToProps = () => {
  const mapStateToProps = (state, { id }) => {
    const name = getNameById(state, id) || {}
    return {
      name
    }
  }
  return mapStateToProps
}

const NameConnected = connect(makeMapStateToProps)(Name)

const MatchList = ({ matchsId, router, deleteItem, loading }) => {
  if (loading) return <View />
  return (
    <FlatList
      style={styles.container}
      data={matchsId}
      renderItem={({ item }) => <NameConnected key={item} router={router} id={item} />}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  icon: {
    paddingRight: 20
  },
  row: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    flexDirection: 'row'
  }
})

export default MatchList
