import Vue from 'vue'
import Vuex from 'vuex'

import { timeline } from './timeline'
import { videos } from './videos'
import { editing } from './editing'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    timeline,
    videos,
    editing
  }
})

export default store
