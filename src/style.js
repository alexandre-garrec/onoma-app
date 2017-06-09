import { RkConfig } from 'react-native-ui-kitten'

export const COLOR_PINK = '#f06292'
export const COLOR_BLUE = '#7986CB'
export const COLOR_LIGHT_GRAY = '#d8dce5'

export const initRk = () => {
  RkConfig.setType('text', 'big', {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 26,
    color: '#fff',
    textAlign: 'center'
  })
  RkConfig.setType('text', 'info', {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
    color: COLOR_PINK,
    textAlign: 'center'
  })
  RkConfig.setType('text', 'title', {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 20,
    color: COLOR_PINK
  })
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
    }
  })
  RkConfig.setType('button', 'facebook', {
    container: {
      backgroundColor: '#fff'
    },
    inner: {
      fontSize: 16,
      color: '#3b5998'
    }
  })
  RkConfig.setType('button', 'border', {
    container: {
      borderWidth: 1
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
    }
  })
  RkConfig.setType('button', 'big', {
    container: {
      marginTop: 20,
      borderRadius: 10,
      backgroundColor: 'trasparent',
      borderColor: '#fff'
    },
    inner: {
      color: '#fff',
      fontSize: 26
    }
  })
}
