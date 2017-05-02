import { pick } from 'lodash'
import { generators as api } from '../modules/api'
import { generator } from '@guumaster/rpgen'

export const state = {
  current: {},
  local: {}
}
export const mutations = {
  set (state, newGenerator) {
    state.current = newGenerator
    state.local = newGenerator
  },
  localMeta (state, data) {
    state.local = {
      ...state.local,
      ...pick(data, ['name', 'desc'])
    }
  },
  localData (state, data) {
    state.local = {
      ...state.local,
      data: {
        ...state.local.data,
        ...pick(data, ['tpls', 'tables'])
      }
    }
  }
}

export const actions = {
  async load ({commit}, id) {
    const data = await api.loadGenerator(id)
    commit('set', data)
    return data
  },
  async save ({state, commit}, payload) {
    let newData

    const data = {
      ...pick(payload, ['name', 'desc']),
      data: {
        ...pick(payload.data, ['tpls', 'tables'])
      }
    }
    console.log('old', payload)
    console.log('new', data)

    if (!state.current.id) {
      newData = await api.createGenerator(data)
    } else {
      newData = await api.updateGenerator(state.current.id, data)
    }
    commit('set', newData)
    return newData
  },
  remove ({state}) {
    return api.deleteGenerator(state.current.id)
  }
}
