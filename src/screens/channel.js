import React from 'react'
import { StyleSheet, Image, Share, View } from 'react-native'
import { H2, P } from '../styles/text'

import { RkText, RkButton } from 'react-native-ui-kitten'
import Icon from 'react-native-vector-icons/Ionicons'
import Container from '../component/common/container'

import { connect } from 'react-redux'
import { getChannel } from '../selectors/channel'
import { getCurrentUser, getDynamiclink, getUserById } from '../selectors/user'

const onClick = url => {
  Share.share({
    message: 'Rejoignez votre partenaire sur onoma',
    url,
    title: 'Onoma invite'
  })
}

const getPicture = picture =>
  picture ? { uri: picture } : require('../../assets/profile.jpg')

const Channel = ({ channel, user, link, users }) => {
  if (!channel) {
    return (
      <Container>
        <RkText rkType='info'>
          Vous n'avez pas encore de partenaire sur l'application
        </RkText>
        <RkButton onPress={() => onClick(link)} rkType='default'>
          <Icon
            name='ios-link-outline'
            style={{ marginRight: 10, fontSize: 18 }}
          />
          Inviter votre partenaire
        </RkButton>
      </Container>
    )
  }
  return (
    <Container>
      <View style={{ flexDirection: 'row' }}>
        {users.map(user => (
          <Image
            key={user.id}
            style={styles.image}
            source={getPicture(user.picture)}
          />
        ))}
      </View>
      <H2>Vous et Jean-Alexandreavez une liste commune</H2>
      <P>Pour changer de partenaire,tapez pour copier le lien</P>
      <RkButton onPress={() => onClick(link)} rkType='default'>
        <Icon
          name='ios-link-outline'
          style={{ marginRight: 10, fontSize: 18 }}
        />
        Inviter votre partenaire
      </RkButton>
    </Container>
  )
}

//  {channel.users.map(id => <Text key={id}>{id}</Text>)}
// <RkButton onPress={() => onClick(channel.dynamicLink)} rkType='default' >
//  <Icon name='ios-link-outline' style={{ marginRight: 10, fontSize: 18 }} />
//  Inviter votre partenaire
//        </RkButton>

const mapStateToProps = state => {
  const [channel] = getChannel(state)
  const user = getCurrentUser(state)
  const link = getDynamiclink(state)
  const users = channel ? channel.users.map(id => getUserById(state, id)) : []
  console.log({ users })
  return {
    channel,
    user,
    link,
    users
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
    margin: 20,
    height: 100,
    borderRadius: 50,
    width: 100
  }
})
