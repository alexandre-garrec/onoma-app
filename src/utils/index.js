
export const remove = (array = [], value) => {
  var index = array.indexOf(value)
  if (index > -1) {
    return array.slice(0, index).concat(array.slice(index + 1))
  }
  return array
}

export const isEmpty = obj => {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) return false
  }
  return JSON.stringify(obj) === JSON.stringify({})
}

export const extractParams = (url, base = '') => {
  const _url = url.replace(base, '').split('/') || []
  return paramsToJson(_url)
}

export const paramsToJson = (params, obj = {}) => {
  if (!params.length) return obj
  const [key, value = '', ...rest] = params
  return paramsToJson(rest, {
    ...obj,
    [key]: value
  })
}

export const difference = (a1, a2) => {
  var a2Set = new Set(a2)
  return a1.filter(x => !a2Set.has(x))
}

export const capitalizeFirstLetter = txt =>
  `${txt.charAt(0).toUpperCase()}${txt.slice(1)}`
