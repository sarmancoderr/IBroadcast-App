export const state = () => ({
})

export const getters = {
  getArtistById: (state, getters, rootState, rootGetters) => (id) => {
    const library = rootGetters['library/library']
    const artist = library.artists.filter(a => a.id === id)[0]
    return artist
  }
}

export const mutations = {
}

export const actions = {
}

export const strict = false
