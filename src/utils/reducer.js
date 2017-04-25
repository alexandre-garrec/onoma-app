export const makeAssociativeTable = (data, key = 'id') => {
  const array = Array.isArray(data) ? data : [ data ]
  return array.reduce((memo, item) => ({...memo, [item[key]]: item}), {})
}

const reducer = (initialState, reducer) =>
  (state = initialState, { type, payload }) =>
    reducer[type] ? reducer[type](state, payload) : state

export default reducer
