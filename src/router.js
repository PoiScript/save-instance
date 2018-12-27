import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    alias: '/',
    path: '/pages/today/index',
    name: 'today',
    meta: {
      nav: true
    },
    config: {
      enablePullDownRefresh: true
    }
  },
  {
    path: '/pages/timeline/index',
    name: 'timeline',
    meta: { nav: true }
  },
  {
    path: '/pages/video-list/index',
    name: 'video-list',
    meta: { nav: true }
  },
  { path: '/pages/photo-edit/index', name: 'photo-edit' },
  { path: '/pages/selector/index', name: 'selector' },
  { path: '/pages/video-editor/index', name: 'video-editor' },
  { path: '/pages/video-detail/index', name: 'video-detail' }
]

export default new Router({
  routes: routes.map(route => {
    const paths = route.path.replace(/^\//, '').split('/')
    route.component = () => import(`@/${paths[0]}/${paths[1]}/${paths[2]}`)
    return route
  }),
  mode: 'history'
})
