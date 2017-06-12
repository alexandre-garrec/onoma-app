import React, { Component } from 'react'
import { StyleSheet, ScrollView, Switch, View, Text } from 'react-native'
import CheckBox from 'react-native-check-box'
import { RkButton, RkText } from 'react-native-ui-kitten'
import Icon from 'react-native-vector-icons/Ionicons'
import { padding } from '../utils/style'

import { connect } from 'react-redux'
import { SET_FILTER } from '../actions'
import { getFilters } from '../selectors/name'
import { getOrigins } from '../selectors/origin'

import { COLOR_PINK } from '../style'

const capitalizeFirstLetter = (txt) =>
  `${txt.charAt(0).toUpperCase()}${txt.slice(1)}`

class Filter extends Component {
  static navigatorStyle = {
    navBarTextColor: COLOR_PINK,
    navBarButtonColor: '#d8dce5'
  }
  setOrigin(id) {
    const { setFilter, filters: { origin: origins = [] } } = this.props
    const origin = (() => {
      if (origins.includes(id))
        return [...origins].filter(o => o !== id)
      else return [...origins, id]
    })()

    setFilter({ origin: origin })
  }
  render() {
    const { navigator, setFilter, filters, origins } = this.props
    return (
      <ScrollView style={styles.wrapper}>
        <RkText rkType='menu'>Sexe</RkText>
        <View style={styles.rowContainer}>
          <View style={styles.row}>
            <Text style={styles.rowText}>Fille</Text>
            <Switch
              onValueChange={() => setFilter({ isFemale: !filters.isFemale })}
              value={filters.isFemale}
              tintColor={COLOR_PINK}
              onTintColor={COLOR_PINK}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.rowText}>Garçon</Text>
            <Switch
              onValueChange={() => setFilter({ isMale: !filters.isMale })}
              value={filters.isMale}
              tintColor={COLOR_PINK}
              onTintColor={COLOR_PINK}
            />
          </View>
        </View>
        <RkText rkType='menu'>Origine</RkText>
        <View style={styles.rowContainer}>
          {origins.map(origin =>
            <View key={origin.id} style={styles.row}>
              <Text style={styles.rowText}>{capitalizeFirstLetter(origin.name)}</Text>
              <Switch
                onValueChange={() => this.setOrigin(origin.id)}
                value={filters.origin && filters.origin.includes(origin.id)}
                tintColor={COLOR_PINK}
                onTintColor={COLOR_PINK}
              />
            </View>
          )}
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = state => {
  const filters = getFilters(state)
  const origins = getOrigins(state)
  return {
    filters,
    origins,
  }
}

const mapDispatchToProps = (dispatch, { id }) => ({
  setFilter: filter => dispatch({ type: SET_FILTER, payload: filter })
})

export default connect(mapStateToProps, mapDispatchToProps)(Filter)

var styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#F7F7F7',
    flex: 1,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    alignItems: 'center',
    borderColor: '#e5e5e5',
    ...padding(10, 20)
  },
  rowText: {

  },
  rowContainer: {
    borderColor: '#e5e5e5',
    borderTopWidth: 1
  }
})
