<template>
  <v-card
    width="420"
    :height="meterSize + 18"
    class="pa-2 my-2 settingsCard"
  >
    <div class="d-flex flex-no-wrap align-center h-100">
      <div>
        <v-progress-circular
          color="primary"
          v-model="percentTimeElapsed"
          :size="meterSize"
          :width="meterStroke"
        >
          <div class="d-flex flex-column align-center">
            <div class="wordsMeterNumber">{{ timerString }}</div>
            <div class="wordsMeterLabel">Remaining</div>
          </div>
        </v-progress-circular>
      </div>
    
      <div class="w-100">
        <v-card-title>Time: </v-card-title>
        <v-card-subtitle>length of sprint in minutes</v-card-subtitle>
        <v-card-text
          
        >
          <v-slider
            min="0"
            max="120"
            thumb-label
            step="1"
            class="align-start"
            v-model="sprintTimeInMinutes"
          >
            <template v-slot:append>
              <v-text-field
                type="number"
                density="compact"
                variant="outlined"
                hide-details
                style="width: 6rem"
                v-model="sprintTimeInMinutes"
              />
            </template>
          </v-slider>
        </v-card-text>
      </div>
    </div>
  </v-card>
</template>

<script setup>
  import { formatTimer } from "../Utility.js"
  import { computed, defineProps, defineEmits } from "vue"

  const props = defineProps({
    sprintLengthInSeconds: Number,
    timeElapsed: Number,
    meterSize: Number,
    meterStroke: Number,
  })

  const emit = defineEmits([
    'timeChanged',
  ])

  const timerString = computed({
    get() {
      const timerSeconds = props.sprintLengthInSeconds - props.timeElapsed
      return formatTimer(timerSeconds)
    }
  })

  const sprintTimeInMinutes = computed({
    get() {
      return Math.floor(props.sprintLengthInSeconds / 60)
    },
    set(newValue) {
      emit("timeChanged", newValue * 60)
    }
  })

  const percentTimeElapsed = computed({
    get() {
      return (props.timeElapsed / props.sprintLengthInSeconds)  *100
    }
  })
</script>