export const state = () => ({
})

export const getters = {
  getTracksById: (_state, getters) => (idList) => {
    return idList.map((id) => {
      return getters.getTrackById(id)
    })
  },
  getTrackById: (state, getters, rootState, rootGetters) => (id) => {
    return rootGetters['library/library'].tracks.filter(t => t.id === id)[0]
  }
}

export const mutations = {
}

export const actions = {
}

export const strict = false
