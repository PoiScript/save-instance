import format from 'date-fns/format';
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
    videos: [],
  },
  mutations: {
    setOpenId(state, openId) {
      state.openId = openId;
    },
    photosFetched(state, photos) {
      state.photos = photos;
    },
    videosFetched(state, videos) {
      state.videos = videos;
    },
    // mutation for updating today photo
    updatePhotoLocation(state, location) {
      state.photos[0].location = location;
    },
    updatePhotoDescription(state, description) {
      state.photos[0].description = description;
    },
    updatePhoto(state, image) {
      state.photos[0].image = image;
    },
  },
  getters: {
    hasPhotoToday: state =>
      state.photos.length > 0 ? isToday(state.photos[0].created_at) : false,
    getVideoByKey: state => key => state.videos.find(v => v.video_key === key),
  },
  actions: {
    fetchPhotos: ({ state, commit }, force = false) => {
      if (state.photos.length === 0 || force) {
        request('timeline/' + state.openId, 'GET', null)
          .then(data =>
            commit(
              'photosFetched',
              // prefix all photo with the api url
              data.map(photo => {
                photo.image = config.api_url + photo.image;
                return photo;
              }),
            ),
          )
          .catch(() => showWarning('登录失败! 无法获取时间轴'));
      }
    },
    fetchVideos: ({ state, commit }, force = false) => {
      if (state.videos.length === 0 || force) {
        request('video/' + state.openId, 'GET', null)
          .then(data =>
            commit(
              'videosFetched',
              // prefix all video with the api url
              data.map(video => {
                video.created_at = format(video.created_at, 'M月D日 HH:mm');
                video.video = config.api_url + video.video;
                video.thumbnail = video.video.replace(/\.mp4$/, '.jpg');
                return video;
              }),
            ),
          )
          .catch(err => {
            console.log(err);
            showWarning('登录失败! 无法获取视频列表');
          });
      }
    },
  },
});

export default store;
