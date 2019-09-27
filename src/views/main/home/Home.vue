<template>
  <v-container>
      <v-layout column>
          <h1 class="title my-3">Home</h1>
          <v-flex mt-4>
              <v-btn color="primary" to="/">Go To Menu</v-btn>
              <v-btn color="error" @click="logout">Logout</v-btn>

              <Actions/>
          </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
import Actions from '@/views/main/action/Actions.vue'

export default {
  name: 'home',
  components: {
    Actions
  },
  methods: {
    logout () {
      this.$store.dispatch('userSignOut')
    }
  }
}
</script>
