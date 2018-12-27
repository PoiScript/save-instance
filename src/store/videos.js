import { format } from 'date-fns'

import config from '../config'

export const videos = {
  state: {
    videos: []
  },
  mutations: {
    videosFetched(state, videos) {
      state.videos = videos
    }
  },
  actions: {
    fetchVideos: async ({ state, commit }) => {
      try {
        const videos = await fetch(config.api_url + 'videos')
          .then(res => res.json())
          .then(json =>
            json.map(v => ({
              ...v,
              date: format(v.date, 'M月D日 HH:mm'),
              photo_url: config.api_url + v.id + '.jpg',
              video_url: config.api_url + v.id + '.mp4'
            }))
          )
        commit('videosFetched', videos)
      } catch (e) {
        console.warn(e)
      }
    }
  }
}
