import React from 'react'

import { StyleSheet, ListView, Text, View, TouchableHighlight } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'

const MatchList = ({ matchs, router, deleteItem, loading }) => {
  if (loading) return <View />
  const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }).cloneWithRows(matchs)
  return (
    <ListView
      style={styles.container}
      dataSource={dataSource}
      renderRow={(data) => <Name key={data.id} router={router} {...data} />}
    />
  )
}

const onClick = (router, id, firstname) => {
  router.push({
    screen: 'example.NameScreen',
    passProps: { id },
    animated: true,
    backButtonTitle: 'Liste',
    title: firstname
  })
}

const Name = ({ id, name, isFemale, router }) =>
  <TouchableHighlight onPress={() => onClick(router, id, name)} >
    <View style={styles.row}>
      <Icon
        style={styles.icon}
        name={isFemale ? 'md-female' : 'md-male'}
        size={20}
        color={isFemale ? 'rgb(248,187,208)' : 'rgb(59,89,152)'}
      />
      <Text>{name}</Text>
    </View>
  </TouchableHighlight>



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
