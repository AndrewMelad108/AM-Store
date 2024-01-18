import Vue from "vue";
import Vuex from "vuex";
// import router from "@/router";
Vue.use(Vuex);
const state = {
  isUserLoggedIn: false,
  isUserLoggedInId: "",
  counter: 0,
};
const getters = {
  isUserLoggedInCheck(state) {
    return state.isUserLoggedIn;
  },
  getCounter(state) {
    return state.counter;
  },
};
const mutations = {
  isUserLogged(state) {
    //check user in login or not
    // check function in user login or not
    let user = localStorage.getItem("user-info");
    if (user) {
      state.isUserLoggedIn = true;
      state.isUserLoggedInId = JSON.parse(user).id;
    } else {
      state.isUserLoggedIn = false;
      // this.commit("redirect", payload.name);
    }
  },
  increaseCounter(state) {
    return (state.counter += 1);
  },
};
const actions = {};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {},
});
