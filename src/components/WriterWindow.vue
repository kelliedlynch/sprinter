<template>
  <div class="h-100">
    <div class="v-overlay v-overlay--absolute justify-center pt-10 confettiOverlay">
      <ConfettiExplosion 
        v-if="goalWasReached"
        :stageHeight="windowHeight" 
      />
    </div>
    <v-textarea
      no-resize 
      variant="solo"
      :class="[
        'writerTextArea',
        'pa-4', 'pa-md-6', 'pa-lg-10',
        props.sprintIsPunishing ? 'writerPunishing' : '']" 
      placeholder="Start writing, or use the left menu to change your sprint options."
      v-model="writerText"
      transition="fade-transition"
      :readonly="writerWindowIsLocked"
    >
    </v-textarea>
    <v-snackbar
      v-model="showReward"
      color="success"
      :timeout="3000"
    >
      Congratulations! You reached your goal!
    </v-snackbar>
  </div>
</template>

<script setup>
import { ref, defineProps, computed, inject } from 'vue';
import ConfettiExplosion from "vue-confetti-explosion";

const props = defineProps({
  sprintIsRunning: Boolean,
  sprintIsPunishing: Boolean,
  goalWasReached: Boolean,
})

const writerText = inject("writerText")
const rewardWasShown = inject("rewardWasShown")
const goalWasReached = inject("goalWasReached")
const writerWindowIsLocked = inject("writerWindowIsLocked")
const windowHeight = ref(window.innerHeight)

const showReward = computed({
  get() {
    return props.goalWasReached && !rewardWasShown.value
  },
  set() {
    rewardWasShown.value = true
  }
})

// const emit = defineEmits([
//   "writerTextChanged",
// ])

// function didEnterKeystroke(oldValue, newValue) {
//   console.log("didEnterKeystroke", "old", oldValue, "new", newValue)
//   writerText.value = newValue
//   emit('writerTextChanged', oldValue)
// }

</script>