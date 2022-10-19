<template>
  <v-card>
    <v-card-title>
      Página de acceso
    </v-card-title>
    <v-card-text>
      <template v-if="isAuthed">
        Estas autenticado
      </template>
      <LoginForm v-else />
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import LoginForm from '~/components/auth/LoginForm.vue'
export default {
  components: { LoginForm },
  computed: {
    ...mapGetters('auth', ['isAuthed'])
  }
}
</script>
