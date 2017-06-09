import React from 'react'
import { StyleSheet, View } from 'react-native'
import RoundButton, { Group } from '../common/roundButton'
import SwipeCards from '../common/swipeCard'
import { COLOR_BLUE, COLOR_PINK } from '../../style'

import { connect } from 'react-redux'
import { CARD_HANDLE_NEXT, ADD_MATCH } from '../../actions'
import { getCurrentCard, getNextCard, getCardNumber } from '../../selectors/name'
import { RkText } from 'react-native-ui-kitten'


const SwipeCard = ({ onRight, onLeft, handleNext, current, next, router, number }) =>
  <View style={styles.container}>
    {number === 0
      ? <RkText rkType='info'>Changer les filtes pour avoir des nouveaux nom</RkText>
      : <SwipeCards onLeft={onLeft} onRight={onRight} handleNext={handleNext} current={current} next={next} />
    }
    <Group>
      <RoundButton icon={'md-close'} color={COLOR_BLUE} onPress={() => {
        onLeft()
        handleNext()
      }} />
      <RoundButton icon={'md-refresh'} size='small' color='#bb56cb' onPress={() => ({})} />
      <RoundButton icon={'md-heart'} color={COLOR_PINK} onPress={() => {
        onRight(current)
        handleNext()
      }} />
    </Group>
  </View>

const mapStateToProps = (state) => {
  const current = getCurrentCard(state)
  const next = getNextCard(state)
  const number = getCardNumber(state)

  return {
    current,
    number,
    next
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleNext: () => dispatch({ type: CARD_HANDLE_NEXT }),
  onRight: id => dispatch({ type: ADD_MATCH, payload: { id, yes: true } }),
  onLeft: id => dispatch({ type: ADD_MATCH, payload: { id, yes: false } })
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
