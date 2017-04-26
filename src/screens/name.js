import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native'

import Container from '../component/common/container'

class Name extends Component {
  static navigatorStyle = {
    navBarBackgroundColor: '#F8BBD0'
  };
  constructor(props) {
    super(props);
  }
  render() {
    const { id } = this.props
    return (
      <Container>
        <ConnectedInfo id={id} />
      </Container>
     )
  }
}

export default Name

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 400,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowOffset:{
      width: 10,
      height: 10,
    },
    shadowColor: 'black',
    shadowOpacity: 0.2,
  },
  icon: {
    padding: 50
  },
  name: {
    fontSize: 40
  },
  origine: {
    marginTop: 20
  }
})

import Icon from 'react-native-vector-icons/Ionicons'

const NameInformation = ({ name }) => {
  return (
    <View style={styles.card}>
     <Icon
      style={styles.icon}
      name={name.genre === 'f' ? 'md-female' : 'md-male'}
      size={100}
      color={name.genre === 'f' ? 'rgb(248,187,208)' : 'rgb(59,89,152)'}
    />
    <Text style={styles.name}>{name.firstname}</Text>
    { name.origin ? <Text style={styles.origine}>Origine: {name.origin}</Text> : null }
    </View>
  )
}

import { connect } from 'react-redux'
import { getNameById } from '../selectors/name'

const mapStateToProps = (state, { id }) => {
  const name = getNameById(state, id)
  return {
    name
  }
}

const ConnectedInfo = connect(mapStateToProps)(NameInformation)
