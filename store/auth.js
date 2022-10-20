import { apiClient } from '../utils/httpClients'

export const state = () => ({
  sessionToken: null,
  userId: ''
})

export const getters = {
  isAuthed: state => state.sessionToken !== null
}

export const mutations = {
  setToken: (state, { token, userId }) => {
    state.sessionToken = token
    state.userId = userId
  }
}

export const actions = {
  async authUser ({ commit }, { appId, loginToken }) {
    const payload = {
      client: 'Your Client',
      version: '1.0',
      device_name: 'Your Device Name',
      user_agent: 'Your User Agent String',
      mode: 'login_token',
      app_id: appId,
      type: 'account',
      login_token: loginToken
    }
    const request = await apiClient.post('/', payload)
    const { token, id } = request.data.user
    commit('setToken', { token, userId: id })
  }
}

export const strict = false
