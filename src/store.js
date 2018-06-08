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
    settings: {
      daily_notify: true,
      notify_time: 0,
      duration: 0,
    },
  },
  mutations: {
    setOpenId(state, openId) {
      state.openId = openId;
    },
    updateTodayPhoto(state, { location, description, image }) {
      state.photos[0].location = location;
      state.photos[0].description = description;
      state.photos[0].image = config.api_url + image;
    },
    settingsUpdated(state, settings) {
      state.settings = settings;
    },
    photosFetched(state, photos) {
      state.photos = photos;
    },
    videosFetched(state, videos) {
      state.videos = videos;
    },
    updateVideoName(state, { video_key, name }) {
      const i = state.videos.findIndex(v => v.video_key === video_key);
      if (i !== -1) {
        state.videos[i].name = name;
      }
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
        request('video/list/' + state.openId, 'GET', null)
          .then(data =>
            commit(
              'videosFetched',
              // prefix all video with the api url
              data.map(video => {
                video.created_at = format(video.created_at, 'M月D日 HH:mm');
                video.thumbnail =
                  config.api_url + video.video.replace(/\.mp4$/, '.jpg');
                video.video = config.api_url + 'video/' + video.video;
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
    updateSettings: ({ state, commit }, settings) => {
      wx.showToast({
        icon: 'loading',
        title: '更新用户配置...',
      });

      request('settings/' + state.openId, 'POST', {
        ...state.settings,
        ...settings,
      })
        .catch(() => showWarning('用户配置更新失败!'))
        .then(settings => commit('settingsUpdated', settings))
        .then(() => wx.hideToast());
    },
    getSettings: ({ state, commit }) => {
      wx.showToast({
        icon: 'loading',
        title: '获取用户配置...',
      });

      request('settings/' + state.openId, 'GET', null)
        .catch(() => showWarning('获取用户配置失败!'))
        .then(settings => commit('settingsUpdated', settings))
        .then(() => wx.hideToast());
    },
  },
});

export default store;
