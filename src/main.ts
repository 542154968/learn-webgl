import Vue from "vue";
import router from "./router/index";
import VueCompositionApi from "@vue/composition-api";
import App from "./App";
import "./plugins/element-ui.js";
import "element-ui/lib/theme-chalk/index.css";
import "@styl/reset.styl";

Vue.config.productionTip = false;
Vue.use(VueCompositionApi);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
