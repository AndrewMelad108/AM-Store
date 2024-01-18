import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./tailwind.css";
import i18n from "../src/vue-i18n";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "element-ui/lib/theme-chalk/display.css";
import locale from "element-ui/lib/locale/lang/en";

Vue.config.productionTip = false;
Vue.use(ElementUI, { locale });
new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
