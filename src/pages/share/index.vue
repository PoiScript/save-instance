<template>
  <div class="container" v-if="video">
    <video class="video" :src="video.video" :poster="video.thumbnail" controls="false"></video>
    <div class="weui-cells cell">
      <div class="weui-cell weui-cell_access">
        <div class="weui-cell_hd">
          <img class="weui-cell_icon" src="/static/icons/description.png"/>
        </div>
        <div class="weui-cell__bd">视频名称</div>
      </div>
      <div class="cell-detail">
        {{video.name || '未命名'}}
      </div>
      <div class="weui-cell weui-cell_access">
        <div class="weui-cell_hd">
          <img class="weui-cell_icon" src="/static/icons/period.png"/>
        </div>
        <div class="weui-cell__bd">生成时间</div>
        <div class="weui-cell__ft">{{date}}</div>
      </div>
      <div class="weui-cell weui-cell_access" @click="downloadClick">
        <div class="weui-cell_hd">
          <img class="weui-cell_icon" src="/static/icons/download.jpg"/>
        </div>
        <div class="weui-cell__bd">下载视频</div>
        <div class="weui-cell__ft weui-cell__ft_in-access"></div>
      </div>
      <a href="/pages/today/main" open-type="switchTab" hover-class="none" class="weui-cell weui-cell_access">
        <div class="weui-cell_hd">
          <img class="weui-cell_icon" src="/static/icons/video.png"/>
        </div>
        <div class="weui-cell__bd">返回首页</div>
        <div class="weui-cell__ft weui-cell__ft_in-access"></div>
      </a>
    </div>
  </div>
</template>

<script>
import format from 'date-fns/format';

import {
  downloadFile,
  request,
  saveVideoToPhotosAlbum,
} from '../../util';

export default {
  data() {
    return {
      video: null,
    };
  },

  computed: {
    date() {
      return this.video ? format(this.video.created_at, 'M月D日 HH:mm') : '';
    },
  },

  onLoad() {
    wx.showLoading({ title: '正在加载...' });

    request('video/share/' + this.$root.$mp.query.share)
      .then(video => (this.video = video))
      .catch(err => console.log(err))
      .finally(() => wx.hideLoading());
  },

  methods: {
    downloadClick() {
      downloadFile(this.video.video)
        .then(path => saveVideoToPhotosAlbum(path))
        .catch(err => console.log(err));
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

.cell {
  width: 100%;
  padding: 0;
  margin: 0;
}

.cell-detail {
  padding: 0 15px 10px 15px;
  font-size: 0.9em;
  color: #555555;
}
</style>
