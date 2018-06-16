import { request, warning, upload } from '../util';
import { max, min, isSameDay, format } from 'date-fns';

export const timeline = {
  state: {
    selected: {
      photo: null,
      date: null,
    },
    photos: [],
  },
  mutations: {
    photosFetched(state, photos) {
      state.photos = photos;
    },
    setSelectedPhoto(state, photo) {
      state.selected = {
        photo,
        date: photo.created_at,
      };
    },
    setSelectedDate(state, date) {
      state.selected = {
        date,
        photo: state.photos.find(p => isSameDay(date, p.created_at)),
      };
    },
  },
  getters: {
    getPhotoById: state => id => state.photos.find(p => p.id === id),
    selectedDate: state =>
      format(state.selected.date || new Date(), 'YYYY/MM/DD'),
    firstDayInTimeline: state => min(state.photos.map(p => p.created_at)),
    lastDayInTimeline: state => max(state.photos.map(p => p.created_at)),
  },
  actions: {
    fetchPhotos: async ({ state, commit }, force = false) => {
      if (state.photos.length === 0 || force) {
        try {
          const photos = await request('timeline');
          commit('photosFetched', photos);
          // don't forget to update the selected photo as well
          commit('setSelectedDate', state.selected.date || new Date());
        } catch (e) {
          console.log(e);
          warning('获取时间轴失败!');
        }
      }
    },
    updatePhotoMeta: async ({ dispatch }, { id, description, location }) => {
      wx.showLoading({ title: '正在更新...' });

      try {
        await request(`timeline/${id}/meta`, 'PUT', {
          description,
          location,
        });
      } catch (e) {
        console.log(e);
        warning('更新照片信息失败!');
      }

      await dispatch('fetchPhotos', true);

      wx.hideLoading();
    },
    updatePhotoImage: async ({ dispatch }, { id, path }) => {
      wx.showLoading({ title: '正在更新...' });

      try {
        await upload(`timeline/${id}/photo`, path);
      } catch (e) {
        console.log(e);
        warning('更新照片信息失败!');
      }

      await dispatch('fetchPhotos', true);

      wx.hideLoading();
    },
  },
};
