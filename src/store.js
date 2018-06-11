import format from 'date-fns/format';
import isToday from 'date-fns/is_today';
import Vue from 'vue';
import Vuex from 'vuex';

import { _request, warning } from './util';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    jwt: {},
    photos: [],
    videos: [],
    settings: {
      daily_notify: true,
      notify_time: 0,
      duration: 0,
    },
  },
  mutations: {
    setJWT(state, jwt) {
      state.jwt = jwt;
      try {
        wx.setStorageSync('jwt', jwt);
      } catch (e) {
        // TODO: handle error
      }
    },
    updateTodayPhoto(state, { location, description, photo_url }) {
      state.photos[0].location = location;
      state.photos[0].description = description;
      state.photos[0].photo_url = photo_url;
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
    getVideoById: state => id => state.videos.find(v => v.id === id),
  },
  actions: {
    fetchPhotos: async ({ state, commit }, force = false) => {
      if (state.photos.length === 0 || force) {
        try {
          const photos = await _request('timeline');
          commit('photosFetched', photos);
        } catch (e) {
          console.log(e);
          warning('获取时间轴失败!');
        }
      }
    },
    fetchVideos: async ({ state, commit }, force = false) => {
      if (state.videos.length === 0 || force) {
        try {
          const videos = await _request('videos');
          commit(
            'videosFetched',
            videos.map(video => {
              video.created_at = format(video.created_at, 'M月D日 HH:mm');
              return video;
            }),
          );
        } catch (e) {
          console.log(e);
          warning('获取视频列表失败!');
        }
      }
    },
    updateSettings: async ({ state, commit }, settings) => {
      wx.showLoading({ title: '更新用户配置...' });
      try {
        const newSettings = await _request('settings', 'PUT', {
          ...state.settings,
          ...settings,
        });
        commit('settingsUpdated', newSettings);
      } catch (e) {
        console.log(e);
        warning('用户配置更新失败!');
      }
      wx.hideLoading();
    },
    getSettings: async ({ state, commit }) => {
      wx.showLoading({ title: '获取用户配置...' });
      try {
        const settings = await _request('settings');
        commit('settingsUpdated', settings);
      } catch (e) {
        console.log(e);
        warning('获取用户配置失败!');
      }
      wx.hideLoading();
    },
  },
});

export default store;
