<template>
  <v-card
    class="my-2 brandingCard"
  >

    <!-- <v-img
      src="/sprinter-logo.svg"
      :width="meterSize"
      :height="meterSize"
      
    /> -->
    <v-card-text
    >
      <SprinterLogo 
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
        {{ wordsRemaining }}
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
            
            v-model="wordCountGoal"
          >
            <template v-slot:append>
              <v-text-field
                type="number"
                density="compact"
                variant="outlined"
                hide-details
                style="width: 6rem"
                @change:wordCountGoal="$emit('update:wordCountGoal', $event.target.value)"
                v-model="wordCountGoal"
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
          {{ sprintTimeInMinutes }}
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

</template>

<script setup>
// import { watch } from 'fs';
import { defineProps, computed, defineEmits } from 'vue'

import SprinterLogo from "../assets/SprinterLogo.vue"

const props = defineProps({
  wordCountGoal: {
    type: Number,
    default: 0,
    required: true
  },
  wordsWritten: Number,
  sprintTimeInSeconds: Number,
  timeElapsed: Number,
})

const emit = defineEmits(['timeChanged'])

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
const meterSize = 100
const meterStroke = 16
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

const timeRemaining = computed({
  get() {
    return props.sprintTimeInSeconds - props.timeElapsed
  }
})

const percentTimeElapsed = computed({
  get() {
    return (props.timeElapsed / props.sprintTimeInSeconds)  *100
  }
})

</script>