import { connect } from 'react-redux'
import Component from './component'
import { getMatchs, getMatchList, getNameById } from '../../selectors/name'

const mapStateToProps = (state, { personal = false }) => {
  const matchsId = personal ? getMatchs(state) : getMatchList(state)
  const matchs = matchsId.map(id => getNameById(state, id))
  return {
    matchs
  }
}

export default connect(mapStateToProps)(Component)
