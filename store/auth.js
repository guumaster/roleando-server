import { get } from 'lodash'

import { auth, generators, me } from '../modules/api'

import * as storage from '../modules/storage/auth'

export const state = {
  user: {
    profile: {
      name: 'Anonimo',
      picture: null,
      id: null
    },
    token: null
  }
}

export const getters = {
  isLogged (state) {
    return !!(state.user && state.user.token)
  },
  isAdmin (state) {
    return get(state.user, 'profile.isAdmin', false)
  },
  userId (state) {
    return get(state.user, 'profile.id', -1)
  }
}
export const mutations = {
  setUserInfo (state, userInfo) {
    state.user = userInfo
  }
}

export const actions = {

  async login ({dispatch}, authResult) {
    await storage.saveIdToken(authResult.idToken)
    const profile = await auth.login(authResult.accessToken)
    await storage.saveProfile(profile)
    return dispatch('loadUserInfo')
  },
  async logout ({commit}) {
    await storage.logout()
    commit('setUserInfo', {profile: {}, token: null})
  },
  async loadUserInfo ({commit}) {
    const userInfo = await storage.getUserInfo()
    generators.setAuthToken(get(userInfo, 'token.accessToken'))
    me.setAuthToken(get(userInfo, 'token.accessToken'))
    commit('setUserInfo', userInfo)
  }
}
