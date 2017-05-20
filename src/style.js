import {RkConfig} from 'react-native-ui-kitten'

export const initRk = () => {
  RkConfig.setType('button', 'default', {
    container: {
      marginTop: 10,
      borderRadius: 10,
      backgroundColor: '#fff',
    },
    inner: {
      color: '#f06292',
      fontSize: 16
    },
  })
  RkConfig.setType('button', 'facebook', {
    container: {
      backgroundColor: '#fff',
    },
    inner: {
      fontSize: 16,
      color: '#3b5998'
    },
  })
}
