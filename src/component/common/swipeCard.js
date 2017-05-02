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
      { id: 'left', influenceArea:  { right: -50 } }
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
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.current || this.state.current < nextProps.current) {
      this.setState({ current: nextProps.current, next: nextProps.next })
    }
  }

  onDrag () {
    const drag = !this.state.drag
    if (!drag && ( this.state.right || this.state.left )) {
      this.setState({
        drag,
        right: false,
        left: false
      })
    }
    else this.setState({ drag })
  }

  onAlert(event) {
    const position = Object.keys(event.nativeEvent).find((n) => ['left', 'right'].includes(n))
    if (position) {
      this.setState({ [position]: event.nativeEvent[position] === 'enter' })
    }
  }

  onSnap(event) {
    const { onRight, onLeft, current } = this.props
    const snapPointId = event.nativeEvent.id
    if (!this.state.drag && ['right', 'left'].includes(snapPointId)) {
      if (snapPointId === 'right' && onRight) onRight(current)
      else if (snapPointId === 'left' && onLeft) onLeft(current)

      this._deltaX.setValue(0)
      this.props.handleNext()
    }
  }

  render() {
    const { handleNext, next, snapPoints, alertAreas, current } = this.props
    const { left, right } = this.state
    return (
      <View style={styles.wrapper}>
        { current ?
          <View>
            <Interactable.View
              key={current}
              animatedNativeDriver={true}
              snapPoints={snapPoints}
              alertAreas={alertAreas}
              onAlert={this.onAlert.bind(this)}
              onDrag={this.onDrag.bind(this)}
              onSnap={this.onSnap.bind(this)}
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
              </Animated.View>
          </Interactable.View>
          <Card style={styles.next} id={next} />
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Text style={{ opacity: left ? 1 : 0 }}>left</Text>
            <Text style={{ opacity: right ? 1 : 0 }}>right</Text>
          </View>
        </View>: <Text style={styles.text}>Loading ...</Text> }
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
  },
  next: {
    position: 'absolute',
    zIndex: -1
  },
  text: {
    color: '#000'
  }
})

export default SwipeCard
