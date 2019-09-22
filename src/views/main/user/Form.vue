<template>
  <v-container>
      <v-layout column>
        <h1 class="title my-3">Form</h1>
        <user-form :action="'Save'" @form="save"/>
      </v-layout>
  </v-container>
</template>

<script>
import UserForm from './components/UserForm.vue'

export default {
  name: 'userFormPage',
  components: {
    UserForm
  },
  methods: {
    save (user) {
      this.$store.dispatch('userUpdate', {
        model: this.$UserModel,
        response: user
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
