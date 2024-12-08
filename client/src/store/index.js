import Vue from "vue";
import Vuex from "vuex";
import persistedState from "vuex-persistedstate";

import getters from "./getters";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {},
    photowall: [],
    text: [],
    labels: [],
  },
  mutations: {
    savePhoto(state, payload) {
      state.photowall = payload;
    },
    addPhoto(state, payload) {
      if (state.photowall.length === 10) {
        state.photowall.push(...payload);
      } else {
        state.photowall.splice(9, state.photowall.length - 10);
        state.photowall.push(...payload);
      }
    },
    saveUserInfo(state, payload) {
      state.userInfo = payload;
      window.sessionStorage.setItem("token", JSON.stringify(payload));
    },
    saveText(state, payload) {
      state.text = payload;
    },
    saveLabels(state, payload) {
      state.labels = payload;
    },
  },
  actions: {},
  modules: {},
  getters,
  plugins: [
    persistedState({
      key: "userMsg",
      storage: window.sessionStorage,
    }),
  ],
});
