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
        xs8
        sm8
        md8
      >
        <v-card
            :loading="loading"
            class="mx-auto my-12"
            max-width="374"
            light
          >
            <v-img
              height="250"
              src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
            ></v-img>

            <v-card-title>{{ source.company.name }}</v-card-title>
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
              <div class="grey--text text--darken-2">{{ source.company.address }}</div>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>

            <v-card-text>
              <!-- routes -->
              <div class="title black--text">Routes</div>
              <v-chip-group
                active-class="deep-purple accent-4 white--text"
                column
              >
                <v-chip
                  v-for="(route, i) in source.company.routes"
                  :key="i"
                  @click="selectRoute(i)"
                >
                  {{ route.name }}
                </v-chip>
              </v-chip-group>
              <!-- dates -->
              <div class="title black--text">Date</div>
              <v-chip-group
                active-class="deep-purple accent-4 white--text"
                column
              >
                <v-chip
                  v-for="(newDay, i) in newDays"
                  :key="i"
                  @click="changeHours(i)"
                >
                  {{ newDay.date.format('LL') }}
                </v-chip>
              </v-chip-group>
              <!-- Availability -->
              <div class="title black--text">Availability</div>
              <div class="grey--text text--darken-2">Monday - Sunday</div>
              <v-chip-group
                active-class="deep-purple accent-4 white--text"
                column
              >
                <v-chip
                v-for="(schedule, i) in hours"
                :key="i"
                @click="selectHour(i)"
                >
                  {{ schedule.hour }}
                </v-chip>
              </v-chip-group>
            </v-card-text>

            <v-card-actions>
              <!-- <v-btn
                color="deep-purple accent-4"
                text
                @click="reserve(company)"
              >
                Reserve
              </v-btn> -->
            </v-card-actions>
          </v-card>
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
    hours: [],
    days: [
      { date: null },
      { date: null }
    ],
    newDays: [],
    dataRequest: {}
  }),
  mounted() {
    this.hoursAvailable()
    this.dates()
  },
  methods: {
    hoursAvailable: function() {
      const currentHour = this.$moment().hours()
      const currentMinutes = this.$moment().minutes()
      let minutesFirstHour = true

      this.hours = this.source.schedules.reduce((acc, currentValue) => {
        const hour = this.$moment.duration(currentValue.hour).hours() > currentHour ? true : false 
        const minutes = currentMinutes >= 15 ? true : false 
        if(hour) {
          if(minutes && minutesFirstHour) {
            minutesFirstHour = !minutesFirstHour
            acc.push(currentValue)
          }else {
            acc.push(currentValue)
          }
        } else if(currentHour >= 18 || this.$moment.duration(currentValue.hour) <= 5) {
          acc.push(currentValue)
        }
        return acc
      }, [])
    },
    dates: function() {
      const currentHour = this.$moment().hours()
      const currentMinutes = this.$moment().minutes()
      let days = 0
      let nextDays = 0
      this.newDays = this.days.reduce((acc, currentValue) => {
        if(currentHour >= 18) {
          days++
          currentValue.date = this.$moment().add(days, 'days')
          acc.push(currentValue)
        } else if(currentHour <= 17) {
          currentValue.date = this.$moment().add(nextDays, 'days')
          nextDays++
          acc.push(currentValue)
        }
        return acc
      }, [])
    },
    nextDayHours() {
      this.hours = this.source.schedules
    },
    changeHours: function(selection) {
      if(selection == 0) {
        this.hoursAvailable()
      } else {
        this.nextDayHours()
      }
      this.selectDate(selection)
    },
    selectRoute: function(index) {
      this.dataRequest.routeId = this.source.company.routes[index].id
      this.saveDataRequest()
    },
    selectDate: function(index) {
      this.dataRequest.dateOut = this.newDays[index].date.format('YYYY-MM-DD')
      this.saveDataRequest()
    },
    selectHour: function(index) {
      this.dataRequest.scheduleId = this.hours[index].id
      this.saveDataRequest()
    },
    saveDataRequest: function() {
      this.$store.commit('setDataRequestReservation', this.dataRequest)
    }
  }
}
</script>

<style>

</style>