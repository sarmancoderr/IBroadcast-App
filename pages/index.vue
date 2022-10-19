<template>
  <v-sheet>
    <v-card :loading="!loaded" :disabled="!loaded">
      <v-card-title>
        HomePage
      </v-card-title>
      <v-card-text>
        <v-data-iterator :options="{itemsPerPage: 12}" :items="library.albums">
          <template #default="{ items }">
            <v-row>
              <v-col
                v-for="item in items"
                :key="item.name"
                cols="2"
              >
                <Album :album="item" />
              </v-col>
            </v-row>
          </template>
        </v-data-iterator>
      </v-card-text>
      <v-card-actions />
    </v-card>
  </v-sheet>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Album from '~/components/library/Album.vue'
export default {
  name: 'HomePage',
  head () {
    return {
      title: 'Página inicial'
    }
  },
  computed: {
    ...mapGetters('library', ['loaded', 'library'])
  },
  async mounted () {
    await this.retrieveLibrary()
    console.log(this.library.albums.map(a => a.icatid))
  },
  methods: {
    ...mapActions('library', ['retrieveLibrary'])
  },
  components: { Album }
}
</script>
