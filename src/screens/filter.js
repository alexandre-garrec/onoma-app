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

class Filter extends Component {
  static navigatorStyle = {
    navBarTextColor: '#f8bbd0',
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
        <RkText rkType='title'>Sex</RkText>
        <View style={styles.row}>
          <Text>Fille</Text>
          <Switch
            onValueChange={() => setFilter({ isFemale: !filters.isFemale })}
            value={filters.isFemale}
            tintColor={COLOR_PINK}
            onTintColor={COLOR_PINK}
          />
        </View>
        <View style={styles.row}>
          <Text>Garçon</Text>
          <Switch
            onValueChange={() => setFilter({ isMale: !filters.isMale })}
            value={filters.isMale}
            tintColor={COLOR_PINK}
            onTintColor={COLOR_PINK}
          />
        </View>
        <RkText rkType='title'>Origine</RkText>
        {origins.map(origin =>
          <View key={origin.id} style={styles.row}>
            <Text>{origin.name}</Text>
            <Switch
              onValueChange={() => this.setOrigin(origin.id)}
              value={filters.origin && filters.origin.includes(origin.id)}
              tintColor={COLOR_PINK}
              onTintColor={COLOR_PINK}
            />
          </View>
        )}
      </ScrollView>
    )
  }
}


{/*<CheckBox
  key={origin.id}
  onClick={() => this.setOrigin(origin.id)}
  style={{ ...padding(10, 0) }}
  isChecked={filters.origin && filters.origin.includes(origin.id)}
  leftText={origin.name}
/>*/}

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
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    ...padding(10, 0)
  }
})
