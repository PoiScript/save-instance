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
});

export default store;
