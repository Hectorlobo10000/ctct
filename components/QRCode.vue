<template>
  <v-container
    fluid
    fill-height
  >
    <v-layout
      align-center
      justify-center
    >
      <v-flex
        xs6
        sm6
        md6
      >
        <v-card>
          <v-card-title>Token</v-card-title>
          <v-card-text>
            <QRCode :value="value" :size="size" level="H"/>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import QRCode from 'qrcode.vue'
export default {
  components: {
    QRCode
  },
  data: () => ({
    value: 'https://example.com',
    size: 200
  })
}
</script>

<style>

</style>