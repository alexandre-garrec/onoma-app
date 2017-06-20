import { connect } from 'react-redux'
import Component from './component'
import { getNameById } from '../../selectors/name'
import { getOriginById } from '../../selectors/origin'

const makeMapStateToProps = () => {
  const mapStateToProps = (state, { id }) => {
    const name = getNameById(state, id) || false
    const origin = name ? getOriginById(state, name.origin) : false
    return {
      name,
      origin
    }
  }
  return mapStateToProps
}

export default connect(makeMapStateToProps)(Component)
