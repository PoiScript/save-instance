<template>
  <div class="container" v-if="video">
    <video class="video" :src="video.video" :poster="video.thumbnail" controls="false"></video>
    <div class="weui-cells cell">
      <div class="weui-cell weui-cell_access">
        <div class="weui-cell_hd">
          <img class="weui-cell_icon" src="/static/icons/description.png"/>
        </div>
        <div class="weui-cell__bd">视频名称</div>
        <div class="weui-cell_hd" @click="editName">
          <img class="weui-cell_icon edit-button" src="/static/icons/edit.png"/>
        </div>
      </div>
      <textarea class="cell-detail description-textarea"
                title="video description"
                :focus="editingName"
                :disabled="!editingName"
                :value="video.name"
                placeholder="未命名"
                wrap="hard"
                @blur="submitName($event.target.value)"
      ></textarea>
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
import { mapActions, mapMutations } from 'vuex';

import fab from '../../components/fab';
import store from '../../store';
import {
  downloadFile,
  saveVideoToPhotosAlbum,
  showWarning,
  request,
} from '../../util';

export default {
  components: {
    fab,
    MpCell,
    MpCellGroup,
  },

  data() {
    return {
      video: null,
      editingName: false,
    };
  },

  store,

  onLoad() {
    this.fetchVideos(false);
  },

  onShow() {
    this.video = this.$store.getters.getVideoByKey(
      parseInt(this.$root.$mp.query.key),
    );
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
    ...mapMutations(['updateVideoName']),

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

    editName() {
      this.editingName = true;
    },

    submitName(value) {
      this.editingName = false;

      if (this.video.name === value) return;

      showWarning('是否更新简介?', true).then(res => {
        if (res.confirm) {
          wx.showToast({
            icon: 'loading',
            title: '正在更新...',
          });
          request('video/' + this.video.video_key, 'POST', {
            name: value,
          })
            .then(newVideo => this.updateVideoName(newVideo))
            .finally(() => wx.hideToast());
        }
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

.description-textarea {
  line-height: 1em;
  height: 3em;
  width: 100%;
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
