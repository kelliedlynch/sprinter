import { createApp } from 'vue'
import WriterApp from './WriterApp.vue'
// import { Quasar } from 'quasar'
// import quasarUserOptions from './quasar-user-options'

import 'vuetify/styles'
import "./styles/sprinter.sass"
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import '@fortawesome/fontawesome-free/css/all.css'
import { aliases, fa } from 'vuetify/iconsets/fa'

const vuetify = createVuetify({
    icons: {
      defaultSet: 'fa',
      aliases,
      sets: {
        fa,
      },
    },
    components,
    directives,
  })
  
  createApp(WriterApp).use(vuetify).mount('#app')

// createApp(WriterApp).use(Quasar, quasarUserOptions).mount('#app')
