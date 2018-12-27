<template>
  <div class="page">
    <div class="page-container">
      <keep-alive>
        <router-view ref="current"></router-view>
      </keep-alive>
    </div>
    <div class="nav" v-if="$route.meta.nav">
      <router-link class="nav-item" to="/pages/today/index" replace="replace">
        <img
          alt=""
          class="nav-icon"
          v-if="$route.name === 'today'"
          src="/static/tab/view_day_selected.png"
        />
        <img alt="" class="nav-icon" v-else src="/static/tab/view_day.png"/>
        <div class="nav-title" :class="{ active: $route.name === 'today' }">
          今日
        </div>
      </router-link>
      <router-link
        class="nav-item"
        to="/pages/timeline/index"
        replace="replace"
      >
        <img
          alt=""
          class="nav-icon"
          v-if="$route.name === 'timeline'"
          src="/static/tab/timeline_selected.png"
        />
        <img alt="" class="nav-icon" v-else src="/static/tab/timeline.png"/>
        <div class="nav-title" :class="{ active: $route.name === 'timeline' }">
          时光轴
        </div>
      </router-link>
      <router-link class="nav-item" to="/pages/video-list/index" replace="replace">
        <img
          alt=""
          class="nav-icon"
          v-if="$route.name === 'video-list'"
          src="/static/tab/camera_selected.png"
        />
        <img alt="" class="nav-icon" v-else src="/static/tab/camera.png"/>
        <div class="nav-title" :class="{ active: $route.name === 'video-list' }">
          视频
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import 'mp-weui/lib/style.css'
import 'whatwg-fetch'

import store from './store'

export default {
  created: function() {
    store.dispatch('fetchPhotos')
    store.dispatch('fetchVideos')
  }
}
</script>

<style lang="scss">
body {
  padding: 0;
  margin: 0;
}

.page {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.page-container {
  flex: 1;
}

.nav {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 55px;
  width: 100%;
  display: flex;
  background-color: #ffffff;
  border-top: 1px solid #eee;
  z-index: 1;
}

.nav + .container {
  padding-bottom: 54px;
}

.nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-decoration: none;
}

.nav-icon {
  width: 30px;
  height: 30px;
}

.nav-title {
  color: #80848f;
  font-size: 12px;
}

.nav-title.active {
  color: #2d8cf0;
}
</style>
