<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4>
      <v-card class="elevation-12">
        <v-toolbar dark color="primary">
          <v-toolbar-title>{{action}} Form</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              prepend-icon="mdi-account"
              name="name"
              label="Name"
              type="text"
              v-model="form.displayName"
              :rules="textRules"
              data-cy="registerNameField"
              required>
            </v-text-field>
            <v-text-field
              prepend-icon="mdi-email"
              name="email"
              label="Email"
              type="email"
              v-model="form.email"
              :rules="emailRules"
              data-cy="registerEmailField"
              disabled>
            </v-text-field>
            <v-text-field
              prepend-icon="mdi-phone"
              name="phoneNumber"
              label="Phone Number"
              type="phoneNumber"
              v-model="form.phoneNumber"
              :rules="phoneNumberRules"
              data-cy="registerPhoneNumberField"
              required>
            </v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            :disabled="!valid"
            @click="submit"
            data-cy="registerSubmitBtn">
            {{action}}
          </v-btn>

          <slot></slot>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'actionForm',
  props: {
    action: String
  },
  data () {
    return {
      valid: false,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      textRules: [
        v => !!v || 'Field is required',
        v => v.length >= 3 ||
                      'This field need be more 3 letters'
      ],
      phoneNumberRules: [
        v => !!v || 'Field is required'
        // v => v.length >= 11
        //               || 'This field need be more 11 letters',
      ]
    }
  },
  computed: {
    form () {
      return this.$store.state.user
    }
  },
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        this.$emit('form', this.form)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
