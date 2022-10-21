<template>
  <v-card>
    <v-card-title>
      Página de acceso
    </v-card-title>
    <v-card-text>
      <template v-if="authed">
        Estas autenticado
      </template>
      <LoginForm v-else />
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import LoginForm from '~/components/auth/LoginForm.vue'
export default {
  components: { LoginForm },
  computed: {
    ...mapState('auth', ['authed'])
  }
}
</script>
