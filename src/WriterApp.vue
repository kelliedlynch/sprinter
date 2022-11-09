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
          @didClickStartButton="didClickStartButton"
          @endSprint="endSprint"
          @pauseSprint="pauseSprint"
          @unpauseSprint="unpauseSprint"
        />


    </v-navigation-drawer>

    <v-main>
      <WriterWindow 
        :sprintIsRunning="sprintIsRunning"
        @beginSprint="beginSprint"
        :sprintIsPunishing="sprintIsPunishing"
        :goalWasReached="goalWasReached"
      />
    </v-main>
    <v-dialog 
      v-model="beginSprintDialog"
    >
      <v-card>
        <v-card-text>Beginning a new sprint now will erase all text currently in the editor. Do you really want to start?</v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            @click="beginSprint"
          >
            Start
          </v-btn>
          <v-btn
            @click="beginSprintDialog=false"
          >
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card> 
    </v-dialog>
    <v-dialog 
      v-model="endSprintDialog"
    >
      <v-card>
        <v-card-text>Are you sure you want to end this sprint early?</v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            @click="endSprint"
          >
            End
          </v-btn>
          <v-btn
            @click="endSprintDialog=false"
          >
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card> 
    </v-dialog>
    <v-dialog 
      v-model="sprintFinishedDialog"
    >
      <v-card>
        <v-card-title>Sprint Finished!</v-card-title>
        <v-card-text>Great job! You wrote {{ endSprintStats.wordsWritten }} words in {{ endSprintStats.minutes }} minutes.</v-card-text>
        <v-card-actions>
          <v-btn
            @click="sprintFinishedDialog=false"
          >
            Dismiss
          </v-btn>
        </v-card-actions>
      </v-card> 
    </v-dialog>
  </v-app>
</template>

<script setup>
  import { ref, provide, computed, watch } from 'vue'

  import WriterWindow from './components/WriterWindow.vue'
  import SprintStatusRail from './components/SprintStatusRail.vue'

  const wordCountGoal = ref(10)
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
  const goalWasReached = ref(false)
  const beginSprintDialog = ref(false)
  const endSprintDialog = ref(false)
  const sprintFinishedDialog = ref(false)
  const rewardWasShown = ref(false)
  const endSprintStats = ref({})

  const writerWindowIsLocked = computed({
    get() {
      return writerText.value.length > 0 && !sprintIsRunning.value
    }
  })

  provide("consequencesAreOn", consequencesAreOn)
  provide("gracePeriod", gracePeriod)
  provide("writerText", writerText)
  provide("goalWasReached", goalWasReached)
  provide("rewardWasShown", rewardWasShown)
  provide("writerWindowIsLocked", writerWindowIsLocked)

  function beginSprint() {
    beginSprintDialog.value = false
    writerText.value = ""
    sprintIsPaused.value = false
    goalWasReached.value = false
    rewardWasShown.value = false
    endSprintStats.value = {}
    startTimer()
    sprintIsRunning.value = true
  }
  
  function endSprint() {
    endSprintDialog.value = false
    sprintIsRunning.value = false
    sprintIsPaused.value = false
    sprintIsPunishing.value = false
    stopTimer()
    endSprintStats.value.wordsWritten = wordsWritten.value
    endSprintStats.value.minutes = Math.floor(timeElapsed.value / 60)
    timeElapsed.value = 0
    wordsWritten.value = 0
  }

  function pauseSprint() {
    sprintIsPaused.value = true
    stopTimer()
  }

  function unpauseSprint() {
    sprintIsPaused.value = false
    startTimer()
  }

  function startTimer() {
    sprintTimer.value = setInterval(timerDidTick, 1000)
  }

  function stopTimer() {
    clearInterval(sprintTimer.value)
  }

  function timerDidTick() {
    timeElapsed.value++
    if(timeElapsed.value === sprintLengthInSeconds.value) {
      sprintFinishedDialog.value = true
      endSprint()
    }
    if(consequencesAreOn.value && !goalWasReached.value) {
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

  watch(writerText, (newText, oldText) => {
    if(!sprintIsRunning.value) { beginSprint() }
    if(consequencesAreOn.value && newText.length > oldText.length) {
      resetPunishCountdown()
    }
    const currentWordCount = newText.split(" ").length - 1
    if(currentWordCount !== wordsWritten.value) {
      wordsWritten.value = currentWordCount
      if(wordsWritten.value >= wordCountGoal.value && !goalWasReached.value) {
        goalWasReached.value = true
        sprintIsPunishing.value = false
      }
    }
  })

  function onTimeChanged(newValue) {
    sprintLengthInSeconds.value = newValue
  }

  function onGoalChanged(newValue) {
    wordCountGoal.value = newValue
  }

  function didClickStartButton() {
    if(writerText.value !== "") {
      beginSprintDialog.value = true
    } else {
      beginSprint()
    }
  }

</script>
