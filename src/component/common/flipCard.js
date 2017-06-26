import React, { Component } from 'react'
import {
  Animated,
  TouchableOpacity,
  Dimensions
} from 'react-native'

class FlipCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isFlipped: false
    }
    this._flipX = new Animated.Value(0)
  }

  componentDidUpdate(prevProp, prevState) {
    if (this.state.isFlipped !== prevState.isFlipped) {
      this.flippedCard(this.state.isFlipped)
    }
  }

  flippedCard(flip) {
    Animated.spring(this._flipX, {
      toValue: Number(flip),
      velocity: 1,
      tension: 3,
      friction: 6
    }).start()
  }
  render() {
    const { children } = this.props
    const { width, height } = Dimensions.get('window')
    const { isFlipped } = this.state
    return (
      <TouchableOpacity
        activeOpacity={1}
        focusedOpacity={1}
        onPress={() => {
          this.setState({ isFlipped: !isFlipped })
        }}>
        <Animated.View
          style={{
            transform: [{
              rotateY: this._flipX.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '180deg']
              })
            }]
          }}>
          <Animated.View style={[(() => ({
            width: this._flipX.interpolate({
              inputRange: [0, 1],
              outputRange: [width * 0.8, width]
            }),
            height: this._flipX.interpolate({
              inputRange: [0, 1],
              outputRange: [height * 0.6, height - 44]
            })
          }))()]}>
            {children}
          </Animated.View>
        </Animated.View>
      </TouchableOpacity>
    )
  }
}

export default FlipCard
