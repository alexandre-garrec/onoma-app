import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated
} from 'react-native'

import Interactable from 'react-native-interactable'
import Card from '../card'

const { width } = Dimensions.get('window')

class SwipeCard extends Component {
  static defaultProps = {
    snapPoints: [
      { x: width + 50, id: 'right', damping: 0, tension: 300 },
      { x: 0, damping: 0.8, id: 'center' },
      { x: -(width + 50), id: 'left', damping: 0, tension: 300 }
    ],
    alertAreas: [
      { id: 'right', influenceArea: { left: 100 } },
      { id: 'left', influenceArea: { right: -50 } }
    ]
  }

  constructor(props) {
    super(props)
    this.state = {
      drag: false,
      left: false,
      right: false,
      current: false
    }
    this._deltaX = new Animated.Value(0)
    this._onMove = this.onMove.bind(this)
  }

  componentDidMount() {
    this._deltaX.addListener(this._onMove)
  }

  componentWillUnmount() {
    this._deltaX.removeAllListeners()
  }


  onMove(event) {
    const { left, right, drag } = this.state
    if (!drag && Math.abs(event.value) > width && (left || right)) {
      const { onRight, onLeft, current, handleNext } = this.props
      if (right && onRight) onRight(current)
      else if (left && onLeft) onLeft(current)
      handleNext()
      this._deltaX.setValue(0)
      this.setState({ right: false, left: false })
    }
  }
  onDrag() {
    const drag = !this.state.drag
    this.setState({ drag })
  }

  onAlert(event) {
    const position = Object.keys(event.nativeEvent).find((n) => ['left', 'right'].includes(n))
    if (position) {
      this.setState({ [position]: event.nativeEvent[position] === 'enter' })
    }
  }

  render() {
    const { next, snapPoints, alertAreas, current } = this.props
    const { left, right } = this.state
    return (
      <View style={styles.wrapper}>
        {current ?
          <View>
            <Interactable.View
              key={current}
              animatedNativeDriver={true}
              snapPoints={snapPoints}
              alertAreas={alertAreas}
              onAlert={this.onAlert.bind(this)}
              onDrag={this.onDrag.bind(this)}
              animatedValueX={this._deltaX} >
              <Animated.View style={[styles.card, {
                transform: [{
                  rotate: this._deltaX.interpolate({
                    inputRange: [-250, 0, 250],
                    outputRange: ['10deg', '0deg', '-10deg']
                  })
                }]
              }]}>
                <Card id={current} />
                <Animated.View style={[styles.info, {
                  opacity: this._deltaX.interpolate({
                    inputRange: [-350, -100, 0, 100, 350],
                    outputRange: [1, 0, 0, 0, 1]
                  })
                }, { backgroundColor: (right || left) ? right ? '#F06292' : '#7986CB' : '#fff' }]}>
                  <Text style={styles.text}>{(right || left) ? right ? 'OUI' : 'NON' : ''}</Text>
                </Animated.View>
              </Animated.View>
            </Interactable.View>
            <Animated.View style={[styles.next, {
              transform: [{
                scale: this._deltaX.interpolate({
                  inputRange: [-(width + 50), 0, width + 50],
                  outputRange: [1, 0.90, 1]
                })
              }]
            }]}>
              <Card id={next} />
            </Animated.View>
          </View> : <Text style={styles.text}>Loading ...</Text>}
      </View>
    )
  }
}

var styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    position: 'relative'
  },
  next: {
    position: 'absolute',
    zIndex: -1
  },
  text: {
    color: '#fff',
    fontSize: 40
  },
  info: {
    borderRadius: 10,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default SwipeCard
