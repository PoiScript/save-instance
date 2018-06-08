<template>
  <div class="container" v-if="video">
    <video class="video" :src="video.video" :poster="video.thumbnail" controls="false"></video>
    <div class="weui-cells cell">
      <div class="weui-cell weui-cell_access">
        <div class="weui-cell_hd">
          <img class="weui-cell_icon" src="/static/icons/description.png"/>
        </div>
        <div class="weui-cell__bd">视频名称</div>
        <div class="weui-cell_hd" @click="chooseLocation">
          <img class="weui-cell_icon edit-button" src="/static/icons/edit.png"/>
        </div>
      </div>
      <div class="cell-detail">{{video.name || '未命名视频'}}</div>
      <div class="weui-cell weui-cell_access">
        <div class="weui-cell_hd">
          <img class="weui-cell_icon" src="/static/icons/period.png"/>
        </div>
        <div class="weui-cell__bd">生成时间</div>
        <div class="weui-cell__ft">{{video.created_at}}</div>
      </div>
      <button class="weui-cell weui-cell_access" open-type="share">
        <div class="weui-cell_hd">
          <img class="weui-cell_icon" src="/static/icons/share.jpg"/>
        </div>
        <div class="weui-cell__bd">分享视频</div>
        <div class="weui-cell__ft weui-cell__ft_in-access"></div>
      </button>
      <div class="weui-cell weui-cell_access" @click="downloadClick">
        <div class="weui-cell_hd">
          <img class="weui-cell_icon" src="/static/icons/download.jpg"/>
        </div>
        <div class="weui-cell__bd">下载视频</div>
        <div class="weui-cell__ft weui-cell__ft_in-access"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Toast from 'mp-weui/packages/toast';
import MpCell from 'mp-weui/packages/cell';
import MpCellGroup from 'mp-weui/packages/cell-group';
import { mapActions } from 'vuex';

import fab from '../../components/fab';
import store from '../../store';
import { downloadFile, saveVideoToPhotosAlbum } from '../../util';

export default {
  components: {
    fab,
    MpCell,
    MpCellGroup,
  },

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
      path: `/pages/today/main?share=${this.video.video_key}`,
      imageUrl: this.video.thumbnail,
      success: () => {
        wx.showModal({
          content: '分享发送成功!',
          title: '提示',
          showCancel: false,
        });
      },
    };
  },

  methods: {
    ...mapActions(['fetchVideos']),

    downloadClick() {
      downloadFile(this.video.video)
        .then(path => saveVideoToPhotosAlbum(path))
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

button,
button::after {
  padding: 10px 15px;
  text-align: start;
  line-height: inherit;
  font-size: inherit;
  border: none;
  border-radius: 0;
  background-color: transparent;
}
</style>
