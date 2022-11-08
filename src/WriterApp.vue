<template>
 <v-app id="inspire">
    <v-navigation-drawer
      class="pt-4"
      color="grey-lighten-3"
      expand-on-hover
      rail
      permanent
      width="max-content"
      rail-width="124"
    >

        <SprintStatusRail 
          v-model:wordCountGoal="wordCountGoal" 
          :wordsWritten="wordsWritten"
          @goalChanged="onGoalChanged"
          v-model:sprintTimeInSeconds="sprintTimeInSeconds"
          :timeElapsed="timeElapsed"
          :sprintIsRunning="sprintIsRunning"
          :sprintIsPaused="sprintIsPaused"
          @timeChanged="onTimeChanged"
          @beginSprint="beginSprint"
          @endSprint="endSprint"
          @pauseSprint="pauseSprint"
          @unpauseSprint="unpauseSprint"
        />


    </v-navigation-drawer>

    <v-main>
      <WriterWindow 
        v-model:writerText="writerText"
        @writerTextChanged="writerTextChanged"
        :sprintIsRunning="sprintIsRunning"
        @beginSprint="beginSprint"
      />
    </v-main>
  </v-app>
</template>

<script setup>
  import { ref } from 'vue'

  import WriterWindow from './components/WriterWindow.vue'
  import SprintStatusRail from './components/SprintStatusRail.vue'

  const wordCountGoal = ref(500)
  const wordsWritten = ref(0)
  const writerText = ref("")
  const sprintTimeInSeconds = ref(60*15)
  const timeElapsed = ref(0)
  const sprintIsRunning = ref(false)
  const sprintIsPaused = ref(false)
  const sprintTimer = ref(null)

  // watch(doBeginSprint, beginSprint)
  // watch(doEndSprint, endSprint)
  // watch(doPauseSprint, pauseSprint)
  // watch(doUnpauseSprint, unpauseSprint)

  function beginSprint() {
    sprintIsRunning.value = true
    sprintIsPaused.value = false
    sprintTimer.value = setInterval(timerDidTick, 1000)
  }
  
  function endSprint() {
    sprintIsRunning.value = false
    sprintIsPaused.value = false
    clearInterval(sprintTimer.value)
    timeElapsed.value = 0
  }

  function pauseSprint() {
    sprintIsPaused.value = true
    clearInterval(sprintTimer.value)
  }

  function unpauseSprint() {
    sprintIsPaused.value = false
    sprintTimer.value = setInterval(timerDidTick, 1000)
  }

  // watch(writerText, writerTextChanged)
  // watch(wordCountGoal, wordCountGoalChanged)
  // watch(sprintTimeInSeconds, sprintTimeInSecondsChanged)

  // // setInterval(timerDidTick, 1000)

  function timerDidTick() {
    timeElapsed.value++
  }

  function writerTextChanged(text) {
    const currentWordCount = text.split(" ").length - 1
    console.log("text changed", text)
    if(currentWordCount.value !== wordsWritten.value) {
      wordsWritten.value = currentWordCount
    }
  }

  function onTimeChanged(newValue) {
    console.log("time changed", newValue)
    sprintTimeInSeconds.value = newValue
  }

  function onGoalChanged(newValue) {
    console.log("goal changed", newValue)
    wordCountGoal.value = newValue
  }


</script>
