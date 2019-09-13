<template>
  <!-- <v-container
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
        <v-item-group
          :multiple="true"
        >
          <v-container>
            <v-row>
              <v-col
                v-for="column in chairsColumn"
                :key="column.id"
                cols="12"
                md="3"
              >
                <v-item 
                  v-for="chair in column.items"
                  :key="chair.id"
                >
                  <v-card
                    :color="chair.isActive ? 'primary' : ''"
                    class="d-flex align-center mb-2"
                    dark
                    height="100px"
                    @click="toggle(chair)"
                  >
                    <v-card-text>
                      <v-icon x-large>mdi-seat</v-icon>
                      <span>{{ chair.id }}</span>
                    </v-card-text>
                    <v-scroll-y-transition>
                      <div
                        v-if="chair.isActive"
                        class="display-2 flex-grow-1 text-center"
                      >
                      </div>
                    </v-scroll-y-transition>
                  </v-card>
                </v-item>
              </v-col>
            </v-row>
          </v-container>
        </v-item-group>
      </v-flex>
    </v-layout>
  </v-container> -->
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
        <v-item-group
          :multiple="true"
        >
          <v-container>
            <v-row>
              <v-col
                v-for="(chair, i) in chairs"
                :key="i"
                cols="12"
                md="3"
              >
                <v-item>
                  <v-card
                    :color="chair.isActive ? 'primary' : ''"
                    class="d-flex align-center mb-2"
                    dark
                    height="100px"
                    @click="toggle(chair)"
                  >
                    <v-card-text>
                      <v-icon x-large>mdi-seat</v-icon>
                      <span>{{ chair.chair }}</span>
                    </v-card-text>
                    <v-scroll-y-transition>
                      <div
                        v-if="chair.isActive"
                        class="display-2 flex-grow-1 text-center"
                      >
                      </div>
                    </v-scroll-y-transition>
                  </v-card>
                </v-item>
              </v-col>
            </v-row>
          </v-container>
        </v-item-group>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    /* chairsColumn: [
      {
        id: 'RW',
        items: [
          { id: 'RW-15', isActive: true, reserved: true },
          { id: 'RW-13', isActive: true, reserved: false },
          { id: 'RW-11', isActive: true, reserved: false },
          { id: 'RW-9', isActive: true, reserved: false },
          { id: 'RW-7', isActive: true, reserved: false },
          { id: 'RW-5', isActive: true, reserved: false },
          { id: 'RW-3', isActive: true, reserved: false },
          { id: 'RW-1', isActive: true, reserved: false }
        ]
      },
      {
        id: 'RH',
        items: [
          { id: 'RH-16', isActive: true, reserved: false },
          { id: 'RH-14', isActive: true, reserved: false },
          { id: 'RH-12', isActive: true, reserved: false },
          { id: 'RH-10', isActive: true, reserved: false },
          { id: 'RH-8', isActive: true, reserved: false },
          { id: 'RH-6', isActive: true, reserved: false },
          { id: 'RH-4', isActive: true, reserved: false },
          { id: 'RH-2', isActive: true, reserved: false }
        ]
      },
      {
        id: 'LH',
        items: [
          { id: 'LH-31', isActive: true, reserved: false },
          { id: 'LH-29', isActive: true, reserved: false },
          { id: 'LH-27', isActive: true, reserved: false },
          { id: 'LH-25', isActive: true, reserved: false },
          { id: 'LH-23', isActive: true, reserved: false },
          { id: 'LH-21', isActive: true, reserved: false },
          { id: 'LH-19', isActive: true, reserved: false },
          { id: 'LH-17', isActive: true, reserved: false }
        ]
      },
      {
        id: 'LW',
        items: [
          { id: 'LW-32', isActive: true, reserved: false },
          { id: 'LW-30', isActive: true, reserved: false },
          { id: 'LW-28', isActive: true, reserved: false },
          { id: 'LW-26', isActive: true, reserved: false },
          { id: 'LW-24', isActive: true, reserved: false },
          { id: 'LW-22', isActive: true, reserved: false },
          { id: 'LW-20', isActive: true, reserved: false },
          { id: 'LW-18', isActive: true, reserved: false }
        ]
      }
    ] */
    chairs: [
      { chair: 'RW-15', isActive: true, reserved: true},
      { chair: 'RH-16', isActive: true, reserved: false},
      { chair: 'LH-31', isActive: true, reserved: false},
      { chair: 'LW-32', isActive: true, reserved: false},
      { chair: 'RW-13', isActive: true, reserved: false},
      { chair: 'RH-14', isActive: true, reserved: false},
      { chair: 'LH-29', isActive: true, reserved: false},
      { chair: 'LW-30', isActive: true, reserved: false},
      { chair: 'RW-11', isActive: true, reserved: false},
      { chair: 'RH-12', isActive: true, reserved: false},
      { chair: 'LH-27', isActive: true, reserved: false},
      { chair: 'LW-28', isActive: true, reserved: false},
      { chair: 'RW-9', isActive: true, reserved: false},
      { chair: 'RH-10', isActive: true, reserved: false},
      { chair: 'LH-25', isActive: true, reserved: false},
      { chair: 'LW-26', isActive: true, reserved: false},
      { chair: 'RW-7', isActive: true, reserved: false},
      { chair: 'RH-8', isActive: true, reserved: false},
      { chair: 'LH-23', isActive: true, reserved: false},
      { chair: 'LW-24', isActive: true, reserved: false},
      { chair: 'RW-5', isActive: true, reserved: false},
      { chair: 'RH-6', isActive: true, reserved: false},
      { chair: 'LH-21', isActive: true, reserved: false},
      { chair: 'LW-22', isActive: true, reserved: false},
      { chair: 'RW-3', isActive: true, reserved: false},
      { chair: 'RH-4', isActive: true, reserved: false},
      { chair: 'LH-19', isActive: true, reserved: false},
      { chair: 'LW-20', isActive: true, reserved: false},
      { chair: 'RW-1', isActive: true, reserved: false},
      { chair: 'RH-2', isActive: true, reserved: false},
      { chair: 'LH-17', isActive: true, reserved: false},
      { chair: 'LW-18', isActive: true, reserved: false}
    ]
  }),
  methods: {
    toggle: function(chair) {
      if(!chair.reserved)
        chair.isActive = !chair.isActive
    }
  }
}
</script>