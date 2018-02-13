
import React, { Component, createElement } from 'react'

const withOutNavbar = WrappedComponent => {
  class Connect extends Component {
    static navigatorStyle = {
      navBarHidden: true
    }
    render() {
      return createElement(WrappedComponent, { ...this.props, withOutNavbar: true })
    }
  }
  return Connect
}

export default withOutNavbar