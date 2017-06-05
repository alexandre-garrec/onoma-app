import { connect } from 'react-redux'
import Component from './component'
import { getMatchs, getMatchList, getNameById, getNameLoadingStatus } from '../../selectors/name'

const mapStateToProps = (state, { personal = false }) => {
  const loading = getNameLoadingStatus(state)
  const matchsId = personal ? getMatchs(state) : getMatchList(state)
  const matchs = matchsId.map(id => getNameById(state, id))
  return {
    matchs,
    loading
  }
}

export default connect(mapStateToProps)(Component)
