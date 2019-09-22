<template>
  <v-app>
    <app-navigation></app-navigation>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import AppNavigation from '@/components/shared/AppNavigation'

export default {
  name: 'core',
  components: {
    AppNavigation
  }
}
</script>

<style lang="scss" scoped>

</style>
