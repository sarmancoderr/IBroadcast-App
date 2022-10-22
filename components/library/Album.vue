<template>
  <v-card :to="'/library/albums/' + album.id">
    <v-img :height="heightArtwork" :src="artworkUrl" />
    <v-card-title class="body-2 pl-2">
      <div class="headerClass">
        {{ album.name }}
      </div>
    </v-card-title>
    <v-card-subtitle>
      {{ artist?.name }}
    </v-card-subtitle>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import getArtwork from '~/utils/artwork'
export default {
  name: 'AlbumItem',
  props: {
    album: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      heightArtwork: 250
    }
  },
  computed: {
    ...mapGetters({
      library: 'library/library',
      mapToTracks: 'library/tracks/getTracksById'
    }),
    artist () {
      return this.library.artists.filter(a => a.id === this.album.artist_id)[0]
    },
    tracks () {
      return this.mapToTracks(this.album.tracks)
    },
    artworkUrl () {
      return getArtwork(this.tracks[0]?.artwork_id, this.heightArtwork)
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
