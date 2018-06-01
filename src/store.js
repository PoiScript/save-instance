import isToday from 'date-fns/is_today';
import Vue from 'vue';
import Vuex from 'vuex';

import config from './config';

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
  actions: {
    fetchPhotos({ commit, state }) {
      wx.request({
        url: config.api_url + 'timeline/' + state.openId,
        header: {
          'content-type': 'application/json',
        },
        success: res => {
          commit(
            'photosFetched',
            // prefix all photo with the api url
            res.data.map(photo => {
              photo.image = config.api_url + photo.image;
              return photo;
            }),
          );
        },
      });
    },
  },
});

export default store;
