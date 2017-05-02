import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Loading from '../loading'
import Card from '../card'
import RoundButton, { Group } from '../common/roundButton'
import SwipeCards from '../common/swipeCard'

const onClick = router =>
  router.showLightBox({
    screen: "example.ModalScreenFilter", // unique ID registered with Navigation.registerScreen
    passProps: {}, // simple serializable object that will pass as props to the modal (optional)
    navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
    style: {
      backgroundBlur: "none", // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
      backgroundColor: "#ffffff90" // tint color for the background, you can specify alpha here (optional)
   }
  })

const SwipeCard = ({ onRight, handleNext, current, next, router }) =>
  <View style={styles.container}>
    <SwipeCards onRight={onRight} handleNext={handleNext} current={current} next={next} />
     <Group>
      <RoundButton icon={'md-close'} color='#505aac' onPress={handleNext} />
      <RoundButton icon={'md-refresh'} size='small' color='#bb56cb' onPress={() => ({})} />
      <RoundButton icon={'ios-options'} size='small' color='#bb56cb' onPress={() => onClick(router)} />
      <RoundButton icon={'md-heart'} color='#f0568a' onPress={() => {
        onRight()
        handleNext()
      }} />
    </Group>
  </View>

import { connect } from 'react-redux'
import { CARD_HANDLE_NEXT, ADD_MATCH } from '../../actions'
import { getCurrentCard, getNextCard, getNamesId } from '../../selectors/name'

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
    flex: 1,
  },
  cardWrapper : {
    backgroundColor: 'transparent',
  }
})
