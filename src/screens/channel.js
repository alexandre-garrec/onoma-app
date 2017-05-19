import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Share
} from 'react-native'

import { RkText, RkButton } from 'react-native-ui-kitten'
import Icon from 'react-native-vector-icons/Ionicons'

const onClick = (url) => {
  Share.share({
    message: 'Rejoignez votre partenaire sur onoma',
    url,
    title: 'Onoma invite'
  })
}

class Channel extends Component {
  static navigatorStyle = {
    navBarTextColor: '#f8bbd0',
    navBarButtonColor: '#d8dce5'
  }
  render() {
    const { channel } = this.props
    return (
      <View style={styles.wrapper}>
        <Text></Text>
        <RkButton onPress={() => onClick(channel.dynamicLink)} rkType='basic' >
          <Icon name='ios-link-outline' style={{marginRight: 10, fontSize: 18}} />
          Inviter votre partenaire
        </RkButton>
      </View>
     )
  }
}

import { connect } from 'react-redux'
import { getChannel } from '../selectors/channel'

const mapStateToProps = (state) => {
  const channel = getChannel(state)[0]
  return {
    channel
  }
}

export default connect(mapStateToProps)(Channel)

var styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  image_wrapper:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginVertical: 40
  },
  image: {
    height: 100,
    borderRadius: 50,
    width: 100
  }
})
