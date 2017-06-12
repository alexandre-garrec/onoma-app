export const shuffle = array => {
  var tmp, current, top = array.length
  if (top) while (--top) {
    current = Math.floor(Math.random() * (top + 1))
    tmp = array[current]
    array[current] = array[top]
    array[top] = tmp
  }
  return array
}

export const remove = (array = [], value) => [...array].filter(v => value != v)

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
