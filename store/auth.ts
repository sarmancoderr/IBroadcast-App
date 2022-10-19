import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { apiClient } from '~/utils/httpClients'

export const state = () => ({
  sessionToken: 'a5aeebed-1bc4-11ed-a8bc-b49691aa2236', // null,
  userId: '2228080' // ''
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  isAuthed: state => state.sessionToken !== null
}

export const mutations: MutationTree<RootState> = {
  setToken: (state, { token, userId }) => {
    state.sessionToken = token
    state.userId = userId
  }
}

export const actions: ActionTree<RootState, RootState> = {
  async authUser ({ commit }, { appId, loginToken }: { loginToken: string, appId: string }) {
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
