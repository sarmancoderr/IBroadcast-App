<template>
  <v-card>
    <v-img :height="heightArtwork" :src="artworkUrl" />
    <v-card-title class="body-2 pl-2">
      <div class="headerClass">
        {{ album.name }}
      </div>
    </v-card-title>
    <v-card-subtitle>
      {{ artist?.name }}
    </v-card-subtitle>
    <v-card-actions>
      <v-btn elevation="0" color="primary">
        Reproducir
      </v-btn>
      <v-btn elevation="0">
        Mas info
      </v-btn>
    </v-card-actions>
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
.headerClass{
    white-space: nowrap ;
    word-break: normal;
    overflow: hidden ;
    text-overflow: ellipsis;
    font-weight: bold;
}
</style>
