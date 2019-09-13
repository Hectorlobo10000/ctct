<template>
  <Register :source="title"/>
</template>

<script>
import Register from  '~/components/Register.vue'

export default {
  middleware: 'notAuthenticated',
  layout: 'authentication',
  components: {
    Register
  },
  data: () => ({
    title: 'Register'
  })
}
</script>
