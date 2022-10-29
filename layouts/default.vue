<template>
  <v-app v-if="loaded" dark>
    <v-navigation-drawer
      v-if="authed"
      :clipped="clipped"
      style="z-index: 0"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon v-if="authed" @click.stop="drawer = !drawer" />
      <v-toolbar-title>
        {{ title }}
      </v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <template v-if="authed">
          <Nuxt />
        </template>
        <LoginForm v-else />
      </v-container>
    </v-main>
    <v-footer
      v-show="currentSong !== undefined"
      color="transparent"
      style="z-index: 2000000000000000000, padding: 0px;"
      app
    >
      <player />
    </v-footer>
  </v-app>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import LoginForm from '~/components/auth/LoginForm.vue'
import Player from '~/components/player.vue'

export default {
  name: 'DefaultLayout',
  components: { LoginForm, Player },
  data () {
    return {
      clipped: true,
      items: [
        {
          icon: 'mdi-home',
          title: 'Pagina inicial',
          to: '/'
        }
      ],
      title: 'IBroadcast App',
      loaded: false
    }
  },
  computed: {
    ...mapState('auth', ['authed']),
    ...mapGetters({
      currentSong: 'queue/currentSong'
    })
  },
  mounted () {
    setTimeout(() => {
      this.loaded = true
    }, 500)
  }
}
</script>
