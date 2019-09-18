<template>
    <v-container>
        <v-layout column>
            <h1 class="title my-3">My Recipes</h1>
            <v-flex mt-4>
                <v-btn color="primary" to="/">Go To Menu</v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
  name: 'About',
  computed: {
    // userRecipes () {
    //   return this.$store.state.userRecipes
    // }
  }
}
</script>

<style scoped></style>
