import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Animated
} from 'react-native'

import RoundButton, { Group } from '../component/common/roundButton'

import Card from '../component/card'

import Interactable from 'react-native-interactable'

const { width } = Dimensions.get('window')

class Demo extends Component {
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
    const snapPointId = event.nativeEvent.id
    if (['right', 'left'].includes(snapPointId) && !this.state.drag) {
      this._deltaX.setValue(0)
      this.props.handleNext()
    }
  }

  render() {
    const { handleNext, next, snapPoints, alertAreas, current } = this.props
    return (
      <View style={styles.wrapper}>
        { current ?
          <View>
            <Interactable.View
              key={current}
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
          <Group>
            <RoundButton style={{ opacity: this.state.left ? 1 : 0 }} icon='md-trash' />
            <RoundButton style={{ opacity: this.state.right ? 1 : 0 }} icon='md-share'  />
          </Group>
        </View>: <Text style={styles.text}>Loading ...</Text> }
      </View>
    )
  }
}

import { connect } from 'react-redux'
import { CARD_HANDLE_NEXT, CARD_INIT } from '../actions'
import { getCurrentCard, getNextCard, getNamesId } from '../selectors/name'

const mapStateToProps = (state) => {
  const current = getCurrentCard(state)
  const next = getNextCard(state)
  return {
    current,
    next
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleNext: () => dispatch({ type: CARD_HANDLE_NEXT })
})

export default connect(mapStateToProps, mapDispatchToProps)(Demo)


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
