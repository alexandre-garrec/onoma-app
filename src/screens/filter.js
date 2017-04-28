import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native'

import { RkButton } from 'react-native-ui-kitten';
import Icon from 'react-native-vector-icons/Ionicons'
import RoundButton, { Group } from '../component/common/roundButton'

const Filter = ({ navigator, setFilter, filters }) =>
  <View style={styles.wrapper}>
    <RoundButton icon='ios-close' onPress={() => navigator.dismissLightBox()} />
    <Group>
      <RkButton
        onPress={() => setFilter({ genre: 'f' })}
        rkType={filters.genre && filters.genre === 'f' && 'outline'}>
        <Icon style={{marginRight: 5, fontSize: 18}} name={'md-female'}/> Fille
      </RkButton>
      <RkButton
        onPress={() => setFilter({ genre: 'h' })}
        rkType={filters.genre && filters.genre === 'h' && 'outline'}>
        <Icon style={{marginRight: 5, fontSize: 18}} name={'md-male'}/> Garçon
      </RkButton>
    </Group>
  </View>

import { connect } from 'react-redux'
import { SET_FILTER } from '../actions'
import { getFilters } from '../selectors/name'

const mapStateToProps = (state) => {
  const filters = getFilters(state)
  return {
    filters
  }
}

const mapDispatchToProps = (dispatch, { id }) => ({
  setFilter: filter => dispatch({ type: SET_FILTER, payload: filter })
})

export default connect(mapStateToProps, mapDispatchToProps)(Filter)


var styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: 300,
    height: 500
  }
})
