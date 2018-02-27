import React from 'react'
import { StyleSheet, View, TouchableHighlight } from 'react-native'
import Query from '../../../utils/query'
import { GET_NAME } from '../../../actions'
import { GenderImage } from '../../common/genderIcon'
import Icon from 'react-native-vector-icons/Ionicons'
import { P } from '../../../styles/text'
import { BLACK } from '../../../styles/colors'

import { connect } from 'react-redux'
import { getNameById } from '../../../selectors/name'

const onClick = (router, id, firstname) => {
  router.push({
    screen: 'example.description',
    animated: true,
    backButtonTitle: 'Retour',
    passProps: { id }
  })
}

const Name = ({
  id,
  name: { name = '', isFemale = false, isMale = false },
  router
}) => (
  <TouchableHighlight onPress={() => onClick(router, id, name)}>
    <View style={styles.row}>
      <View style={{ flexDirection: 'row' }}>
        <GenderImage
          style={styles.icon}
          size={20}
          isFemale={isFemale}
          isMale={isMale}
        />
        <P style={{ color: BLACK }}>{name}</P>
        <Query action={GET_NAME} id={id} />
      </View>
      <Icon name='ios-arrow-forward-outline' size={20} color={'#989898'} />
    </View>
  </TouchableHighlight>
)

const mapStateToProps = (state, { id }) => ({
  name: getNameById(state, id) || {}
})

const styles = StyleSheet.create({
  icon: {
    marginRight: 20
  },
  row: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})

export default connect(mapStateToProps)(Name)
