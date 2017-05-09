import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Share
} from 'react-native'

import RoundButton, { Group } from '../component/common/roundButton'
import Container from '../component/common/container'
import Card from '../component/card'

const onClick = () => {
  Share.share({
    message: 'BAM: we\'re helping your business with awesome React Native apps',
    url: 'http://bam.tech',
    title: 'Wow, did you see that?'
  })
}

class Name extends Component {
  static navigatorStyle = {
    navBarBackgroundColor: '#F8BBD0'
  }
  render() {
    const { id, deleteItem, navigator } = this.props
    return (
      <Container router={navigator}>
        <Card id={id} />
        <Group>
          <RoundButton icon='md-trash' onPress={deleteItem} />
          <RoundButton icon='md-share' onPress={onClick} />
        </Group>
      </Container>
     )
  }
}

import { connect } from 'react-redux'
import { DELETE_MATCH } from '../actions'

const mapDispatchToProps = (dispatch, { id }) => ({
  deleteItem: () => dispatch({ type: DELETE_MATCH, payload: id })
})

export default connect(() => ({}), mapDispatchToProps)(Name)
