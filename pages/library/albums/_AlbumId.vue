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
                {{ artist.name }}
              </v-card-subtitle>
              <v-card-actions>
                <v-btn icon dark large color="primary">
                  <v-icon>
                    mdi-play
                  </v-icon>
                </v-btn>
                <v-btn icon dark large color="primary">
                  <v-icon>
                    mdi-shuffle
                  </v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <track-list :album="album" />
      </v-card-text>
      <v-card-actions />
    </v-card>
  </v-sheet>
</template>

<script>
import { mapGetters } from 'vuex'
import { sortBy } from 'lodash'
import getArtwork from '~/utils/artwork'
import TrackList from '~/components/tracks/TrackList.vue'
export default {
  name: 'AlbumPage',
  components: { TrackList },
  head () {
    return {
      title: this.album?.name
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
    }
  }
}
</script>
