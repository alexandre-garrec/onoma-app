export const arrayToObject = (array) => array.reduce((memo, item) => ({ ...memo, [item]: true }), {})
