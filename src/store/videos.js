import { request, warning } from '../util';
import { format } from 'date-fns';

export const videos = {
  state: {
    videos: [],
  },
  mutations: {
    videosFetched(state, videos) {
      state.videos = videos;
    },
  },
  getters: {
    getVideoById: state => id => state.videos.find(v => v.id === id),
  },
  actions: {
    fetchVideos: async ({ state, commit }, force = false) => {
      if (state.videos.length === 0 || force) {
        try {
          const videos = await request('videos');
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
  },
};
