import en from "@/languages/en.json";
import ar from "@/languages/ar.json";
import VueI18n from "vue-i18n";
import Vue from "vue";
Vue.use(VueI18n);
export default new VueI18n({
  locale: localStorage.getItem("len") || "en",
  messages: {
    en: en,
    ar: ar,
  },
});
