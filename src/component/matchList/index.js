import { connect } from 'react-redux'
import Component from './component'
import { getMatchs, getNameById } from '../../selectors/name'

const mapStateToProps = (state) => {
  const matchsId = getMatchs(state)
  const matchs = matchsId.map(id => getNameById(state, id))
  return {
    matchs
  }
}

export default connect(mapStateToProps)(Component)
