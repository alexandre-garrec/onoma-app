import React from 'react'
import { StyleSheet, FlatList, Text, View, TouchableHighlight } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { COLOR_BLUE, COLOR_PINK } from '../../style'
import Query from '../../utils/query'
import { GET_NAME } from '../../actions'
import { RkText, RkButton } from 'react-native-ui-kitten'

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

const openModal = router =>
  router.push({
    screen: 'example.channel',
    animated: true,
    backButtonTitle: 'Retour',
    title: 'Filtre'
  })

const Invite = ({ router, filters }) =>
  <View style={{
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40
  }}>
    <RkText rkType='info'>{filters
      ? 'Changer vos filtres pour avoir des nouveaux prénom'
      : 'Sélectionner vos filtres avant de commencer'
    }</RkText>
    <RkButton onPress={() => openModal(router)} rkType='default' >
      <Icon name='ios-options' style={{ marginRight: 10, fontSize: 18 }} />
      Filtre
    </RkButton>
  </View>

const Name = ({ id, name: { name = '', isFemale = false }, router }) =>
  <TouchableHighlight onPress={() => onClick(router, id, name)} >
    <View style={styles.row}>
      <Icon
        style={styles.icon}
        name={isFemale ? 'md-female' : 'md-male'}
        size={20}
        color={isFemale ? COLOR_PINK : COLOR_BLUE}
      />
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
  // if (matchsId.length === 0) return <Invite router={router} />
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
