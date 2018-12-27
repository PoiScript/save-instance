import { format, isSameDay, min, startOfMonth } from 'date-fns'
import config from '../config'

export const timeline = {
  state: {
    selected: {
      photo: null,
      date: new Date()
    },
    photos: []
  },
  mutations: {
    photosFetched(state, photos) {
      state.photos = photos
    },
    setSelectedPhoto(state, photo) {
      state.selected = {
        photo,
        date: photo.date
      }
    },
    setSelectedDate(state, date) {
      state.selected = {
        date,
        photo: state.photos.find(p => isSameDay(date, p.date))
      }
    }
  },
  getters: {
    selectedDate: state => format(state.selected.date, 'YYYY/MM/DD'),
    firstMonthInTimeline: state =>
      startOfMonth(min(...state.photos.map(p => p.created_at), new Date()))
  },
  actions: {
    fetchPhotos: async ({ state, commit }) => {
      try {
        const photos = await fetch(config.api_url + 'timeline')
          .then(res => res.json())
          .then(json =>
            json.map(p => ({ photo_url: config.api_url + p.id + '.jpg', ...p }))
          )
        commit('photosFetched', photos)
        // don't forget to update the selected photo as well
        commit('setSelectedDate', state.selected.date)
      } catch (e) {
        console.error(e)
        console.error('获取时间轴失败!')
      }
    }
  }
}
