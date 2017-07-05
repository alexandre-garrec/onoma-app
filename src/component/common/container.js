import React, { Component } from 'react'
import { StyleSheet } from 'react-native'

import LinearGradient from 'react-native-linear-gradient'

import { connect } from 'react-redux'
import { displayLinkModal, displayMatchModal } from '../../selectors/gui'

const openMatchModal = router =>
  router.showLightBox({
    screen: 'example.match.modal',
    animationType: 'slide-up',
    style: {
      backgroundBlur: 'light',
      backgroundColor: '#b474af80'
    }
  })

const openModal = router =>
  router.showLightBox({
    screen: 'example.join.modal',
    animationType: 'slide-up',
    style: {
      backgroundBlur: 'dark',
      backgroundColor: '#ffffff80'
    }
  })

class Container extends Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.router && nextProps.displayLinkModal) {
      openModal(this.props.router)
    }
    if (this.props.router && nextProps.displayMatchModal) {
      openMatchModal(this.props.router)
    }
  }
  render() {
    const { children } = this.props
    return (
      <LinearGradient
        locations={[0.1, 0.9]} colors={['#ffff', '#f4f5f9']} style={styles.container}>
        {children}
      </LinearGradient>
    )
  }
}

const mapStateToProps = (state) => ({
  displayLinkModal: displayLinkModal(state),
  displayMatchModal: displayMatchModal(state)
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingTop: 20
  }
})

export default connect(mapStateToProps)(Container)
