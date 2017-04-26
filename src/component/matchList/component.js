import React, { PropTypes } from 'react'

import { StyleSheet, ListView, Text, View, Image } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'


const MatchList = ({ matchs }) => {
  const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(matchs)
  return (
    <ListView
      style={styles.container}
      dataSource={dataSource}
      renderRow={(data) => <Name {...data} />}
    />
  )
}

const Name = ({ firstname, genre, origin = 'NC' }) =>
  <View style={styles.row}>
    <Icon
      style={styles.icon}
      name={genre === 'f' ? 'md-female' : 'md-male'}
      size={20}
      color={genre === 'f' ? 'rgb(248,187,208)' : 'rgb(59,89,152)'}
    />
    <Text>{firstname}</Text>
  </View>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 45,
    backgroundColor: '#fff'
  },
  icon: {
    paddingRight: 20
  },
  row: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    flexDirection: 'row'
  }
});


export default MatchList
