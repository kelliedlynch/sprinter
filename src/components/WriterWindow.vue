<template>
  <v-textarea
    no-resize 
    variant="solo"
    @keyup="textDidChange"
    class="writerTextArea pa-4 pa-md-6 pa-lg-10" 
    placeholder="Start writing, or use the left menu to change your sprint options."
  >
  </v-textarea>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  sprintIsRunning: Boolean,
  onBeginSprint: Function,
  onWriterTextChanged: Function,
})

const emit = defineEmits([])

function textDidChange(event) {
  console.log(event.target.value)
  emit('writerTextChanged', event.target.value)
  if(!props.sprintIsRunning) {
    emit("beginSprint")
  }
}

</script>