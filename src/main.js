import { createApp } from 'vue'
import WriterApp from './WriterApp.vue'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'

import "quasar/dist/quasar.sass"
import "./styles/sprinter.sass"


createApp(WriterApp).use(Quasar, quasarUserOptions).mount('#app')
