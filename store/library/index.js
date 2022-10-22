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
          if (key === 'tracks') {
            obj.uploaded_timestamp = new Date(`${obj.uploaded_on} ${obj.uploaded_time}`).getTime()
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
  async retrieveLibrary ({ commit, rootState, rootGetters }) {
    const libRequest = await libraryClient.post('/', {
      ...rootGetters['auth/baseReqParams'](true)
    })

    if (libRequest.data.result) {
      commit('setLibrary', libRequest.data.library)
    }
  }
}

export const strict = false
