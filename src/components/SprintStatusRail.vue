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
  
  <WordsGoalMeter 
    :wordsWritten="props.wordsWritten"
    :meterSize="meterSize"
    :meterStroke="meterStroke"
    @goalChanged="$emit('goalChanged', $event)"
  />

  <SprintTimerMeter
    :timeElapsed="props.timeElapsed"
    :meterSize="meterSize"
    :meterStroke="meterStroke"
  />

  <ConsequencesMeter
    :meterSize="meterSize"
  />

  <div class="d-flex flex-no-wrap mt-4">
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
import { defineProps, defineEmits } from 'vue'

import SprinterLogoTrimmed from "../assets/SprinterLogoTrimmed.vue"
import WordsGoalMeter from './WordsGoalMeter.vue'
import SprintTimerMeter from './SprintTimerMeter.vue'
import ConsequencesMeter from './ConsequencesMeter.vue'

const props = defineProps({
  wordsWritten: Number,
  timeElapsed: Number,
  sprintIsRunning: Boolean,
  sprintIsPaused: Boolean,
})

const emit = defineEmits([
  "didClickStartButton",
  "endSprint",
  "pauseSprint",
  "unpauseSprint",
])

// TODO: calculate these based on breakpoints
const meterSize = 106
const meterStroke = 18
const logoSize = meterSize / 2
const logoPos = Math.floor((((meterSize - logoSize) / 2) ) /4)
const namePos = Math.floor(logoPos/2)

function handleButtonClick() {
  if(props.sprintIsRunning && props.sprintIsPaused) {
    emit("unpauseSprint")
  } else if(props.sprintIsRunning && !props.sprintIsPaused) {
    emit("pauseSprint")
  } else if(!props.sprintIsRunning) {
    emit("didClickStartButton")
  }
}



</script>