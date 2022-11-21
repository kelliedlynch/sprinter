<template>
  <v-container fluid class="py-0 d-flex justify-end w-100">
    <v-sheet class="pe-1">
      <v-tooltip
        text="Copy Text To Clipboard"
        location="top"
      >
        <template
          v-slot:activator="{ props }"
        >
          <v-btn
            icon
            v-bind="props"
            variant="outlined"
            size="x-small"
            @click="copyTextToClipboard"
          >
            <v-icon icon="mdi:mdi-content-copy" size="large"></v-icon>
          </v-btn>
        </template>
      </v-tooltip>
    </v-sheet>

    <v-sheet class="pe-1">
      <v-tooltip
        text="Download As .txt"
        location="top"
      >
        <template
          v-slot:activator="{ props }"
        >
          <v-btn
            v-bind="props"
            variant="outlined"
            size="x-small"
            icon
            @click="downloadTextAsTxt"
          >
            <v-icon icon="mdi:mdi-file-download-outline" size="large"></v-icon>
          </v-btn>
        </template>
      </v-tooltip>
    </v-sheet>

    <v-sheet class="pe-1">
      <v-tooltip
        text="Clear Text"
        location="top"
      >
        <template
          v-slot:activator="{ props }"
        >
          <v-btn
            v-bind="props"
            variant="outlined"
            size="x-small"
            icon
            @click="clearWritingArea"
          >
            <v-icon icon="mdi:mdi-close-circle-outline" size="large"></v-icon>
          </v-btn>
        </template>
      </v-tooltip>
    </v-sheet>

  </v-container>
  <v-snackbar
    v-model="confirmCopied"
    timeout="3000"
  >
    Text copied to clipboard.
  </v-snackbar>
</template>

<script setup>
import { inject, ref } from 'vue';

const confirmCopied = ref(false);
const writerText = inject("writerText");

function copyTextToClipboard() {
  navigator.clipboard.writeText(writerText.value);
  confirmCopied.value = true;
}

function downloadTextAsTxt() {

}

function clearWritingArea() {

}

</script>