import { createApp } from "vue";
import mdiVue from "mdi-vue/v3";
import * as mdijs from "@mdi/js";

import App from "./App.vue";
import modal from "./plugins/modal";
import router from "./router/router";
import store from "./store/store";
import "./assets/style.scss";

const app = createApp(App);

app.use(router);
app.use(store);

app.use(mdiVue, {
  icons: mdijs,
});

app.use(modal);

app.mount("#app");
