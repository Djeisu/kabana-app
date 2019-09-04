<template>
  <v-app>
    <app-navigation></app-navigation>

    <v-content transition="slide-x-transition">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import AppNavigation from '@/components/AppNavigation'
import firebase from 'firebase'

export default {
  name: 'App',
  props: {
    currentUser: Object
  },
  components: {
    AppNavigation
  },
  beforeCreate () {
    this.$store.dispatch(
      'verifyUserFirebase',
      firebase.auth().currentUser)
  }
}
</script>

<style></style>
