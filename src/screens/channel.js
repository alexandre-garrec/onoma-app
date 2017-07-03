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
import Container from '../component/common/container'
import { COLOR_PINK } from '../style'


const onClick = (url) => {
  Share.share({
    message: 'Rejoignez votre partenaire sur onoma',
    url,
    title: 'Onoma invite'
  })
}

const Channel = ({ channel, user, link }) => {
  if (!channel) {
    return (
      <Container>
        <RkText rkType='info'>Vous n'avez pas encore de partenaire sur l'application</RkText>
        <RkButton onPress={() => onClick(link)} rkType='default' >
          <Icon name='ios-link-outline' style={{ marginRight: 10, fontSize: 18 }} />
          Inviter votre partenaire
          </RkButton>
      </Container>
    )
  }
  return (
    <Container>
      <RkText rkType='info'>Vous avez déjà un partenaire sur l'application</RkText>
    </Container>
  )
}

//  {channel.users.map(id => <Text key={id}>{id}</Text>)}
//<RkButton onPress={() => onClick(channel.dynamicLink)} rkType='default' >
//  <Icon name='ios-link-outline' style={{ marginRight: 10, fontSize: 18 }} />
//  Inviter votre partenaire
//        </RkButton>

import { connect } from 'react-redux'
import { getChannel } from '../selectors/channel'
import { getCurrentUser, getDynamiclink } from '../selectors/user'

const mapStateToProps = (state) => {
  const channel = getChannel(state)[0]
  const user = getCurrentUser(state)
  const link = getDynamiclink(state)
  return {
    channel,
    user,
    link
  }
}

export default connect(mapStateToProps)(Channel)

var styles = StyleSheet.create({
  image_wrapper: {
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
