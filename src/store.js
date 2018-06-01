import isToday from 'date-fns/is_today';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    openId: null,
    photos: [],
  },
  mutations: {
    setOpenId(state, openId) {
      state.openId = openId;
    },
    photosFetched(state, photos) {
      state.photos = photos;
    },
  },
  getters: {
    firstPhoto: state => (state.photos.length > 0 ? state.photos[0] : null),
    hasPhotoToday: state =>
      state.photos.length > 0 ? isToday(state.photos[0].created_at) : false,
  },
});

export default store;
