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
          :wordsWritten="wordsWritten"
          :timeElapsed="timeElapsed"
          :sprintIsRunning="sprintIsRunning"
          :sprintIsPaused="sprintIsPaused"
          @did-click-start-button="didClickStartButton"
          @did-click-end-button="didClickEndButton"
          @pauseSprint="pauseSprint"
          @unpauseSprint="unpauseSprint"
        />
    </v-navigation-drawer>

    <v-main>
      <WriterWindow 
        :sprintIsRunning="sprintIsRunning"
        :sprintIsPunishing="sprintIsPunishing"
      />
    </v-main>
    <v-dialog 
      v-model="beginSprintDialog"
    >
      <v-card>
        <v-card-text>
          Beginning a new sprint now will erase all text currently in the
              editor. Do you really want to start?
        </v-card-text>
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
    <v-dialog v-model="sprintFinishedDialog" >
      <v-card>
        <v-card-title>Sprint Finished!</v-card-title>
        <v-card-text>Great job! You wrote {{ endSprintStats.wordsWritten }} words in {{ endSprintStats.minutes }} minutes.</v-card-text>
        <v-card-actions>
          <v-btn @click="sprintFinishedDialog=false">
            Dismiss
          </v-btn>
        </v-card-actions>
      </v-card> 
    </v-dialog>
    <v-dialog v-model="showLocalStorageWarning">
      <v-card>
        <v-card-title>Can't save data</v-card-title>
        <v-card-text>
          <p>
            It looks like your security settings are preventing Sprinter from saving your text locally. This is usually because cookies are blocked.
                Please enable cookies for this site if you want your browser to remember your text.
          </p>
          <p>
            If you don't want to enable cookies, that's okay! Just be aware that if you have to close your browser or reload the page during a sprint,
                you will lose whatever you've written.
          </p>
        </v-card-text>
        <v-card-actions>
          <v-btn 
            color="primary"
            @click="showLocalStorageWarning=false"
          >
            I Understand
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

  // User-changeable app defaults
  const wordCountGoal = ref(500)
  provide("wordCountGoal", wordCountGoal)
  const gracePeriod = ref(2)
  provide("gracePeriod", gracePeriod)
  const consequencesAreOn = ref(true)
  provide("consequencesAreOn", consequencesAreOn)
  const sprintLengthInSeconds = ref(60*15)
  provide("sprintLengthInSeconds", sprintLengthInSeconds)

  const wordsWritten = ref(0)
  const writerText = ref("")
  provide("writerText", writerText)
  const timeElapsed = ref(0)
  const secondsIdle = ref(0)
  const sprintIsRunning = ref(false)
  provide('sprintIsRunning', sprintIsRunning)
  const sprintIsPaused = ref(false)
  const sprintTimer = ref(null)
  const goalWasReached = ref(false)
  provide("goalWasReached", goalWasReached)
  const beginSprintDialog = ref(false)
  const endSprintDialog = ref(false)
  const sprintFinishedDialog = ref(false)
  const rewardWasShown = ref(false)
  provide("rewardWasShown", rewardWasShown)
  const endSprintStats = ref({})

  const sprintIsPunishing = computed(() => sprintIsRunning.value && consequencesAreOn.value && secondsIdle.value > gracePeriod.value)

  const writerWindowIsLocked = computed(() => writerText.value.length > 0 && !sprintIsRunning.value)
  provide("writerWindowIsLocked", writerWindowIsLocked)

  let localStorageAccessible = false
  const showLocalStorageWarning = ref(false)
  
  try {
    writerText.value = localStorage.getItem('writerText') || ""
    localStorageAccessible = true
  } catch (error) {
    console.log(error.name, error.message)
    if(error.name === "SecurityError") { showLocalStorageWarning.value = true }
  }

  const beginSprint = () => {
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
    }
  }

  watch(writerText, (newText, oldText) => {
    if(!sprintIsRunning.value) { beginSprint() }
    if(consequencesAreOn.value && newText.length > oldText.length) {
      secondsIdle.value = 0
    }
    localStorageAccessible ? localStorage.setItem('writerText', newText) : true
    const currentWordCount = newText.split(" ").length - 1
    if(currentWordCount !== wordsWritten.value) {
      wordsWritten.value = currentWordCount
      if(wordsWritten.value >= wordCountGoal.value && !goalWasReached.value) {
        goalWasReached.value = true
      }
    }
  })

  function didClickStartButton() {
    if(writerText.value !== "") {
      beginSprintDialog.value = true
    } else {
      beginSprint()
    }
  }

  function didClickEndButton() {
    if(writerText.value !== "") {
      endSprintDialog.value = true
    } else {
      endSprint()
    }
  }

</script>
