<template>
  <v-content>
    <v-container
      fluid
      fill-height
    >
      <v-layout
        align-center
        justify-center
      >
        <v-flex
          xs12
          sm8
          md4
        >
          <v-card class="elevation-12">
            <v-toolbar
              color="primary"
              dark
              flat
            >
              <v-toolbar-title>{{ source }}</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  label="Name"
                  name="name"
                  prepend-icon="mdi-account"
                  type="text"
                  v-model.trim="name"
                  required
                  @input="$v.name.$touch()"
                  @blur="$v.name.$touch()"
                  :error-messages="nameErrors"
                ></v-text-field>
                
                <v-text-field
                  label="E-Mail"
                  name="mail"
                  prepend-icon="mdi-at"
                  type="text"
                  v-model.trim="mail"
                  required
                  @input="$v.mail.$touch()"
                  @blur="$v.mail.$touch()"
                  :error-messages="mailErrors"
                ></v-text-field>

                <v-text-field
                  label="Identity"
                  name="identity"
                  prepend-icon="mdi-account-card-details-outline"
                  type="text"
                  v-model.trim="identity"
                  required
                  @input="$v.identity.$touch()"
                  @blur="$v.identity.$touch()"
                  :error-messages="identityErrors"
                ></v-text-field>

                <v-text-field
                  label="Phone"
                  name="phone"
                  prepend-icon="mdi-cellphone"
                  type="text"
                  v-model.trim="phone"
                  required
                  @input="$v.phone.$touch()"
                  @blur="$v.phone.$touch()"
                  :error-messages="phoneErrors"
                ></v-text-field>

                <v-text-field
                  id="password"
                  label="Password"
                  name="password"
                  prepend-icon="mdi-lock"
                  type="password"
                  v-model.trim="password"
                  required
                  @input="$v.password.$touch()"
                  @blur="$v.password.$touch()"
                  :error-messages="passwordErrors"
                ></v-text-field>

                <v-text-field
                  id="passwordConfirmation"
                  label="Password confirmation"
                  name="passwordConfirmation"
                  prepend-icon="mdi-lock"
                  type="password"
                  v-model.trim="passwordConfirmation"
                  @input="$v.passwordConfirmation.$touch()"
                  @blur="$v.passwordConfirmation.$touch()"
                  :error-messages="passwordConfirmationErrors"
                ></v-text-field>
              </v-form>
              <v-alert
                v-model="show"
                :dismissible="dismissible"
                :type="type"
                class="mb-4 mt-4"
              >
                {{ alert.message }}
              </v-alert>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="register()">Register</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
  import  { required, minLength, maxLength, email, sameAs } from 'vuelidate/lib/validators'
  export default {
    props: {
      source: String,
    },
    data: () => ({
      name: '',
      mail: '',
      identity: '',
      phone: '',
      password: '',
      passwordConfirmation: '',
      type: 'success',
      show: false,
      dismissible: false,
      alert: {
        message: ''
      }
    }),
    validations: {
      name: {
        required,
        minLength: minLength(5)
      },
      mail: {
        required,
        email
      },
      identity: {
        required,
        minLength: minLength(13),
        maxLength: maxLength(13)
      },
      phone: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(8)
      },
      password: {
        required,
        minLength: minLength(5)
      },
      passwordConfirmation: {
        sameAsPassword: sameAs('password')
      }
    },
    computed: {
      nameErrors: function() {
        const errors = []
        if(!this.$v.name.$dirty) return errors
        !this.$v.name.minLength && errors.push('Name must have at least 5 characters.')
        !this.$v.name.required && errors.push('Name is required.')
        return errors
      },
      mailErrors: function() {
        const errors = []
        if(!this.$v.mail.$dirty) return errors
        !this.$v.mail.email && errors.push('Must be valid E-mail.')
        !this.$v.mail.required && errors.push('E-mail is required.')
        return errors
      },
      identityErrors: function() {
        const errors = []
        if(!this.$v.identity.$dirty) return errors
        !this.$v.identity.minLength && errors.push('Identity must have at least 13 characters.')
        !this.$v.identity.maxLength && errors.push('Identity must be at most 13 characters long.')
        !this.$v.identity.required && errors.push('Identity is required.')
        return errors
      },
      phoneErrors: function() {
        const errors = []
        if(!this.$v.phone.$dirty) return errors
        !this.$v.phone.minLength && errors.push('Phone must have at least 8 characters.')
        !this.$v.phone.maxLength && errors.push('Phone must be at most 8 characters long.')
        !this.$v.phone.required && errors.push('Phone is required.')
        return errors
      },
      passwordErrors: function() {
        const errors = []
        if(!this.$v.password.$dirty) return errors
        !this.$v.password.minLength && errors.push('Password must have at least 5 characters.')
        !this.$v.password.required && errors.push('Password is required.')
        return errors
      },
      passwordConfirmationErrors: function() {
        const errors = []
        if(!this.$v.passwordConfirmation.$dirty) return errors
        !this.$v.passwordConfirmation.sameAsPassword && errors.push('Passwords must be identical.')
        return errors
      }
    },
    methods: {
      async register() {
        this.$v.$touch()
        if(!this.$v.$invalid) {
          console.log('paso')
          try {
            const { data, headers } = await this.$axios({
              method: 'post',
              url: 'http://localhost:3000/api/users',
              data: {
                name: this.name,
                mail: this.mail,
                identity: this.identity,
                phone: this.phone,
                password: this.password
              },
              headers: {
                'Content-Type': 'application/json; charset=utf-8'
              }
            })
            this.type = 'success'
            this.alert.message = 'You are new user.'
            this.show = true
            this.$store.commit('setToken', headers['x-auth-token'])
            this.$store.commit('setData', data)
            this.$store.commit('setAuthentication', data.authentication)
            this.$router.push('/central')
          } catch (ex) {
            this.type = 'error'
            this.alert.message = ex.response.data.errorMessage
            this.show = true
            this.password = ''
            this.passwordConfirmation = ''
          }
        }
      }
    }
  }
</script>
