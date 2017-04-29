import axios from 'axios'

import config from './config'

const AUTH = axios.create({
  baseURL: `${config.api.baseUrl}`
})

export const login = authToken => AUTH
  .post('/auth/login', {}, {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
  .then(res => res.data)
