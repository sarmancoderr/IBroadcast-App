<template>
  <v-container>
    <v-card :loading="loading" :disabled="loading" tag="form" @submit.prevent="authUser(formData)">
      <v-card-title>
        Acceda al area privada
      </v-card-title>
      <v-card-text>
        <v-text-field v-model="formData.appId" label="App id" />
        <v-text-field v-model="formData.loginToken" type="password" label="Login token" />
      </v-card-text>
      <v-card-actions>
        <v-btn type="submit" elevation="0" color="primary">
          Acceder
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'LoginForm',
  data () {
    return {
      loading: false,
      formData: {
        appId: '',
        loginToken: ''
      }
    }
  },
  head () {
    return {
      title: 'Acceda al area privada'
    }
  },
  methods: {
    ...mapActions('auth', ['authUser'])
  }
}
</script>
