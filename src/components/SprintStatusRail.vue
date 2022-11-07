<template>
  <v-card
    class="text-center pa-2"
  >
    <v-spacer />
    <v-img
      src="/sprinter-logo.svg"
      :width="meterSize"
      :height="meterSize"
      
    />
    <v-spacer />
  </v-card>
  <v-card
    width="420"
    :height="meterSize + 18"
    class="pa-2"
  >

          <v-progress-circular
            color="primary"
            v-model="percentWordsWritten"
            :size="meterSize"
            :width="8"
          >
            {{ wordsRemaining }}
          </v-progress-circular>
  </v-card>
  <v-card
    width="420"
    :height="meterSize + 18"
    class="pa-2"
  >
          <v-progress-circular
            color="primary"
            v-model="percentTimeElapsed"
            :size="meterSize"
            :width="8"
          >
            {{ timeRemaining }}
          </v-progress-circular>
    </v-card>

</template>

<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
  wordCountGoal: Number,
  wordsWritten: Number,
  sprintTimeInSeconds: Number,
  timeElapsed: Number,
})

// TODO: calculate these based on breakpoints
const meterSize = 100

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