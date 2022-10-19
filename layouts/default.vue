<template>
  <v-app dark>
    <v-navigation-drawer
      v-if="isAuthed"
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
      <v-app-bar-nav-icon v-if="isAuthed" @click.stop="drawer = !drawer" />
      <v-toolbar-title>
        {{ title }}
      </v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <template v-if="isAuthed">
          <Nuxt />
        </template>
        <LoginForm v-else />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import LoginForm from '~/components/auth/LoginForm.vue'

export default {
  name: 'DefaultLayout',
  components: { LoginForm },
  data () {
    return {
      clipped: true,
      items: [
        /* {
              icon: 'mdi-apps',
              title: 'Welcome',
              to: '/'
            } */
      ],
      title: 'IBroadcast App'
    }
  },
  computed: {
    ...mapGetters('auth', ['isAuthed'])
  }
}
</script>
