<template>
  <form report-submit="true" class="container">
    <div v-if="videos.length > 0">
      <video-summary v-for="video in videos" :key="video.id" :video="video"></video-summary>
    </div>
    <big-image v-else text="视频列表空空如也" src="/static/picture/video_empty.jpg"></big-image>
  </form>
</template>

<script>
import { mapState } from 'vuex';

import videoSummary from './video-summary';
import store from '../../store';
import bigImage from '../../components/big-image';

export default {
  components: {
    bigImage,
    videoSummary,
  },

  store,

  computed: mapState(['videos']),

  async onLoad() {
    wx.showLoading({ title: '获取视频列表...' });
    await store.dispatch('fetchVideos', false);
    wx.hideLoading();
  },

  async onPullDownRefresh() {
    await store.dispatch('fetchVideos', true);
    wx.stopPullDownRefresh();
  },
};
</script>

<style>
page {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
}

.container {
  width: 100%;
  height: 100%;
}
</style>
