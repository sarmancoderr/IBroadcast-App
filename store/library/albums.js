import { sortBy, uniq } from 'lodash'

export const state = () => ({
})

export const getters = {
  albumsOrdered: (state, getters, rootState, rootGetters) => {
    const albums = rootGetters['library/library'].albums
    return sortBy(albums, 'name')
  },
  lastAlbums: (state, getters, rootState, rootGetters) => {
    const tracks = sortBy(rootGetters['library/library'].tracks, 'uploaded_timestamp')
    const albumsIds = uniq(tracks.map(t => t.album_id))
    return albumsIds.map(id => rootGetters['library/library'].albums.filter(a => a.id === id)[0]).reverse()
  }
}

export const mutations = {
}

export const actions = {
}

export const strict = false
