<template>
  <v-hover v-slot="{hover}">
    <v-list-item :class="classTrackItem" @click="playSong">
      <v-list-item-avatar>
        <v-avatar v-if="!hover" color="primary" size="50">
          <span class="white--text text-h5">{{ track.track }}</span>
        </v-avatar>
        <v-btn v-else color="primary" depressed icon>
          <v-icon>
            mdi-play
          </v-icon>
        </v-btn>
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
        <v-flex>
          <v-chip>{{ getTime(track.length) }}</v-chip>
          <v-menu offset-y>
            <template #activator="{ on, attrs }">
              <v-btn v-bind="attrs" icon v-on="on">
                <v-icon>
                  mdi-dots-vertical
                </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    Primer menu
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    Segundo menu
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-flex>
      </v-list-item-action>
    </v-list-item>
  </v-hover>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

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
      getArtistById: 'library/artists/getArtistById',
      currentSong: 'queue/currentSong'
    }),
    classTrackItem () {
      return this.currentSong === this.track.id ? 'blue--text lighten-3' : ''
    },
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
    playSong () {
      this.$emit('play', this.track.id)
    }
  }
}
</script>
