<template>
  <v-list-item @click="playSong">
    <v-list-item-avatar>
      <v-avatar color="primary" size="50">
        <span class="white--text text-h5">{{ track.track }}</span>
      </v-avatar>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>
        {{ track.title }}
      </v-list-item-title>
      <v-list-item-subtitle>
        {{ artist.name }}
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action>
      <span>{{ getTime(track.length) }}</span>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

/**
// -> https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement#events
/// properties
currentTime -> segundo por lo que va reproduciendose
duration -> segundos totales de la reproducion
/// events
durationchage -> duration property has updated
timeupdate -> Fired when the time indicated by the currentTime property has been updated.
*/

export default {
  name: 'AlbumPage',
  props: {
    track: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      getArtistById: 'library/artists/getArtistById'
    }),
    ...mapState('auth', ['sessionToken', 'userId']),
    artist () {
      return this.getArtistById(this.track.artist_id)
    },
    audioUrl () {
      const url = `https://streaming.ibroadcast.com${this.track.file}`
      // [streaming_server]/[url]?Expires=[now]&Signature=[usertoken]&file_id=[fileID]&user_id=[user ID]&platform=[your app name]&version=[yourapp version]
      const params = new URLSearchParams()
      params.append('signature', this.sessionToken)
      params.append('user_id', this.userId)
      return url + '?' + params.toString()
    }
  },
  methods: {
    getTime (seconds) {
      const minutes = Math.floor(seconds / 60)
      return `${minutes.toString().padStart(2, '0')}:${(seconds - (minutes * 60)).toString().padStart(2, '0')}`
    },
    async playSong () {
      const audioElement = document.getElementById('audioPlayer')

      audioElement.setAttribute('src', this.audioUrl)
      await audioElement.play()
    }
  }
}
</script>
