import isToday from 'date-fns/is_today';
import Vue from 'vue';
import Vuex from 'vuex';

import config from './config';
import { request, showWarning } from './util';

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
    fetchPhotos: context => {
      request('timeline/' + context.state.openId, 'GET', null)
        .then(data =>
          context.commit(
            'photosFetched',
            // prefix all photo with the api url
            data.map(photo => {
              photo.image = config.api_url + photo.image;
              return photo;
            }),
          ),
        )
        .catch(() => showWarning('登录失败! 无法获取时间轴'));
    },
  },
});

export default store;
