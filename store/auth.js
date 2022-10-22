import { apiClient } from '../utils/httpClients'

export const state = () => ({
  sessionToken: null,
  sessionUuid: null,
  userId: '',
  authed: false
})

export const getters = {
  baseReqParams: state => (authed = true) => {
    return {
      client: 'website',
      version: '4.0',
      device_name: 'Website (14, Web Browser, Win32)',
      user_agent: window.navigator.userAgent,
      ...(!authed
        ? {}
        : {
            session_uuid: state.sessionUuid,
            token: state.sessionToken,
            user_id: state.userId
          })
    }
  }
}

export const mutations = {
  setToken: (state, { token, userId, sessionUuid }) => {
    state.sessionToken = token
    state.userId = userId
    state.authed = true
    state.sessionUuid = sessionUuid
  }
}

export const actions = {
  async authUser ({ commit, getters }, { appId, loginToken }) {
    const payload = {
      ...getters.baseReqParams(false),
      app_id: appId,
      login_token: loginToken,
      mode: 'login_token',
      type: 'account'
    }
    const request = await apiClient.post('/', payload)
    const { token, id } = request.data.user
    const { session_uuid: sessionUuid } = request.data.user.session
    commit('setToken', { token, userId: id, sessionUuid })
  }
}

export const strict = false
