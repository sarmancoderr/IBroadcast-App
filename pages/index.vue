<template>
  <v-sheet>
    <div v-for="section in sections" :key="section.key" :style="{'margin-bottom': '10px'}">
      <album-list :albums="section.list" :title="section.title" />
    </div>
  </v-sheet>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import AlbumList from '~/components/library/AlbumList.vue'
export default {
  name: 'HomePage',
  components: { AlbumList },
  head () {
    return {
      title: 'Página inicial'
    }
  },
  computed: {
    ...mapGetters({
      albumsOrdered: 'library/albums/albumsOrdered',
      albumsLast: 'library/albums/lastAlbums',
      loaded: 'library/loaded'
    }),
    sections () {
      return [
        { key: 'ALBALF', list: this.albumsOrdered, title: 'Lista de albumes ordenados' },
        { key: 'ALBLAST', list: this.albumsLast, title: 'Ultimos albumes añadidos' }
      ]
    }
  },
  async mounted () {
    await this.retrieveLibrary()
  },
  methods: {
    ...mapActions('library', ['retrieveLibrary'])
  }
}
</script>
