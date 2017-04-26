import { connect } from 'react-redux'
import Component from './component'
import { makeGetNames } from '../../selectors/name'
import { ADD_MATCH } from '../../actions'


const makeMapStateToProps = () => {
  const getNames = makeGetNames()
  const mapStateToProps = (state) => {
    const names = getNames(state)
    return {
      names
    }
  }
  return mapStateToProps
}

const mapDispatchToProps = (dispatch) => ({
  match: id => dispatch({ type: ADD_MATCH, payload: id })
})

export default connect(makeMapStateToProps, mapDispatchToProps)(Component)
