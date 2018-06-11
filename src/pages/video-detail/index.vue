<template>
  <div class="container" v-if="video">
    <video class="video" :src="video.video_url" :poster="video.thumbnail_url" controls="false"></video>
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
          <img class="weui-cell_icon" src="/static/icons/share.png"/>
        </div>
        <div class="weui-cell__bd">分享视频</div>
        <div class="weui-cell__ft weui-cell__ft_in-access"></div>
      </button>
      <div class="weui-cell weui-cell_access" @click="downloadClick">
        <div class="weui-cell_hd">
          <img class="weui-cell_icon" src="/static/icons/download.png"/>
        </div>
        <div class="weui-cell__bd">下载视频</div>
        <div class="weui-cell__ft weui-cell__ft_in-access"></div>
      </div>
    </div>
  </div>
</template>

<script>
import MpCell from 'mp-weui/packages/cell';
import MpCellGroup from 'mp-weui/packages/cell-group';
import { mapActions, mapMutations } from 'vuex';

import fab from '../../components/fab';
import store from '../../store';
import {
  confirm,
  downloadFile,
  saveVideoToPhotosAlbum,
  toast,
  _request,
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
    ...mapMutations(['updateVideoName']),

    async downloadClick() {
      try {
        const path = await downloadFile(this.video.video_url);
        await saveVideoToPhotosAlbum(path);
      } catch (e) {
        console.log(e);
      }
    },

    editName() {
      this.editingName = true;
    },

    async submitName(value) {
      this.editingName = false;

      if (this.video.name === value) return;

      const check = await confirm('是否更新简介?');

      if (check) {
        wx.showLoading({ title: '正在更新...' });

        const newVideo = await _request('videos/' + this.video.id, 'PUT', {
          name: value,
        });

        this.updateVideoName(newVideo);

        wx.hideLoading();
      }
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
  width: calc(100% - 30px);
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
