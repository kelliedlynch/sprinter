import { createApp } from 'vue'
import WriterApp from './WriterApp.vue'

import 'vuetify/styles'
import "./styles/sprinter.scss"
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import '@fortawesome/fontawesome-free/css/all.css'
import { aliases, fa } from 'vuetify/iconsets/fa'
import '@mdi/font/css/materialdesignicons.css'
import { mdi } from 'vuetify/iconsets/mdi'


const vuetify = createVuetify({
    icons: {
      defaultSet: 'fa',
      aliases,
      sets: {
        fa,
        mdi,
      },
    },
    components,
    directives,
  })
  
  createApp(WriterApp).use(vuetify).mount('#app')
