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
        <v-card-title>Goal:</v-card-title>
        <v-card-subtitle>words to write</v-card-subtitle>
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
                v-model="wordsGoal"
              />
            </template>
          </v-slider>
        </v-card-text>
      </div>
    </div>
  </v-card>
</template>

<script setup>
import { defineEmits, defineProps, computed } from 'vue';

const props = defineProps({
  wordCountGoal: Number,
  wordsWritten: Number,
  meterSize: Number,
  meterStroke: Number,
})

const emit = defineEmits([
  'goalChanged'
])

const wordsGoal = computed({ 
  get() {
    return props.wordCountGoal
  },
  set(newValue) {
    emit("goalChanged", parseInt(newValue))
  } 
})

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
</script>