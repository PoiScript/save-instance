import { request, warning } from '../util';
import { max, min } from 'date-fns';

export const timeline = {
  state: {
    photos: [],
  },
  mutations: {
    photosFetched(state, photos) {
      state.photos = photos;
    },
  },
  getters: {
    getPhotoById: state => id => state.photos.find(p => p.id === id),
    firstDayInTimeline: state => min(state.photos.map(p => p.created_at)),
    lastDayInTimeline: state => max(state.photos.map(p => p.created_at)),
  },
  actions: {
    fetchPhotos: async ({ state, commit }, force = false) => {
      if (state.photos.length === 0 || force) {
        try {
          const photos = await request('timeline');
          commit('photosFetched', photos);
        } catch (e) {
          console.log(e);
          warning('获取时间轴失败!');
        }
      }
    },
  },
};
