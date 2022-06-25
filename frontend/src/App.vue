<template>
  <v-app>
    <v-main>
      <v-app-bar class="bg-tertiary">
        <nav class="text-secondary">
          <router-link to="/">Home</router-link> |
          <router-link to="/auth/sign_up">Sign-up</router-link> |
          <router-link to="/auth/log_in">Log-in</router-link>
        </nav>
      </v-app-bar>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',

  data () {
    return {
      //
    }
  },
})
</script>
