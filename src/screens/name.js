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
import { COLOR_PINK } from '../style'

const onClick = () => {
  Share.share({
    message: 'Comment trouve tu le prénom: ',
    url: 'https://ono.ma',
    title: 'Wow, did you see that?'
  })
}

class Name extends Component {
  static navigatorStyle = {
    navBarTextColor: COLOR_PINK,
    navBarButtonColor: '#d8dce5'
  }
  render() {
    const { id, deleteItem, navigator } = this.props
    return (
      <Container router={navigator}>
        <Card id={id} />
        <Group>
          <RoundButton icon='md-trash' onPress={() => {
            deleteItem()
            navigator.pop({
              animated: true
            })
          }} />
          {/*<RoundButton icon='md-share' onPress={onClick} />*/}
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
