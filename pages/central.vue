<template>
  <Central :source="this.$store.state.data" />
</template>

<script>
import Central from '~/components/Central.vue'

export default {
  middleware: 'authenticated',
  components: {
    Central
  },
  data: () => ({
    //
  }),
  async fetch({ store, params, app: {$axios} }) {
    try {
      const { data } = await $axios({
        method: 'get',
        url: 'http://localhost:3000/api/companies',
        headers: {
          'Content-Type': 'application/json: charset=utf-8',
          'x-auth-token': store.state.token
        }
      })
      store.commit('setData', data)
    } catch(ex) {
      console.log(ex)
    }
  }
}
</script>

