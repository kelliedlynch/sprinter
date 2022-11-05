<template>
<q-layout view="lHh lpR lFr" class="fill">

    <q-header elevated class="bg-primary text-white" id="writerHeader">
    <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
        <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
        </q-avatar>
        Title
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
    </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" behavior="mobile" bordered>
    <!-- drawer content -->
    </q-drawer>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
    <!-- drawer content -->
    </q-drawer>

    <q-page-container class="fill">
    <!-- <router-view /> -->
        <WriterWindow />
    </q-page-container>

</q-layout>
</template>

<script>
import { ref } from 'vue'

import WriterWindow from './components/WriterWindow.vue'

export default {
  components: {
    WriterWindow,
  },
  setup () {
    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },

      rightDrawerOpen,
      toggleRightDrawer () {
        rightDrawerOpen.value = !rightDrawerOpen.value
      }
    }
  }
}
</script>
