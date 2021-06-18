import Vue from "vue";
import Vuex from "./kvuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    counter: 1,
  },
  mutations: {
    add(state) {
      // state哪里来的？
      state.counter++;
    },
  },
  actions: {
    add({ commit }) {
      setTimeout(() => {
        commit("add");
      }, 1000);
    },
  },
  modules: {},
  getters: {
    doubleCounter: (state) => {
      return state.counter * 2;
    },
  },
});
