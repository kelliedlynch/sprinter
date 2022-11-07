<template>
 <v-app id="inspire">
    <v-navigation-drawer
      class="pt-4"
      color="grey-lighten-3"
      expand-on-hover
      rail
      permanent
      width="max-content"
      rail-width="120"
    >

        <SprintStatusRail 
          v-model:wordCountGoal="wordCountGoal" 
          :wordsWritten="wordsWritten"
          v-model:sprintTimeInSeconds="sprintTimeInSeconds"
          :timeElapsed="timeElapsed"
        />


    </v-navigation-drawer>

    <v-main>
      <WriterWindow 
        v-model:writerText="writerText"
      />
    </v-main>
  </v-app>
</template>

<script setup>
  import { ref, watch } from 'vue'

  import WriterWindow from './components/WriterWindow.vue'
  import SprintStatusRail from './components/SprintStatusRail.vue'

  const wordCountGoal = ref(500)
  const wordsWritten = ref(0)
  const writerText = ref("")
  const sprintTimeInSeconds = ref(60)
  const timeElapsed = ref(0)

  watch(writerText, textChanged)

  setInterval(timerDidTick, 1000)

  function timerDidTick() {
    timeElapsed.value++
  }

  function textChanged() {
    const currentWordCount = writerText.value.split(" ").length - 1
    if(currentWordCount !== wordsWritten) {
      wordsWritten.value = currentWordCount
    }
  }


</script>
