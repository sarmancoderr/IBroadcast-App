<template>
  <v-app v-if="loaded" dark>
    <v-navigation-drawer
      v-if="authed"
      :clipped="clipped"
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
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import LoginForm from '~/components/auth/LoginForm.vue'

export default {
  name: 'DefaultLayout',
  components: { LoginForm },
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
    ...mapState('auth', ['authed'])
  },
  mounted () {
    setTimeout(() => {
      this.loaded = true
    }, 500)
  }
}
</script>
