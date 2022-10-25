<template>
  <v-list>
    <TackListItem
      v-for="track in tracks"
      :key="track.id"
      :track="track"
      @play="(track) => $emit('play', track)"
    />
    <v-list-item class="">
      <v-list-item-avatar>
        <v-avatar color="primary" size="50">
          <span class="white--text text-h5">#</span>
        </v-avatar>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title> Duración total del album </v-list-item-title>
      </v-list-item-content>
      <v-list-item-action>
        <span>
          <template v-if="totalDuration.hours">{{
            totalDuration.hours.toString().padStart(2, '0')
          }}:</template>
          <template v-if="totalDuration.minutes">{{
            totalDuration.minutes.toString().padStart(2, '0')
          }}:</template>
          <template v-if="totalDuration.seconds">{{
            totalDuration.seconds.toString().padStart(2, '0')
          }}</template>
        </span>
      </v-list-item-action>
    </v-list-item>
  </v-list>
</template>

<script>
import { mapGetters } from 'vuex'
import { sortBy } from 'lodash'
import getArtwork from '~/utils/artwork'
import TackListItem from '~/components/tracks/TackListItem.vue'
export default {
  name: 'AlbumPage',
  components: { TackListItem },
  props: {
    album: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    ...mapGetters({
      getTracks: 'library/tracks/getTracksById',
      library: 'library/library',
      getArtistById: 'library/artists/getArtistById'
    }),
    artist () {
      return this.getArtistById(this.album.artist_id)
    },
    tracks () {
      return sortBy(this.getTracks(this.album.tracks), 'track')
    },
    artwork () {
      return getArtwork(this.tracks[0].artwork_id, 300)
    },
    totalDuration () {
      const totalSumSeconds = this.tracks
        .map(t => t.length)
        .reduce((acc, val) => {
          return acc + val
        }, 0)
      const hours = Math.floor(totalSumSeconds / 3600)
      const durationLessHours = totalSumSeconds - hours * 3600
      const minutes = Math.floor(durationLessHours / 60)
      const seconds = durationLessHours - minutes * 60
      return { hours, minutes, seconds }
    }
  },
  methods: {
    getTime (seconds) {
      const minutes = Math.floor(seconds / 60)
      return `${minutes.toString().padStart(2, '0')}:${(seconds - minutes * 60)
        .toString()
        .padStart(2, '0')}`
    }
  }
}
</script>
