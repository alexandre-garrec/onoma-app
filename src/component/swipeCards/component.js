import React from 'react'
import { StyleSheet, View } from 'react-native'
import RoundButton, { Group } from '../common/roundButton'
import SwipeCards from '../common/swipeCard'

import { connect } from 'react-redux'
import { CARD_HANDLE_NEXT, ADD_MATCH } from '../../actions'
import { getCurrentCard, getNextCard } from '../../selectors/name'


const SwipeCard = ({ onRight, handleNext, current, next, router }) =>
  <View style={styles.container}>
    <SwipeCards onRight={onRight} handleNext={handleNext} current={current} next={next} />
    <Group>
      <RoundButton icon={'md-close'} color='#505aac' onPress={handleNext} />
      <RoundButton icon={'md-refresh'} size='small' color='#bb56cb' onPress={() => ({})} />
      <RoundButton icon={'md-heart'} color='#f0568a' onPress={() => {
        onRight(current)
        handleNext()
      }} />
    </Group>
  </View>

const mapStateToProps = (state) => {
  const current = getCurrentCard(state)
  const next = getNextCard(state)
  return {
    current,
    next
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleNext: () => dispatch({ type: CARD_HANDLE_NEXT }),
  onRight: id => dispatch({ type: ADD_MATCH, payload: id })
})

export default connect(mapStateToProps, mapDispatchToProps)(SwipeCard)


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cardWrapper: {
    backgroundColor: 'transparent'
  }
})
