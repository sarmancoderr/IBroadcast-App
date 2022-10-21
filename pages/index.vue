<template>
  <v-sheet>
    <h1>Pagina inicial</h1>
    <album-list :title="'Albumes por orden alfabético'" />
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
    ...mapGetters('library', ['loaded'])
  },
  async mounted () {
    await this.retrieveLibrary()
  },
  methods: {
    ...mapActions('library', ['retrieveLibrary'])
  }
}
</script>
