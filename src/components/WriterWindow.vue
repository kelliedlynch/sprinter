<template>
  <div class="h-100">
    <v-textarea
      no-resize 
      variant="solo"
      :class="[
        'writerTextArea',
        'pa-4', 'pa-md-6', 'pa-lg-10',
        props.sprintIsPunishing ? 'writerPunishing' : '']" 
      placeholder="Start writing, or use the left menu to change your sprint options."
      :value="textAreaContent"
      @input="didEnterKeystroke(textAreaContent, $event.target.value)"
      transition="fade-transition"
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
import { defineEmits, defineProps, computed, inject } from 'vue';

const props = defineProps({
  sprintIsRunning: Boolean,
  sprintIsPunishing: Boolean,
  goalWasReached: Boolean,
})

const textAreaContent = inject("writerText")
const rewardWasShown = inject("rewardWasShown")

const showReward = computed({
  get() {
    return props.goalWasReached && !rewardWasShown.value
  },
  set() {
    rewardWasShown.value = true
  }
})

const emit = defineEmits([
  "writerTextChanged",
])

function didEnterKeystroke(oldValue, newValue) {
  // console.log("didEnterKeystroke", oldValue, newValue)
  textAreaContent.value = newValue
  emit('writerTextChanged', oldValue)
}

</script>