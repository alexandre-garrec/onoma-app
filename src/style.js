import {RkConfig} from 'react-native-ui-kitten'

export const COLOR_PINK = '#f06292'
export const COLOR_LIGHT_GRAY = '#d8dce5'


export const initRk = () => {
  RkConfig.setType('button', 'default', {
    container: {
      marginTop: 10,
      borderRadius: 10,
      backgroundColor: '#fff',
      borderColor: COLOR_PINK
    },
    inner: {
      color: COLOR_PINK,
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
  RkConfig.setType('button', 'border', {
    container: {
      borderWidth: 1,
    }
  })
  RkConfig.setType('button', 'warning', {
    container: {
      marginTop: 10,
      borderRadius: 10,
      backgroundColor: '#F00051',
      borderColor: '#F00051'
    },
    inner: {
      color: '#fff',
      fontSize: 16
    },
  })
}
