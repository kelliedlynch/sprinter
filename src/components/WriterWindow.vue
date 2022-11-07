<template>
  <v-textarea
    no-resize 
    variant="solo"
    @keyup="$emit('update:writerText', $event.target.value)"
    class="writerTextArea pa-4 pa-md-6 pa-lg-10" 
    placeholder="Start writing, or use the left menu to change your sprint options." 
  >
  </v-textarea>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  writerText: {
    type: String,
    default: "",
    required: true
  },
})

</script>