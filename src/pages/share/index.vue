<template>
  <div class="container" v-if="video">
    <video class="video" :src="video.video" :poster="video.thumbnail" controls></video>
  </div>
</template>

<script>
import config from '../../config';
import { request } from '../../util';

export default {
  data() {
    return {
      video: null,
    };
  },

  onLoad() {
    wx.showToast({
      icon: 'loading',
      title: '正在加载...',
    });

    request('video/share/' + this.$root.$mp.query.key)
      .then(video => {
        this.video = video;
        this.video.thumbnail = config.api_url + this.video.video.replace(/\.mp4$/, '.jpg');
        this.video.video = config.api_url + 'video/' + this.video.video;
      })
      .finally(() => wx.hideToast());
  },

  methods: {},
};
</script>

<style>
page {
  height: 100%;
  background-color: #f5f5f5;
}

.container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.video {
  width: 100%;
}
</style>
