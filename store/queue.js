/* eslint-disable camelcase */
import getArtwork from '~/utils/artwork'

export const state = () => ({
  albumPlaying: '',
  playlistPlaying: '',
  trackList: [],
  queue: [],
  currentIndex: -2,
  playing: false
})
export const getters = {
  currentSong (state) {
    return state.queue[state.currentIndex]
  },
  activeSong (state, getters, rootState, rootGetters) {
    return rootGetters['library/library'].tracks.filter(t => t.id === getters.currentSong)[0]
  },
  activeSongInfo (state, getters, rootState, rootGetters) {
    if (!getters.currentSong) { return null }
    const { album_id, artist_id, artwork_id, title } = getters.activeSong

    return {
      album: rootGetters['library/library'].albums.filter(album => album.id === album_id)[0],
      artist: rootGetters['library/library'].artists.filter(artist => artist.id === artist_id)[0],
      artwork: getArtwork(artwork_id, 300),
      title
    }
  },
  activeSongUrl (state, getters, rootState) {
    if (!getters.currentSong) { return null }

    const { sessionToken, userId } = rootState.auth
    const url = `https://streaming.ibroadcast.com${getters.activeSong.file}`
    // [streaming_server]/[url]?Expires=[now]&Signature=[usertoken]&file_id=[fileID]&user_id=[user ID]&platform=[your app name]&version=[yourapp version]
    const params = new URLSearchParams()
    params.append('signature', sessionToken)
    params.append('user_id', userId)
    return url + '?' + params.toString()
  }
}

export const mutations = {
  nextSong (state) {
    if (state.currentIndex >= state.queue.length) {
      state.currentIndex = -1
    } else {
      state.currentIndex += 1
    }
  },
  backSong (state) {
    if (state.currentIndex <= 0) {
      state.currentIndex = 0
    } else {
      state.currentIndex -= 1
    }
  },
  playing (state, val) {
    state.playing = val
  },
  playAlbum (state, { albumId, tracks, index = 0 }) {
    state.currentIndex = index
    state.playlistPlaying = ''
    state.albumPlaying = albumId
    state.trackList = tracks
    state.queue = tracks
  },
  playList (state, { playlistId, tracks, index = 0 }) {
    state.currentIndex = index
    state.playlistPlaying = playlistId
    state.albumPlaying = ''
    state.trackList = tracks
    state.queue = tracks
  }
}

export const actions = {
}

export const strict = false
