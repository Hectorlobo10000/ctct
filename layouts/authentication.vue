<template>
  <v-app dark>
    <v-app-bar
      fixed
      app
    >
      <v-btn
        icon
        @click="navigateTo()"
      >
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"/>
    </v-app-bar>
    <v-content class="pt-0">
      <v-container
        fluid
        fill-height
      >
        <v-layout
          align-center
          justify-center
        >
          <v-container>
            <nuxt/>
          </v-container>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      title: 'CTCT',
      
    }),
    methods: {
      navigateTo: function() {
        this.$router.push('/')
      }
    }
  }
</script>
