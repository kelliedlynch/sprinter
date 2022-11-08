<template>
  <v-textarea
    no-resize 
    variant="solo"
    :class="[
      'writerTextArea',
      'pa-4', 'pa-md-6', 'pa-lg-10',
      props.sprintIsPunishing ? 'writerPunishing' : '']" 
    placeholder="Start writing, or use the left menu to change your sprint options."
    :value="textAreaContent"
    @input="didEnterKeystroke"
    transition="fade-transition"
  >
  </v-textarea>
</template>

<script setup>
import { ref, defineEmits, defineProps } from 'vue';

const props = defineProps({
  sprintIsRunning: Boolean,
  sprintIsPunishing: Boolean,
})

const textAreaContent = ref("")

const emit = defineEmits([
  "writerTextChanged",
])

function didEnterKeystroke(event) {

  textAreaContent.value = event.target.value
  emit('writerTextChanged', event.target.value)
}

</script>