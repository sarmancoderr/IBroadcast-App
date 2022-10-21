import { libraryClient } from '~/utils/httpClients'

export const state = () => ({
  libraryData: null
})

export const getters = {
  loaded: state => state.libraryData !== null,
  library: (state) => {
    const finalResult = {}
    if (state.libraryData === null) { return finalResult }
    const keys = ['albums', 'artists', 'playlists', 'tags', 'tracks']

    keys.forEach((key) => { finalResult[key] = [] })

    keys.forEach((key) => {
      const { map, ...elements } = state.libraryData[key]
      if (map) {
        const mapKeys = Object.keys(map)
        const elementsIds = Object.keys(elements)
        elementsIds.forEach((elId) => {
          const obj = { id: Number(elId) }
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

export const mutations = {
  setLibrary: (state, libraryData) => { state.libraryData = libraryData }
}

export const actions = {
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

    if (libRequest.data.result) {
      commit('setLibrary', libRequest.data.library)
    }
  }
}

export const strict = false
