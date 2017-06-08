import { connect } from 'react-redux'
import Component from './component'
import { getMatchs, getMatchList, getNameLoadingStatus } from '../../selectors/name'

const mapStateToProps = (state, { personal = false }) => {
  //const loading = getNameLoadingStatus(state)
  const matchsId = personal ? getMatchs(state) : getMatchList(state)
  return {
    loading: false,
    matchsId
  }
}

export default connect(mapStateToProps)(Component)
