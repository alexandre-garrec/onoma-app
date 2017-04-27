import React, { PropTypes } from 'react'

import { StyleSheet, ListView, Text, View, TouchableHighlight } from 'react-native'

import { SwipeListView } from 'react-native-swipe-list-view'

import Icon from 'react-native-vector-icons/Ionicons'


const MatchList = ({ matchs, router, deleteItem }) => {
  const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(matchs)
  return (
    <SwipeListView
      style={styles.container}
      dataSource={dataSource}
      disableRightSwipe={true}
      renderRow={(data) => <Name key={data.id} router={router} {...data} />}
      rightOpenValue={-100}
      renderHiddenRow={(data, secdId, rowId, rowMap) => (
        <View style={styles.standaloneRowBack}>
          <Text></Text>
          <TouchableHighlight onPress={() => {
            rowMap[`${secdId}${rowId}`].closeRow()
            deleteItem(data.id)
          }} >
            <Text style={styles.text}>Supprimer</Text>
          </TouchableHighlight>
        </View>
      )}
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

const Name = ({ id, firstname, genre, origin = 'NC', router }) =>
  <TouchableHighlight onPress={() => onClick(router, id, firstname)} >
    <View style={styles.row}>
    <Icon
      style={styles.icon}
      name={genre === 'f' ? 'md-female' : 'md-male'}
      size={20}
      color={genre === 'f' ? 'rgb(248,187,208)' : 'rgb(59,89,152)'}
    />
    <Text>{firstname}</Text>
    </View>
  </TouchableHighlight>



const styles = StyleSheet.create({
  standaloneRowBack: {
    alignItems: 'center',
    backgroundColor: 'red',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  text: {
    color: '#fff'
  },
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
