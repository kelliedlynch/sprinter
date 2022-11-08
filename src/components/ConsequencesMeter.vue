<template>
  <v-card
    width="420"
    :height="props.meterSize + 18"
    class="pa-2 my-2 settingsCard"
  >
    <div class="d-flex flex-no-wrap align-center h-100">
      <div class="d-flex flex-column align-center ps-2">
        <div class="consequencesSwitchLabel text-primary">Consequences</div>
        <v-switch
          v-model="consequencesAreOn"
          inset
          color="primary"
          class="consequencesSwitch"
        >
          <template v-slot:label>
            <div class="text-primary">{{ consequencesAreOn ? 'On' : 'Off' }}</div>
          </template>
        </v-switch>
        <div>
          <span class="gracePeriodMeter text-primary me-2">{{ gracePeriod }}</span>sec
        </div>
      </div>
      <div class="w-100 ms-2">
  
          <v-card-title>Grace Period:</v-card-title>
          <v-card-subtitle>seconds before consequences</v-card-subtitle>
          <v-card-text>
            <v-slider
              min="0"
              max="10"
              thumb-label
              show-ticks="always"
              step="1"
              class="align-start"
              v-model="gracePeriod"
            ></v-slider>
          </v-card-text>
      </div>


    </div>
  </v-card>
</template>

<script setup>
import { defineProps, computed, defineEmits } from 'vue';

const props = defineProps({
  meterSize: Number,
  consequencesAreOn: Boolean,
  gracePeriod: Number,
})

const emit = defineEmits([
  'toggleConsequencesAreOn',
  'gracePeriodChanged',
])

const consequencesAreOn = computed({
  get() {
    return props.consequencesAreOn
  },
  set() {
    emit('toggleConsequencesAreOn')
  }
})

const gracePeriod = computed({
  get() {
    return props.gracePeriod
  },
  set(newValue) {
    emit("gracePeriodChanged", newValue)
  }
})

</script>