import axios from 'axios'
import { unset, pick } from 'lodash'

import config from '../config'

const HTTP = axios.create({
  baseURL: `${config.api.baseUrl}/api/generators`
})

export const setAuthToken = authToken => {
  if (!authToken) {
    unset(HTTP.defaults.headers.common, 'Authorization')
    return
  }
  HTTP.defaults.headers.common['Authorization'] = `Bearer ${authToken}`
}

export const loadAll = () => HTTP
  .get(`/tables`)
  .then(res => res.data)

export const loadFeatured = () => HTTP
  .get(`/tables/featured`)
  .then(res => res.data)

export const loadGenerator = generatorId => HTTP
  .get(`/table/${generatorId}`)
  .then(res => res.data)

export const deleteGenerator = generatorId => HTTP
  .delete(`/table/${generatorId}`)
  .then(res => res.data)

export const createGenerator = data => {
  const generatorData = {
    ...pick(data, ['name', 'desc']),
    data: {
      tpls: data.tpls,
      tables: data.tables
    }
  }
  return HTTP
    .post(`/tables`, generatorData)
    .then(res => res.data)
}

export const updateGenerator = (generatorId, data) => {
  const generatorData = {
    ...pick(data, ['name', 'desc']),
    data: {
      tpls: data.tpls,
      tables: data.tables
    }
  }
  return HTTP
    .put(`/table/${generatorId}`, generatorData)
    .then(res => res.data)
}
