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
        xs12
        sm8
        md8
      >
        <v-stepper v-model="e1" :alt-labels="false">
          <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" step="1">Name of step 1</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 1" step="2">Name of step 2</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 2" step="3">Name of step 3</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="3">Name of step 4</v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <v-card
                class="mb-12"
                color="grey lighten-1"
              >
                <v-card-text>
                  <RouteAndSchedule :source="this.$store.state.reservation" />
                </v-card-text>
              </v-card>

              <v-btn
                color="primary"
                @click="e1 = 2"
              >
                Continue
              </v-btn>

              <v-btn text>Cancel</v-btn>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-card
                class="mb-12"
                color="grey lighten-1"
              >
                <v-card-text>
                  <Chairs />
                </v-card-text>
              </v-card>

              <v-btn
                color="primary"
                @click="e1 = 3"
              >
                Continue
              </v-btn>

              <v-btn text>Cancel</v-btn>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-card
                class="mb-12"
                color="grey lighten-1"
              >
                <v-card-text>
                  <Billing />
                </v-card-text>
              </v-card>

              <v-btn
                color="primary"
                @click="e1 = 4"
              >
                Continue
              </v-btn>

              <v-btn text>Cancel</v-btn>
            </v-stepper-content>

            <v-stepper-content step="4">
              <v-card
                class="mb-12"
                color="grey lighten-1"
              >
                <v-card-text>
                  <QRCode />
                </v-card-text>
              </v-card>

              <v-btn
                color="primary"
                @click="e1 = 1"
              >
                Continue
              </v-btn>

              <v-btn text>Cancel</v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import RouteAndSchedule from '~/components/RouteAndSchedule'
import Chairs from '~/components/Chairs'
import Billing from '~/components/Billing'
import QRCode from '~/components/QRCode'
export default {
  components: {
    RouteAndSchedule,
    Chairs,
    Billing,
    QRCode
  },
  data: () => ({
    e1: 0
  })
}
</script>

<style>

</style>