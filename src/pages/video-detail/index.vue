<template>
  <div class="container" v-if="video">
    <video-player :video="video"></video-player>
    <panel title="操作">
      <div class="weui-cell weui-cell_access" @click="navigateToEditor">
        <div class="weui-cell_hd">
          <img class="weui-cell_icon" src="/static/icons/file.png"/>
        </div>
        <div class="weui-cell__bd">编辑信息</div>
        <div class="weui-cell__ft weui-cell__ft_in-access"></div>
      </div>
      <button class="weui-cell weui-cell_access" open-type="share">
          <span class="weui-cell_hd">
            <img class="weui-cell_icon" src="/static/icons/share.png"/>
          </span>
        <span class="weui-cell__bd">分享视频</span>
        <span class="weui-cell__ft weui-cell__ft_in-access"></span>
      </button>
      <div class="weui-cell weui-cell_access" @click="downloadClick">
        <div class="weui-cell_hd">
          <img class="weui-cell_icon" src="/static/icons/download.png"/>
        </div>
        <div class="weui-cell__bd">下载视频</div>
        <div class="weui-cell__ft weui-cell__ft_in-access"></div>
      </div>
      <div class="weui-cell weui-cell_access" @click="deleteClick">
        <div class="weui-cell_hd">
          <img class="weui-cell_icon" src="/static/icons/delete.png"/>
        </div>
        <div class="weui-cell__bd">删除视频</div>
        <div class="weui-cell__ft weui-cell__ft_in-access"></div>
      </div>
    </panel>
  </div>
</template>

<script>
import MpCell from 'mp-weui/packages/cell';
import MpCellGroup from 'mp-weui/packages/cell-group';
import { mapActions } from 'vuex';

import videoPlayer from '../../components/video-player';
import panel from '../../components/panel';
import store from '../../store';
import {
  confirm,
  request,
  saveVideoToAlbum,
  toast,
  warning,
  navigate,
} from '../../util';

export default {
  components: {
    panel,
    MpCell,
    MpCellGroup,
    videoPlayer,
  },

  data() {
    return {
      video: null,
    };
  },

  store,

  onShow() {
    this.video = this.$store.getters.getVideoById(this.$root.$mp.query.id);
  },

  onShareAppMessage() {
    return {
      title: '咔记分享',
      path: `/pages/share/main?share=${this.video.id}`,
      imageUrl: this.video.thumbnail_url,
      success: () => {
        toast('分享发送成功!', 'success');
      },
    };
  },

  methods: {
    ...mapActions(['fetchVideos']),

    // TODO: use navigator
    navigateToEditor() {
      navigate(`/pages/video-editor/main?id=${this.video.id}`);
    },

    async downloadClick() {
      try {
        await saveVideoToAlbum(this.video.video_url);
      } catch (e) {
        console.log(e);
      }
    },

    async deleteClick() {
      if (await confirm('是否该视频?')) {
        try {
          wx.showLoading({ title: '正在删除视频...' });
          await request('videos/' + this.video.id, 'DELETE', {});
          await this.fetchVideos(true);
          wx.hideLoading();
          wx.navigateBack();
        } catch (e) {
          console.log(e);
          warning('视频删除失败!');
        }
      }
    },
  },
};
</script>

<style lang="scss">
page {
  height: 100%;
  background-color: #f5f5f5;
}

.container {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
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
