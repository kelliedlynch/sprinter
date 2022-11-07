<template>
  <v-textarea
    no-resize 
    variant="solo"
    @keyup="$emit('update:writerText', $event.target.value)"
    v-writer-text-area
    class="writerTextArea pa-4 pa-md-6 pa-lg-10" 
    
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


// const writerText = ref("")
// const wordsWritten = ref(0)

// function fireEvent() = {
//   this.$emit("updateWordsWritten", wordsWritten, props.wordsWritten)
// }

const vWriterTextArea = {

}
// setInterval(timerDidTick, 1000)

// const vWriterTextArea = {
//   updated: () => {
//     console.log(currentWordCount())
//     console.log(wordsRemaining())
//   }
// }

</script>