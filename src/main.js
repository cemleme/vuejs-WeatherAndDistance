import { createApp } from "vue";

import App from "./App.vue";
import store from "./store";
import "./assets/tailwind.css";

import BaseModal from "./components/UI/BaseModal.vue";


const app = createApp(App);

app.component("base-modal", BaseModal);
app.use(store);
app.mount("#app");
