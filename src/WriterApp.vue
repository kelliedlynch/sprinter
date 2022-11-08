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
          v-model:sprintLengthInSeconds="sprintLengthInSeconds"
          :timeElapsed="timeElapsed"
          :sprintIsRunning="sprintIsRunning"
          :sprintIsPaused="sprintIsPaused"
          @timeChanged="onTimeChanged"
          @beginSprint="beginSprint"
          @endSprint="endSprint"
          @pauseSprint="pauseSprint"
          @unpauseSprint="unpauseSprint"
          v-model:consequencesAreOn="consequencesAreOn"
          :consequencesAreOn="consequencesAreOn"
          @toggleConsequencesAreOn="toggleConsequencesAreOn"
          :gracePeriod="gracePeriod"
          @gracePeriodChanged="gracePeriodChanged"
        />


    </v-navigation-drawer>

    <v-main>
      <WriterWindow 
        v-model:writerText="writerText"
        @writerTextChanged="writerTextChanged"
        :sprintIsRunning="sprintIsRunning"
        @beginSprint="beginSprint"
        :sprintIsPunishing="sprintIsPunishing"
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
  const sprintLengthInSeconds = ref(60*15)
  const timeElapsed = ref(0)
  const secondsIdle = ref(0)
  const gracePeriod = ref(2)
  const sprintIsRunning = ref(false)
  const sprintIsPaused = ref(false)
  const sprintTimer = ref(null)
  const sprintIsPunishing = ref(false)
  const consequencesAreOn = ref(true)

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

  function timerDidTick() {
    timeElapsed.value++
    if(consequencesAreOn.value) {
      secondsIdle.value++
      if(secondsIdle.value > gracePeriod.value && !sprintIsPunishing.value) {
        sprintIsPunishing.value = true 
      }
    }
    
    
  }

  function resetPunishCountdown() {
    if(sprintIsPunishing.value === true) { sprintIsPunishing.value = false }
    secondsIdle.value = 0
  }

  function writerTextChanged(text) {
    if(!sprintIsRunning.value) { beginSprint() }
    if(consequencesAreOn.value && text.length > writerText.value.length) {
      resetPunishCountdown()
    }
    const currentWordCount = text.split(" ").length - 1
    if(currentWordCount.value !== wordsWritten.value) {
      wordsWritten.value = currentWordCount
    }
    writerText.value = text
  }

  function onTimeChanged(newValue) {
    sprintLengthInSeconds.value = newValue
  }

  function onGoalChanged(newValue) {
    wordCountGoal.value = newValue
  }

  function toggleConsequencesAreOn() {
    consequencesAreOn.value = !consequencesAreOn.value
  }

  function gracePeriodChanged(newValue) {
    gracePeriod.value = newValue
  }


</script>
