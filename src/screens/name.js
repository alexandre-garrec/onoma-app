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
    const { id } = this.props
    return (
      <Container>
        <Card id={id} />
        <Group>
          <RoundButton icon='md-trash' />
          <RoundButton icon='md-share' onPress={onClick} />
        </Group>
      </Container>
     )
  }
}

export default Name
