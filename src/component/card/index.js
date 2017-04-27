import { connect } from 'react-redux'
import Component from './component'
import { getNameById } from '../../selectors/name'

const makeMapStateToProps = () => {
  const mapStateToProps = (state, { id }) => {
    const name = getNameById(state, id)
    return {
      name
    }
  }
  return mapStateToProps
}

export default connect(makeMapStateToProps)(Component)
