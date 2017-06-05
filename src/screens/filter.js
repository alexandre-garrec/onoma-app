import React, { Component } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import CheckBox from 'react-native-check-box'
import { RkButton, RkText } from 'react-native-ui-kitten'
import Icon from 'react-native-vector-icons/Ionicons'
import { padding } from '../utils/style'

import { connect } from 'react-redux'
import { SET_FILTER } from '../actions'
import { getFilters, getCardNumber } from '../selectors/name'
import { getOrigins } from '../selectors/origin'

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
    const { navigator, setFilter, filters, origins, number } = this.props
    return (
      <ScrollView style={styles.wrapper}>
        <RkText rkType='info'>Nombre de prénoms {number}</RkText>
        <RkText rkType='title'>Sex</RkText>
        <CheckBox
          style={{ ...padding(10, 0) }}
          onClick={() => setFilter({ isFemale: !filters.isFemale })}
          isChecked={filters.isFemale}
          leftText='Fille'
        />
        <CheckBox
          style={{ ...padding(10, 0) }}
          onClick={() => setFilter({ isMale: !filters.isMale })}
          isChecked={filters.isMale}
          leftText='Garçon'
        />
        <RkText rkType='title'>Origine</RkText>
        {origins.map(origin =>
          <CheckBox
            key={origin.id}
            onClick={() => this.setOrigin(origin.id)}
            style={{ ...padding(10, 0) }}
            isChecked={filters.origin && filters.origin.includes(origin.id)}
            leftText={origin.name}
          />
        )}
      </ScrollView>
    )
  }
}

const mapStateToProps = state => {
  const filters = getFilters(state)
  const origins = getOrigins(state)
  const number = getCardNumber(state)
  return {
    filters,
    origins,
    number
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
  }
})
