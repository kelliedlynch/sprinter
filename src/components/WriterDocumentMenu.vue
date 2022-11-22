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
    v-model="showSnackbar"
    timeout="3000"
  >
    {{ snackbarContents }}
  </v-snackbar>

  <v-dialog 
    v-model="dialog.show"
    class="w-50"
  >
    <v-card>
      <v-card-text>
        {{ dialog.text }}
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="primary"
          @click="dialog.action"
        >
          {{ "Ok"}}
        </v-btn>
        <v-btn
          @click="dialog.show=false"
        >
          {{ "Cancel"}}
        </v-btn>
      </v-card-actions>
    </v-card> 
  </v-dialog>
</template>

<script setup>
import { inject, ref, reactive } from 'vue';

const showSnackbar = ref(false);
const snackbarContents = ref('');
const writerText = inject('writerText');
const dialog = reactive({
  show: false,
  text: ''
})
function copyTextToClipboard() {
  navigator.clipboard.writeText(writerText.value);
  snackbarContents.value = 'Text copied to clipboard';
  showSnackbar.value = true;
}

function downloadTextAsTxt() {
  const dateTimeString = new Date().toISOString();
  const formattedDateTime = dateTimeString.replace('T', ' ').slice(0, -5).replaceAll(':', '.');
  const fileName = 'sprint ' + formattedDateTime + '.txt';

  let element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(writerText.value));
  element.setAttribute('download', fileName);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);

  snackbarContents.value='Saved text as ' + fileName;
  showSnackbar.value = true;
}

function clearWritingArea() {
  dialog.text = 'Are you sure you want to clear the text you\'ve written?';
  dialog.action = () => writerText.value = ''
  dialog.show = true;
}

</script>