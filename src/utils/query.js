import { Component } from 'react'
import { connect } from 'react-redux'

class Query extends Component {
  render = () => null
  componentWillMount = () => this.request(this.props)
  request = ({fetch, id = false}) => fetch(id)
}

const mapDispatchToProps = (dispatch, { action }) => ({
  fetch: id => dispatch({ type: action, payload: { id } })
})

export default connect(() => ({}), mapDispatchToProps)(Query)
