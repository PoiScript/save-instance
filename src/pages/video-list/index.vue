<template>
  <form report-submit="true" class="container">
    <div class="video" v-for="video in videos" :key="video.video_key" @click="navigateToDetail(video.video_key)">
      <image class="thumbnail" :src="video.thumbnail" mode="aspectFill">
        <div class="duration">{{ video.duration }} s</div>
      </image>
      <div class="video-body">
        <p class="video-title">{{ video.name || '未命名视频' }}</p>
        <p class="video-date">{{ video.created_at }}</p>
      </div>
    </div>
  </form>
</template>

<script>
import { mapState } from 'vuex';

import store from '../../store';
import { navigate } from '../../util';

export default {
  store,

  computed: mapState(['videos']),

  onLoad() {
    wx.showToast({
      icon: 'loading',
      title: '获取视频列表...',
    });

    store.dispatch('fetchVideos', false).then(() => wx.hideToast());
  },

  methods: {
    navigateToDetail(key) {
      navigate('/pages/video-detail/main?key=' + key);
    },
  },
};
</script>

<style>
page {
  background-color: #f5f5f5;
}

.video {
  padding: 10px;
  background-color: #fff;
  border-bottom: 1px solid #b4b4b4;
  display: flex;
  align-items: flex-start;
}

.thumbnail {
  position: relative;
  width: 125px;
  height: 100px;
  margin: 0 15px 0 0;
}

.duration {
  margin-top: 0;
  margin-right: 0;
  padding: 0 4px;
  font-weight: 500;
  font-size: 15px;
  background-color: #000;
  height: 25px;
  line-height: 25px;
  opacity: 0.75;
  filter: alpha(opacity=75);
  display: -moz-inline-stack;
  vertical-align: top;
  display: inline-block;
  position: absolute;
  color: #fff;
  bottom: 0;
  right: 0;
  z-index: 1;
}

.video-body {
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.video-title {
  flex: 1;
}

.video-date {
  color: #767676;
  line-height: 1.3em;
}
</style>
