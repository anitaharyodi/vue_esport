import Vue from "vue";
import App from "./App.vue";
import vuetify from "@/plugins/vuetify";
import router from "./router";

import "@fortawesome/fontawesome-free/js/all";
import VueSidebarMenu from "./components/MenuSidebar";

import "bootstrap/dist/css/bootstrap.css";
import "jquery/dist/jquery.min";
import "popper.js/dist/popper.min";
import "bootstrap/dist/js/bootstrap.min";

//toast
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

Vue.component('./components/MenuSidebar', VueSidebarMenu);
Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  Toast,
  render: (h) => h(App),
}).$mount("#app");
