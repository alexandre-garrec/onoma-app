import { RkConfig } from 'react-native-ui-kitten'

export const COLOR_PINK = '#f06292'
export const COLOR_BLUE = '#7986CB'
export const COLOR_BLACK = '#1F1F21'
export const COLOR_LIGHT_GRAY = '#d8dce5'
export const COLOR_PURPLE = '#b474af'

export const initRk = () => {
  RkConfig.setType('text', 'menu', {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    fontSize: 16,
    color: '#8E8E93'
  })
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
  RkConfig.setType('text', 'error', {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
    color: '#fff',
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
  RkConfig.setType('button', 'clean', {
    container: {
      borderWidth: 0,
      backgroundColor: 'transparent',
      justifyContent: 'flex-start',
    },
    inner: {
      color: COLOR_PINK,
      fontSize: 16,
      textAlign: 'left'
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
  RkConfig.setType('button', 'blue', {
    inner: {
      color: COLOR_BLUE
    }
  })
  RkConfig.setType('button', 'purple', {
    inner: {
      color: COLOR_PURPLE
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
  RkConfig.setType('button', 'medium', {
    inner: {
      fontSize: 18
    }
  })
}
