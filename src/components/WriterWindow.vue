<template>
  <q-page class="column full-height" >
    <div 
      class="q-pa-md" 
      ref="writerTextArea"
      v-bind:style="{height: editorWindowHeight + 'px'}"
    >
      <q-input
        v-model="writerText"
        filled
        type="textarea"
        class="writerTextArea"        
      />
      <!-- {{editorWindowHeight}} -->
    </div>
    </q-page>
</template>

<script>
import { ref } from 'vue';
import { dom } from 'quasar';
// import { text } from 'body-parser';
const { offset } = dom;

export default {
  props: ['wordCountGoal'],
  setup() {
    const editorWindowHeight = ref(0);
    console.log("set to 0", editorWindowHeight.value)
    return {
      editorWindowHeight
    }
  },
  mounted() {
    const textAreaOffset = offset(this.$refs.writerTextArea).top;
    
    this.editorWindowHeight = window.innerHeight - textAreaOffset
    console.log("set to value", this.editorWindowHeight)
  },
  beforeUpdate() {
    console.log("beforeUpdate")
  },
  data() {
    return {
      writerText: ref(""),
      editorWindowStyle: {
        height: this.editorWindowHeight + "px"
      },
    }
  },
  computed: {
    currentWordCount() {
      return this.writerText.split(" ");
    },
    wordsRemaining() {
      return this.wordCountGoal - this.currentWordCount;
    }
  }

}
</script>