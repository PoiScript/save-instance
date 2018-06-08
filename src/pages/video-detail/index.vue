<template>
  <div class="container" v-if="video">
    <video class="video" :src="video.video"
           :poster="video.thumbnail"
           controls></video>
    <div class="action-row">
      <button class="action">
        <img class="action-img" src="/static/icons/edit.png"/>
        重命名
      </button>
      <button class="action" @click="downloadClick">
        <img class="action-img" src="/static/icons/download.png"/>
        下载
      </button>
      <button class="action" open-type="share">
        <img class="action-img" src="/static/icons/share.png"/>
        分享
      </button>
    </div>
  </div>
</template>

<script>
import Toast from 'mp-weui/packages/toast';
import { mapActions } from 'vuex';

import store from '../../store';
import { downloadFile, saveFile } from '../../util';

export default {
  data() {
    return {
      key: 0,
    };
  },

  computed: {
    video() {
      return this.$store.getters.getVideoByKey(
        parseInt(this.$root.$mp.query.key),
      );
    },
  },

  store,

  onLoad() {
    this.fetchVideos(false);
  },

  onShareAppMessage() {
    return {
      title: '咔记分享',
      path: `/pages/share/main?key=${this.video.video_key}&share=1`,
      imageUrl: this.video.thumbnail,
      success: () => {
        wx.showModal({
          content: '分享发送成功!',
          title: '提示',
          showCancel: false,
        });
      },
      fail: res => {
        console.log('share failed' + JSON.stringify(res));
        wx.showModal({
          content: '分享发送失败!',
          title: '错误',
          showCancel: false,
        });
      },
    };
  },

  methods: {
    ...mapActions(['fetchVideos']),

    downloadClick() {
      downloadFile(this.video.video)
        .then(path => saveFile(path))
        .then(path => Toast(`视频下载至: ${path}`))
        .catch(err => {
          wx.showModal({
            content: '视频下载失败!',
            title: '错误',
            showCancel: false,
          });
          console.log(err);
        });
    },
  },
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

.action-row {
  padding-top: 15px;
  margin: 0;
  box-sizing: border-box;
  display: flex;
  flex: 0 1 auto;
  flex-direction: row;
  width: 100%;
}

.action {
  box-sizing: border-box;
  max-width: 33.33333333%;
  flex: 0 0 33.33333333%;
  margin: 0;
  text-align: center;
}

.action-img {
  margin: 0 auto;
  display: block;
  width: 30px;
  height: 30px;
}

button,
button::after {
  padding: 0;
  border: none;
  border-radius: 0;
  background-color: transparent;
}
</style>
