import React, { Component } from 'react'
import { StyleSheet } from 'react-native'

import LinearGradient from 'react-native-linear-gradient'

import { connect } from 'react-redux'
import { displayLogin } from '../../selectors/user'
import { displayLinkModal } from '../../selectors/gui'

const onClick = router =>
  router.push({
    screen: 'example.login',
    style: {
      backgroundBlur: 'dark',
      backgroundColor: '#ffffff90'
    }
  })

const openModal = router =>
  router.showModal({
    screen: 'example.join.modal',
    animationType: 'slide-up'
  })


class Container extends Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.router && nextProps.displayLogin) {
      onClick(this.props.router)
    }
    if (this.props.router && nextProps.displayLinkModal) {
      openModal(this.props.router)
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
  displayLogin: displayLogin(state),
  displayLinkModal: displayLinkModal(state)
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
