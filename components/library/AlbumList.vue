<template>
  <v-card outlined>
    <v-card-title>
      {{ title }}
    </v-card-title>
    <v-card-text>
      <v-data-iterator hide-default-footer :options="{itemsPerPage: 6}" :items="albums">
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
</template>

<script>
import { sortBy } from 'lodash'
import { mapActions, mapGetters } from 'vuex'
import Album from '~/components/library/Album.vue'
export default {
  components: { Album },
  props: {
    title: {
      type: String,
      default: 'Listado de albumes'
    }
  },
  computed: {
    ...mapGetters('library', ['loaded', 'library']),
    albums () {
      return sortBy(this.library.albums, 'name')
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
