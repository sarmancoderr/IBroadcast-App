<template>
  <v-card>
    <v-img :height="heightArtwork" :src="artworkUrl" />
    <v-card-title>
      {{ album.name }}
    </v-card-title>
    <v-card-text>
      {{ artist?.name }}
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AlbumItem',
  props: {
    album: {
      type: () => ({}),
      required: true
    }
  },
  data () {
    return {
      heightArtwork: 250
    }
  },
  computed: {
    ...mapGetters('library', ['library']),
    artist () {
      return this.library.artists.filter(a => a.id === this.album.artist_id)[0]
    },
    tracks () {
      return this.album.tracks.map(a => this.library.tracks.filter(t => t.id === a)[0])
    },
    artworkUrl () {
      return `https://artwork.ibroadcast.com/artwork/${this.tracks[0]?.artwork_id ?? '00000'}-${this.heightArtwork}`
    }
  }
}
</script>

<style>

</style>
