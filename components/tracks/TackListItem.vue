<template>
  <v-list-item>
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
import { mapGetters } from 'vuex'
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
    artist () {
      return this.getArtistById(this.track.artist_id)
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
