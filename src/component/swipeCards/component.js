import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import SwipeCards from 'react-native-swipe-cards'
import Icon from 'react-native-vector-icons/Ionicons'
import Loading from '../loading'
import Card from '../card'
import RoundButton, { Group } from '../common/roundButton'

class SwipeCard extends Component {
  constructor(props) {
    super(props)
  }
  yup(id){
    this.props.match(this.refs['swiper'].state.card)
    this.refs['swiper']._goToNextCard()
  }
  nope(){
    this.refs['swiper']._goToNextCard()
  }
  render() {
    const { names, match } = this.props
    return  (
      <View style={styles.container}>
        <SwipeCards
          ref={'swiper'}
          containerStyle={styles.cardWrapper}
          cards={names}
          handleYup={id => {
            match(id)
            return
          }}
          handleNope={() => {
            return
          }}
          loop={true}
          smoothTransition={true}
          showYup={true}
          showNope={true}
          renderNoMoreCards={() => <Loading />}
          allowGestureTermination={false}
          handleMaybe={this.handleMaybe}
          renderCard={id => <Card id={id} />}
        />
        <Group>
          <RoundButton icon={'md-close'} color='#505aac' onPress={() => this.nope()} />
          <RoundButton icon={'md-refresh'} size='small' color='#bb56cb' onPress={() => ({})} />
          <RoundButton icon={'md-heart'} color='#f0568a' onPress={() => this.yup()} />
        </Group>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardWrapper : {
    backgroundColor: 'transparent',
  }
})

export default SwipeCard
