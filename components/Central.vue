<template>
  <v-container fluid>
    <v-layout column>
      <v-flex xs12>
        <v-layout align-center justify-center row fill-height>
          <!-- <v-card
            class="mx-auto mt-5"
            :flat="flat"
            :loading="loading"
            :outlined="outlined"
            :elevation="elevation"
            :raised="raised"
            :width="width"
            :height="height"
            v-for="(item, i) in source"
            :key="i"
          >
            <v-img
              v-if="media"
              class="white--text"
              height="200px"
              src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            >
              <v-card-title class="align-end fill-height">{{ item.name }}</v-card-title>
            </v-img>
            <v-card-title v-else>I'm a title</v-card-title>

            <v-card-text>I'm card text</v-card-text>
            <v-card-actions v-if="actions">
              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>
              <v-btn text>Click</v-btn>
              <v-btn outlined>Click</v-btn>
            </v-card-actions>
          </v-card> -->
          <v-card
            :loading="loading"
            class="mx-auto my-12"
            max-width="374"
            light
            v-for="(company, i) in source.companies"
            :key="i"
          >
            <v-img
              height="250"
              src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
            ></v-img>

            <v-card-title>{{ company.name }}</v-card-title>
            <v-card-text>
              <v-layout align-center>
                <v-rating
                  :value="4.5"
                  color="amber"
                  half-increments
                  dense
                  size="14"
                  readonly
                ></v-rating>

                <div class="grey--text ml-4">4.5 (413)</div>
              </v-layout>

              <div class="my-4 subtitle-1 black--text">
                $ • Transport
              </div>
              <div>{{ company.address }}</div>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>

            <v-card-text>
              <div class="title black--text">Routes</div>
              <v-chip-group
                column
              >
                <v-chip
                  v-for="route in company.routes"
                  :key="route.id"
                >
                  {{ route.name }}
                </v-chip>
              </v-chip-group>
              <div class="title black--text">Availability</div>
              <div>Monday - Sunday</div>
              <v-chip-group
                column
              >
                <v-chip
                v-for="schedule in source.schedules"
                :key="schedule.id"
                >
                  {{ schedule.hour }}
                </v-chip>
              </v-chip-group>
            </v-card-text>

            <v-card-actions>
              <v-btn
                color="deep-purple accent-4"
                text
                @click="reserve(company)"
              >
                Reserve
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: {
    source: Object
  },
  data: () => ({
    flat: false,
    media: true,
    loading: false,
    actions: true,
    outlined: false,
    elevation: undefined,
    raised: false,
    width: 344,
    height: undefined,
    loading: false,
    selectionSchedule: 0,
    selectionRoute: 0
  }),
  methods: {
    reserve(company) {
      const reservation = {
        company,
        schedules: this.source.schedules
      }
      this.$store.commit('setReservation', reservation)
      this.navigateTo()
    },
    navigateTo() {
      this.$router.push('/reservation')
    }
  }
}
</script>

