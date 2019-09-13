<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          v-for="(guest) in guests"
          :key="guest.title"
          :to="guest.to"
          router
          exact
          v-show="!authentication"
        >
          <v-list-item-action>
            <v-icon>{{ guest.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="guest.title" />
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-show="authentication" @click="logoutUser()">
          <v-list-item-action>
            <v-icon>{{ logout.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="logout.text" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      :fixed="fixed"
      app
    >
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
  const Cookie = process.client ? require('js-cookie') : undefined
  export default {
    data () {
      return {
        clipped: false,
        drawer: false,
        fixed: false,
        items: [
          /* {
            icon: 'mdi-apps',
            title: 'Welcome',
            to: '/'
          }, */
          {
            icon: 'mdi-chart-bubble',
            title: 'Inspire',
            to: '/inspire',
          },
          {
            icon: 'mdi-bus-clock',
            title: 'Central',
            to: '/central',
          }
        ],
        guests: [
          {
            icon: 'mdi-account',
            title: 'Login',
            to: '/login',
          },
          {
            icon: 'mdi-account-card-details',
            title: 'Register',
            to: '/register',
          }
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'CTCT',
        logout: {
          text: 'Log out',
          icon: 'mdi-account-arrow-left-outline'
        }
      }
    },
    computed: {
      authentication: function() {
        return this.$store.state.token ? true : false
      }
    },
    methods: {
      logoutUser: function() {
        Cookie.remove('authentication')
        this.$store.commit('setData', {})
        this.$store.commit('setToken', '')
        /* this.$store.commit('setAuthentication', '') */
        this.$router.push('/login')
      }
    }
  }
</script>
