import Vue from 'vue';
import Vuex from 'vuex';

import { auth } from './auth';
import { settings } from './settings';
import { timeline } from './timeline';
import { videos } from './videos';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth,
    settings,
    timeline,
    videos,
  },
  state: {
    editing: {
      photo_url: null,
      description: null,
      location: null,
    },
  },
  mutations: {
    clearEditing(state) {
      state.editing = {
        photo_url: null,
        description: null,
        location: null,
      };
    },
    updateEditing(state, prop) {
      state.editing = { ...state.editing, ...prop };
    },
  },
  getters: {
    wordCount: state =>
      state.editing.description ? state.editing.description.length : 0,
    editingDirty: state =>
      state.editing.photo_url ||
      state.editing.description ||
      state.editing.location,
  },
});

export default store;
