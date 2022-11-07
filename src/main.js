import { createApp } from 'vue'
import WriterApp from './WriterApp.vue'
// import { Quasar } from 'quasar'
// import quasarUserOptions from './quasar-user-options'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


// import "quasar/dist/quasar.sass"
import "./styles/sprinter.sass"

const vuetify = createVuetify({
    components,
    directives,
  })
  
  createApp(WriterApp).use(vuetify).mount('#app')

// createApp(WriterApp).use(Quasar, quasarUserOptions).mount('#app')
