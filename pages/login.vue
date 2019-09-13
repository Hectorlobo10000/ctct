<template>
  <Login source="Auth"/>
</template>

<script>
import Login from  '~/components/Login.vue'

export default {
  middleware: 'notAuthenticated',
  layout: 'authentication',
  components: {
    Login
  }
}
</script>
