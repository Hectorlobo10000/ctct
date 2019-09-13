<template>
  <div class="mt-5">
    {{ getData }}
  </div>
</template>

<script>
import axios from 'axios'

export default {
  computed: {
    getData() {
      return this.$store.state.data
    }
  },
  async fetch({ store, params }) {
    let { data } = await axios.get('http://localhost:3000/api/users/hector')
    console.log(data)
    store.commit('setData', data)
  }
}
</script>

