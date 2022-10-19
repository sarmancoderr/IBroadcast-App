<template>
  <v-sheet>
    <v-card :loading="!loaded" :disabled="!loaded">
      <v-card-title>
        HomePage
      </v-card-title>
      <v-card-text>
        <p>Pagina de HomePage</p>
      </v-card-text>
      <v-card-actions />
    </v-card>
  </v-sheet>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'HomePage',
  head () {
    return {
      title: 'Página inicial'
    }
  },
  computed: {
    ...mapGetters('library', ['loaded'])
  },
  mounted () {
    this.retrieveLibrary()
  },
  methods: {
    ...mapActions('library', ['retrieveLibrary'])
  }
}
</script>
