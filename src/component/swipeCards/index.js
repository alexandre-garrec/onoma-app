import { connect } from 'react-redux'
import Component from './component'
import { getNames } from '../../selectors/name'


const mapStateToProps = (state) => {
  const names = getNames(state)
  return {
    names
  }
}

export default connect(mapStateToProps)(Component)
