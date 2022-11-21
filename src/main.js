import { createApp } from "vue";
import SprinterApp from "./SprinterApp.vue";
import { PromiseDialog } from "vue3-promise-dialog";

import "vuetify/styles";
import "./styles/sprinter.scss";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import "@fortawesome/fontawesome-free/css/all.css";
import { aliases, fa } from "vuetify/iconsets/fa";
import "@mdi/font/css/materialdesignicons.css";
import { mdi } from "vuetify/iconsets/mdi";

const vuetify = createVuetify({
  icons: {
    defaultSet: "fa",
    aliases,
    sets: {
      fa,
      mdi,
    },
  },
  components,
  directives,
});

const app = createApp(SprinterApp);
app.use(vuetify);
app.use(PromiseDialog);
app.mount("#app");
