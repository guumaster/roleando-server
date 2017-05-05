import {pick, pickBy, get} from 'lodash'
import {generators as api} from '../modules/api'

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
        ...pick(data, ['tpls', 'tables', 'alias'])
      }
    }
  },
  addExternal (state, payload) {
    state.local.data = {
      ...state.local.data,
      alias: {
        ...state.local.data.alias,
        [payload.key]: payload.value
      }
    }
  },
  removeExternal (state, key) {
    state.local = {
      ...state.local,
      data: {
        ...state.local.data,
        alias: pickBy(state.local.data.alias, (v, k) => k !== key)
      }
    }
  }
}
export const getters = {
  isNew (state) {
    return !(state.current.id)
  },
  authorId (state) {
    return get(state.current, 'author.id')
  },
  canEdit (state, getters, rootState, rootGetters) {
    const isLogged = rootGetters['auth/isLogged']
    const isAdmin = rootGetters['auth/isAdmin']

    if (!isLogged) return false
    if (isAdmin || getters.isNew) return true

    const loggedUserId = rootGetters['auth/userId']
    const authorId = getters['authorId']

    return authorId === loggedUserId
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
        ...pick(payload.data, ['tpls', 'tables', 'alias'])
      }
    }

    try {
      if (!state.current.id) {
        newData = await api.createGenerator(data)
      } else {
        newData = await api.updateGenerator(state.current.id, data)
      }
      commit('set', newData)
      commit('toast/success', 'Guardado con éxito', {root: true})
      return newData
    } catch (e) {
      console.log(e)
      commit('toast/error', 'Error al guardar', {root: true})
    }
  },
  async remove ({state, commit}) {
    try {
      await api.deleteGenerator(state.current.id)
      commit('toast/success', 'Eliminado con éxito', {root: true})
    } catch (e) {
      console.log(e)
      commit('toast/error', 'Error al eliminar', {root: true})
    }
  }
}
