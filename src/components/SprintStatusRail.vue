<template>
  <div>
  <v-card
    class="my-2 brandingCard"
  >
    <v-card-text>
      <SprinterLogoTrimmed 
        :width="logoSize"
        :height="logoSize"
        :class="'ms-'+logoPos"
      />
      <h3 
        :class="'appName ms-'+namePos"
      >Sprinter</h3>
    </v-card-text>
  </v-card>
  <v-card
    width="420"
    :height="meterSize + 18"
    class="pa-2 my-2 settingsCard"
  >
    <div class="d-flex flex-no-wrap">
      <div>
        <v-progress-circular
          color="primary"
          v-model="percentWordsWritten"
          :size="meterSize"
          :width="meterStroke"
        >
          <div class="d-flex flex-column align-center">
            <div class="wordsMeterNumber">{{ wordsRemaining }}</div>
            <div class="wordsMeterLabel">Words Left</div>
          </div>
        </v-progress-circular>
      </div>
      <div class="w-100">
        <v-card-title>Goal: <span class="text-subtitle-1">(words to write)</span></v-card-title>
        <v-card-text
          
        >
          <v-slider
            min="0"
            max="2000"
            thumb-label
            show-ticks="always"
            step="100"
            class="align-start"
            
            v-model="wordsGoal"
          >
            <template v-slot:append>
              <v-text-field
                type="number"
                density="compact"
                variant="outlined"
                hide-details
                style="width: 6rem"
                @change:wordCountGoal="$emit('update:wordCountGoal', $event.target.value)"
                v-model="wordsGoal"
              />
            </template>
          </v-slider>
        </v-card-text>
      </div>
    </div>
  </v-card>
  <v-card
    width="420"
    :height="meterSize + 18"
    class="pa-2 my-2 settingsCard"
  >
    <div class="d-flex flex-no-wrap">
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
      <v-card-title>Time: <span class="text-subtitle-1">(length of sprint)</span></v-card-title>
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
  <div class="d-flex flex-no-wrap">
    <v-btn 
      :prepend-icon="'fa-solid fa-'+(props.sprintIsPaused || !props.sprintIsRunning ? 'play' : 'pause')"
      color="primary"
      class="mx-2"
      rounded="pill"
      @click="handleButtonClick"
    >
    {{ props.sprintIsPaused || !props.sprintIsRunning ? 'Start' : 'Pause' }}
    </v-btn>
    <v-btn 
      prepend-icon="fa-solid fa-stop"
      color="primary"
      class="mx-2"
      rounded="pill"
      @click="$emit('endSprint')"
    >
    End Sprint
    </v-btn>
  </div>
</div>
</template>

<script setup>
import { defineProps, computed, defineEmits } from 'vue'

import SprinterLogoTrimmed from "../assets/SprinterLogoTrimmed.vue"
import { formatTimer } from "../Utility.js"

const props = defineProps({
  wordCountGoal: {
    type: Number,
    default: 0,
    required: true
  },
  wordsWritten: Number,
  sprintTimeInSeconds: Number,
  timeElapsed: Number,
  sprintIsRunning: Boolean,
  sprintIsPaused: Boolean,
})

const emit = defineEmits([
  "beginSprint",
  "endSprint",
  "pauseSprint",
  "unPauseSprint",
  "timeChanged",
  "goalChanged",
])

const wordsGoal = computed({ 
  get() {
    return props.wordCountGoal
  },
  set(newValue) {
    emit("goalChanged", newValue)
  } 

})

const timerString = computed({
  get() {
    const timerSeconds = props.sprintTimeInSeconds - props.timeElapsed
    return formatTimer(timerSeconds)
  }
})


const sprintTimeInMinutes = computed({
  get() {
    return Math.floor(props.sprintTimeInSeconds / 60)
  },
  set(newValue) {
    console.log("newValue", newValue)
    emit("timeChanged", newValue * 60)
  }
})

// TODO: calculate these based on breakpoints
const meterSize = 106
const meterStroke = 18
const logoSize = meterSize / 2
const logoPos = Math.floor((((meterSize - logoSize) / 2) ) /4)
const namePos = Math.floor(logoPos/2)

const wordsRemaining = computed({
  get() {
    return props.wordCountGoal - props.wordsWritten
  }
})

const percentWordsWritten = computed({
  get() {
    return (props.wordsWritten / props.wordCountGoal) *100
  }
})

function handleButtonClick() {
  if(props.sprintIsRunning && props.sprintIsPaused) {
    emit("unpauseSprint")
  } else if(props.sprintIsRunning && !props.sprintIsPaused) {
    emit("pauseSprint")
  } else if(!props.sprintIsRunning) {
    emit("beginSprint")
  }
}

const percentTimeElapsed = computed({
  get() {
    return (props.timeElapsed / props.sprintTimeInSeconds)  *100
  }
})

</script>