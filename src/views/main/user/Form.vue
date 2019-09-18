<template>
  <v-container>
      <v-layout column>
          <h1 class="title my-3">Form</h1>
          <user-form-component/>
          <v-flex mt-4>
            <v-btn color="primary" to="/">Go To Menu</v-btn>
          </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
import userFormComponent from './components/FormComponent.vue'

export default {
  name: 'userForm',
  components: {
    userFormComponent
  }
}
</script>

<style lang="scss" scoped>

</style>
