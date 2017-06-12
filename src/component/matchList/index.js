import { connect } from 'react-redux'
import Component from './component'
import { getMatchs, getMatchList } from '../../selectors/name'

const mapStateToProps = (state, { personal = false }) => {
  const matchsId = personal ? getMatchs(state) : getMatchList(state)
  return {
    loading: false,
    matchsId
  }
}

export default connect(mapStateToProps)(Component)
