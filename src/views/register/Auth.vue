<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Login Form</v-toolbar-title>
          </v-toolbar>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              @click="auth"
              data-cy="signinSubmitBtn">
              Auth
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'auth',
  methods: {
    auth () {
      this.$store.dispatch('userLoginOAuth')
    }
  }
}
</script>

<style scoped></style>
