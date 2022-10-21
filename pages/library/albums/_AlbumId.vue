<template>
  <v-sheet>
    <v-card>
      <v-card-title>
        <v-row>
          <v-col md="2">
            <v-img :src="artwork" />
          </v-col>
          <v-col>
            <v-card elevation="0">
              <v-card-title>
                {{ album.name }}
              </v-card-title>
              <v-card-subtitle>
                <span>
                  Duracion total:
                  <template v-if="totalDuration.hours">{{ totalDuration.hours }} horas </template>
                  <template v-if="totalDuration.minutes">{{ totalDuration.minutes }} minutos </template>
                  <template v-if="totalDuration.seconds"> y {{ totalDuration.seconds }} segundos </template>
                </span>
              </v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item v-for="track in tracks" :key="track.id">
            <v-list-item-avatar>
              <v-avatar color="primary" size="50">
                <span class="white--text text-h5">{{ track.track }}</span>
              </v-avatar>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                {{ track.title }}
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <span>{{ getTime(track.length) }}</span>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions />
    </v-card>
  </v-sheet>
</template>

<script>
import { mapGetters } from 'vuex'
import { sortBy } from 'lodash'
import getArtwork from '~/utils/artwork'
export default {
  name: 'AlbumPage',
  head () {
    return {
      title: 'Album page'
    }
  },
  computed: {
    ...mapGetters({
      getTracks: 'library/tracks/getTracksById',
      library: 'library/library'
    }),
    album () {
      return this.library.albums.filter((a) => {
        return a.id === Number(this.$route.params.AlbumId)
      })[0]
    },
    tracks () {
      return sortBy(this.getTracks(this.album.tracks), 'track')
    },
    artwork () {
      return getArtwork(this.tracks[0].artwork_id, 300)
    },
    totalDuration () {
      const totalSumSeconds = this.tracks.map(t => t.length).reduce((acc, val) => {
        return acc + val
      }, 0)
      const hours = Math.floor(totalSumSeconds / 3600)
      const durationLessHours = totalSumSeconds - (hours * 3600)
      const minutes = Math.floor(durationLessHours / 60)
      const seconds = durationLessHours - (minutes * 60)
      return { hours, minutes, seconds }
    }
  },
  methods: {
    getTime (seconds) {
      const minutes = Math.floor(seconds / 60)
      return `${minutes.toString().padStart(2, '0')}:${(seconds - (minutes * 60)).toString().padStart(2, '0')}`
    }
  }
}
</script>
