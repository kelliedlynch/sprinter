<template>
  <v-col>
    <v-list>
      <v-list-item>
        <v-slider
          min="0"
          max="2000"
          show-ticks="true"
          step="100"
        />
      </v-list-item>
      <v-list-item>  

      </v-list-item>
    </v-list>
  </v-col>
</template>
  
<script setup>
  import { defineProps, computed } from 'vue';
  
  const props = defineProps({
    wordCountGoal: Number,
    wordsWritten: Number,
    sprintTimeInSeconds: Number,
    timeElapsed: Number,
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