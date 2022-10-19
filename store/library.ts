import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { libraryClient } from '~/utils/httpClients'

export const state = () => ({
  libraryData: null
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  loaded: state => state.libraryData !== null,
  library: (state) => {
    const finalResult: { [key: string]: any[]} = {}
    if (state.libraryData === null) { return finalResult }
    const keys = ['albums', 'artists', 'playlists', 'tags', 'tracks']

    keys.forEach((key) => { finalResult[key] = [] })

    keys.forEach((key) => {
      const { map, ...elements } = (state.libraryData as any)[key]
      if (map) {
        const mapKeys = Object.keys(map)
        const elementsIds = Object.keys(elements)
        elementsIds.forEach((elId) => {
          const obj: any = { id: Number(elId) }
          for (let index = 0; index < mapKeys.length; index++) {
            const attrName = mapKeys[index]
            const tuplePosition = map[attrName]
            obj[attrName] = elements[elId][tuplePosition]
          }
          finalResult[key].push(obj)
        })
      }
    })

    return finalResult
  }
}

export const mutations: MutationTree<RootState> = {
  setLibrary: (state, libraryData) => { state.libraryData = libraryData }
}

export const actions: ActionTree<RootState, any> = {
  async retrieveLibrary ({ commit, rootState }) {
    const { sessionToken, userId } = rootState.auth

    const libRequest = await libraryClient.post('/', {
      client: 'Your Client',
      version: '1.0',
      device_name: 'Your Device Name',
      user_agent: 'Your User Agent String',
      mode: 'login_token',
      type: 'account',
      user_id: userId,
      token: sessionToken
    })

    console.log(libRequest.data)

    if (libRequest.data.result) {
      commit('setLibrary', libRequest.data.library)
    }
  }
}

export const strict = false
