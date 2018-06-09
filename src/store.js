import format from 'date-fns/format';
import isToday from 'date-fns/is_today';
import Vue from 'vue';
import Vuex from 'vuex';

import { request, warning } from './util';

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
    updateTodayPhoto(state, { location, description, image_url }) {
      state.photos[0].location = location;
      state.photos[0].description = description;
      state.photos[0].image_url = image_url;
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
          .then(data => commit('photosFetched', data))
          .catch(() => warning('获取时间轴失败!'));
      }
    },
    fetchVideos: ({ state, commit }, force = false) => {
      if (state.videos.length === 0 || force) {
        request('video/list/' + state.openId, 'GET', null)
          .then(data =>
            commit(
              'videosFetched',
              data.map(video => {
                video.created_at = format(video.created_at, 'M月D日 HH:mm');
                return video;
              }),
            ),
          )
          .catch(err => {
            console.log(err);
            warning('获取视频列表失败!');
          });
      }
    },
    updateSettings: ({ state, commit }, settings) => {
      wx.showLoading({ title: '更新用户配置...' });

      request('settings/' + state.openId, 'POST', {
        ...state.settings,
        ...settings,
      })
        .catch(() => warning('用户配置更新失败!'))
        .then(settings => commit('settingsUpdated', settings))
        .then(() => wx.hideLoading());
    },
    getSettings: ({ state, commit }) => {
      wx.showLoading({ title: '获取用户配置...' });

      request('settings/' + state.openId, 'GET', null)
        .catch(() => warning('获取用户配置失败!'))
        .then(settings => commit('settingsUpdated', settings))
        .then(() => wx.hideLoading());
    },
  },
});

export default store;
