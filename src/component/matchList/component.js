import React from 'react'

import { StyleSheet, ListView, Text, View, TouchableHighlight } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'

const onClick = (router, id, firstname) => {
  router.push({
    screen: 'example.NameScreen',
    passProps: { id },
    animated: true,
    backButtonTitle: 'Liste',
    title: firstname
  })
}

import Query from '../../utils/query'
import { GET_NAME } from '../../actions'

const Name = ({ id, name: { name = '', isFemale = false }, router }) =>
  <TouchableHighlight onPress={() => onClick(router, id, name)} >
    <View style={styles.row}>
      <Icon
        style={styles.icon}
        name={isFemale ? 'md-female' : 'md-male'}
        size={20}
        color={isFemale ? 'rgb(248,187,208)' : 'rgb(59,89,152)'}
      />
      <Text>{name}</Text>
      <Query action={GET_NAME} id={id} />
    </View>
  </TouchableHighlight>

import { connect } from 'react-redux'
import { getNameById } from '../../selectors/name'

const makeMapStateToProps = () => {
  const mapStateToProps = (state, { id }) => {
    const name = getNameById(state, id) || {}
    console.log(name)
    return {
      name
    }
  }
  return mapStateToProps
}

const NameConnected = connect(makeMapStateToProps)(Name)

const MatchList = ({ matchsId, router, deleteItem, loading }) => {
  if (loading) return <View />
  const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }).cloneWithRows(matchsId)
  return (
    <ListView
      style={styles.container}
      dataSource={dataSource}
      enableEmptySections={true}
      renderRow={id => <NameConnected key={id} router={router} id={id} />}
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
