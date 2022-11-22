<template>
  <div class="d-flex flex-column h-100">
    <v-card
      class="my-2 brandingCard"
      width="420"
    >
      <v-card-text class="d-flex flex-no-wrap pa-2 w-100">
          <div class="pa-0 d-flex flex-column align-center sprinterLogo">
            <SprinterLogoTrimmed
              :width="logoSize"
              :height="logoSize"
              :class="'ms-' + logoPos + ' mt-3'"
            />
            <h3
              :class="'appName ms-'+namePos"
            >Sprinter</h3>
          </div>
          <div class="text-center d-flex align-center">
              <h2 class="ps-8">Write faster or the screen turns red!</h2>
          </div>
      </v-card-text>
    </v-card>
    
    <WordsGoalMeter 
      :wordsWritten="props.wordsWritten"
      :meterSize="meterSize"
      :meterStroke="meterStroke"
      @goalChanged="$emit('goalChanged', $event)"
    />

    <SprintTimerMeter
      :timeElapsed="props.timeElapsed"
      :meterSize="meterSize"
      :meterStroke="meterStroke"
    />

    <ConsequencesMeter
      :meterSize="meterSize"
    />

    <v-container class="d-flex flex-no-wrap mt-4 pa-0">
      <v-btn 
        :prepend-icon="'fa-solid fa-'+(props.sprintIsPaused || !sprintIsRunning ? 'play' : 'pause')"
        color="primary"
        class="mx-2"
        rounded="pill"
        @click="handleButtonClick"
      >
      {{ props.sprintIsPaused || !sprintIsRunning ? 'Start' : 'Pause' }}
      </v-btn>
      <v-btn 
        prepend-icon="fa-solid fa-stop"
        color="primary"
        class="mx-2"
        :disabled="!sprintIsRunning"
        rounded="pill"
        @click="$emit('didClickEndButton')"
      >
      End Sprint
      </v-btn>
    </v-container>

    <div
      class="text-center about-button-container mt-auto mb-5"
      align-self="end"
    >
      <v-btn 
        prepend-icon="mdi:mdi-information-outline"
        variant="outlined"
        size="small"
        class="mx-2"
      >
        About

        <v-dialog
          v-model="aboutDialog"
          activator="parent"
          class="w-75"
        >
          <v-card class="pa-4">
            <v-card-title><span class="text-h4">Sprinter:</span> <span class="text-h5">a tool for time writing sprints</span></v-card-title>
            <v-card-subtitle>Developed by Kellie Lynch</v-card-subtitle>
            <v-card-text class="aboutText">
              <p>
                This little beta app is inspired by <a href="https://writeordie.com/">Write or Die</a>
                by Dr. Wicked, a fiendishly clever tool without which I never would have been able to
                finish 12 novels. Sadly, it's no longer updated, and I lack the discipline to write
                without the sword of Damocles hanging over my head, so I've created this.
              </p>
              <p>
                If you have any bug reports or feature requests, please 
                <a href="https://github.com/kelliedlynch/sprinter/issues">submit them on GitHub</a> or
                ping me on social media. I'm actively developing this, and will be prioritizing
                requested features.
              </p>
              <p>Happy writing!</p>
            </v-card-text>
            <v-card-actions>
              <v-container>
                <v-row>
                  <v-col class="socialLink">
                    <a href="https://github.com/kelliedlynch" class="d-flex flex-no-wrap">
                      <v-icon icon="mdi:mdi-github"></v-icon>
                      @kelliedlynch
                    </a>
                  </v-col>
                  <v-col class="socialLink">
                    <a href="https://tech.lgbt/@kelliedlynch" class="d-flex flex-no-wrap">
                      <v-icon icon="mdi:mdi-mastodon"></v-icon>
                      <span>@kelliedlynch@tech.lgbt</span>
                    </a>
                  </v-col>
                  <v-col class="socialLink">
                    <a href="https://www.instagram.com/kelliedlynch/" class="d-flex flex-no-wrap">
                      <v-icon icon="mdi:mdi-instagram"></v-icon>
                      @kelliedlynch
                    </a>
                  </v-col>
                  <v-col class="socialLink">
                    <a href="https://www.twitter.com/kelliedlynch/" class="d-flex flex-no-wrap">
                      <v-icon icon="mdi:mdi-twitter"></v-icon>
                      @kelliedlynch
                    </a>
                  </v-col>
                  <v-col class="socialLink">
                    <a href="https://www.discordapp.com/users/kaytoo#8693/" class="d-flex flex-no-wrap">
                      <v-icon icon="fa-brands fa-discord"></v-icon>
                      <span class="ms-2">@kaytoo#8693</span>
                    </a>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-btn>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, inject, ref } from 'vue';

import SprinterLogoTrimmed from "../assets/SprinterLogoTrimmed.vue";
import WordsGoalMeter from './WordsGoalMeter.vue';
import SprintTimerMeter from './SprintTimerMeter.vue';
import ConsequencesMeter from './ConsequencesMeter.vue';

const props = defineProps({
  wordsWritten: Number,
  timeElapsed: Number,
  sprintIsPaused: Boolean,
})

const aboutDialog = ref(false);

const sprintIsRunning = inject('sprintIsRunning');

const emit = defineEmits([
  "didClickStartButton",
  "didClickEndButton",
  "pauseSprint",
  "unpauseSprint",
])

// TODO: calculate these based on breakpoints
const meterSize = 106;
const meterStroke = 18;
const logoSize = meterSize * .6;
const logoPos = Math.floor((((meterSize - logoSize) / 2) ) /4);
const namePos = Math.floor(logoPos/2);

function handleButtonClick() {
  if(sprintIsRunning.value && props.sprintIsPaused) {
    emit("unpauseSprint")
  } else if(sprintIsRunning.value && !props.sprintIsPaused) {
    emit("pauseSprint")
  } else if(!sprintIsRunning.value) {
    emit("didClickStartButton")
  }
}



</script>