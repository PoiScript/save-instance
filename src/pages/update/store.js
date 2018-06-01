import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    image: null,
    descr: null,
    address: null,
  },
  getters: {
    wordCount: state => (state.descr ? state.descr.length : 0),
  },
  mutations: {
    setImage(state, image) {
      state.image = image;
    },

    setAddress(state, address) {
      state.address = address;
    },

    setDescr(state, descr) {
      state.descr = descr;
    },
  },
});

export default store;
