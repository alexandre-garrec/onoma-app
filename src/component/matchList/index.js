import { connect } from 'react-redux'
import Component from './component'
import { getMatchs, getNameById } from '../../selectors/name'
import { DELETE_MATCH } from '../../actions'

const mapStateToProps = (state) => {
  const matchsId = getMatchs(state)
  const matchs = matchsId.map(id => getNameById(state, id))
  return {
    matchs
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteItem: id => dispatch({ type: DELETE_MATCH, payload: id })
})

export default connect(mapStateToProps, mapDispatchToProps)(Component)
