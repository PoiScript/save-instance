import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    openId: null,
  },
  mutations: {
    setOpenId(state, openId) {
      state.openId = openId;
    },
  },
});

export default store;
