import { storage } from '../config'

// load
export const load = (key, id) => {
  return storage.load({
    key,
    id
  }).then(response => response).catch(e => false)
}

export const save = (key, rawData, id) => storage.save({ key, rawData, id })

// getIdsForKey
export const getIdsForKey = key => storage.getIdsForKey(key).then(ids => ids)

// getAllDataForKey
export const getAllDataForKey = key => storage.getAllDataForKey(key).then(data => data)

// remove single record
// Id optional
export const remove = (key, id) => storage.remove({key, id})

// !! clear map and remove all key-id data (but keep the key-only data)
export const clearMap = (key, id) => storage.clearMap()

// !! clear all data under a key
export const clearMapForKey = key => storage.clearMapForKey(key)
