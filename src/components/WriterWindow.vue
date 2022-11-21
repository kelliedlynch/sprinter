<template>
  <v-container fluid class="d-flex flex-column fill-height w-100">
    <v-container fluid class="d-flex flex-column fill-height w-100 pb-2">
        <v-textarea
            no-resize
            variant="solo"
            :class="[
                'writerTextArea',
                props.sprintIsPunishing ? 'writerPunishing' : ''
            ]"
            placeholder="Start writing, or use the left menu to change your sprint options."
            v-model="writerText"
            transition="fade-transition"
            :readonly="writerWindowIsLocked"
        >
        </v-textarea>
      <!-- </v-row>
      <v-row 
          no-gutters
          class="flex-grow-0 flex-shrink-1
              px-sm-6 px-md-8 px-lg-10 px-xl-12
              pt-2
              pb-sm-2 pb-md-3 pb-lg-4 pb-xl-6"
      > -->
        
      <!-- </v-row> -->
    </v-container>
    <WriterDocumentMenu />
  </v-container>
    <v-snackbar
        v-model="showReward"
        color="success"
        :timeout="5000"
    >
      Congratulations! You reached your goal!
    </v-snackbar>

  <div class="v-overlay v-overlay--absolute justify-center pt-10 confettiOverlay">
    <ConfettiExplosion
          v-if="goalWasReached"
          :stageHeight="windowHeight"
    />
  </div>
</template>

<script setup>
import { ref, defineProps, computed, inject } from 'vue';
import ConfettiExplosion from "vue-confetti-explosion";
import WriterDocumentMenu from './WriterDocumentMenu.vue';

const props = defineProps({
    sprintIsRunning: Boolean,
    sprintIsPunishing: Boolean,
})

const writerText = inject("writerText")
const rewardWasShown = inject("rewardWasShown")
const goalWasReached = inject("goalWasReached")
const writerWindowIsLocked = inject("writerWindowIsLocked")
const windowHeight = ref(window.innerHeight)

const showReward = computed({
  get() {
    return props.sprintIsRunning && goalWasReached.value && !rewardWasShown.value
  },
  set() {
    rewardWasShown.value = true
  }
})

// const showFinishedTextActions = computed(() => !props.sprintIsRunning.value && writerText.value.length>0)

</script>
