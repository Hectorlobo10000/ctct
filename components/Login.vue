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
                  label="E-mail"
                  name="mail"
                  prepend-icon="mdi-account"
                  type="text"
                  required
                  v-model.trim="mail"
                  @input="$v.mail.$touch()"
                  @blur="$v.mail.$touch()"
                  :error-messages="mailErrors"
                ></v-text-field>

                <v-text-field
                  id="Password"
                  label="Password"
                  name="password"
                  prepend-icon="mdi-lock"
                  type="password"
                  required
                  v-model.trim="password"
                  @input="$v.password.$touch()"
                  @blur="$v.password.$touch()"
                  :error-messages="passwordErrors"
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
              <v-btn color="primary" @click="login()">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
  const Cookie =  process.client ? require('js-cookie') : undefined
  import { required, minLength, email } from 'vuelidate/lib/validators'
  import { mapState } from 'vuex'
  export default {
    props: {
      source: String,
    },
    data: () => ({
      mail: '',
      password: '',
      type: 'success',
      show: false,
      dismissible: false,
      alert: {
        message: ''
      }
    }),
    validations: {
      mail: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(5)
      }
    },
    computed: {
      mailErrors: function() {
        const errors = []
        if(!this.$v.mail.$dirty) return errors
        !this.$v.mail.email && errors.push('Must be valid E-mail.')
        !this.$v.mail.required && errors.push('E-mail is required.')
        return errors
      },
      passwordErrors: function() {
        const errors = []
        if(!this.$v.password.$dirty) return errors
        !this.$v.password.minLength && errors.push('Password must have at least 5 characters.')
        !this.$v.password.required && errors.push('Password is required.')
        return errors
      }
    },
    methods: {
      async login() {
        this.$v.$touch()
        if(!this.$v.$invalid) {
          try {
            const { data, headers } = await this.$axios({
              method: 'post',
              url: 'http://localhost:3000/api/authentication',
              data: {
                mail: this.mail,
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
/*             this.$store.commit('setAuthentication', data.authentication) */
            Cookie.set('authentication', headers['x-auth-token'])
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