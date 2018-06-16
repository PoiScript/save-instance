<template>
  <div>
    <div class="video-thumbnail" :style="{ backgroundImage: thumbnail_url ? 'url(' + thumbnail_url + ')' : '' }"></div>
    <div class="input-cells">
      <div class="weui-cell weui-cell_access">
        <div class="weui-cell__hd">
          <img class="icon" src="/static/icons/description.png"/>
        </div>
        <div class="weui-cell__bd weui-cell_primary">名字</div>
      </div>
      <input class="text" v-model="name" placeholder="添加名字">
      <div class="weui-cell weui-cell_access">
        <div class="weui-cell__hd">
          <img class="icon" src="/static/icons/description.png"/>
        </div>
        <div class="weui-cell__bd weui-cell_primary">简介</div>
        <div class="weui-cell__ft">{{wordCount}}</div>
      </div>
      <textarea class="text" v-model="description" placeholder="添加简介"
                :cursor-spacing="0" :show-confirm-bar="false"></textarea>
    </div>
    <div class="submit-button" @click="submit">
      <img src="/static/icons/submit.png" class="icon"/>
      <span>发表</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import store from '../../store';
import { request, warning } from '../../util';

export default {
  data() {
    return {
      thumbnail_url: '',
      name: '',
      originalName: '',
      description: '',
      originalDescription: '',
    };
  },

  computed: {
    wordCount() {
      return this.description ? this.description.length : 0;
    },
  },

  onShow() {
    const video = this.$store.getters.getVideoById(this.$root.$mp.query.id);
    this.thumbnail_url = video.thumbnail_url;
    this.originalName = this.name = video.name;
    this.originalDescription = this.description = video.description;
  },

  store,

  methods: {
    ...mapGetters(['getVideoById']),

    async submit() {
      wx.showLoading({ title: '正在更新视频信息...' });
      if (
        this.name !== this.originalName ||
        this.description !== this.originalDescription
      ) {
        try {
          await request('videos/' + this.$root.$mp.query.id, 'PUT', {
            name: this.name,
            description: this.description,
          });
          await store.dispatch('fetchVideos', true);
        } catch (e) {
          console.log(e);
          warning('视频信息更新失败!');
        }
      }
      wx.hideLoading();
      wx.navigateBack();
    },
  },
};
</script>

<style lang="scss" scoped>
.video-thumbnail {
  width: 100%;
  height: 213px;
  background-size: cover;
  background-position: center center;
  box-shadow: inset 0 24px 38px 3px rgba(0, 0, 0, 0.14),
    inset 0 9px 46px 8px rgba(0, 0, 0, 0.12),
    inset 0 11px 15px -7px rgba(0, 0, 0, 0.2);
}

.input-cells {
  margin: 40px 25px 15px 25px;
  border-top: 2px solid #f5f5f5;
  border-bottom: 2px solid #f5f5f5;

  .icon {
    float: left;
    width: 22.5px;
    height: 22.5px;
    margin-right: 5px;
  }

  .text {
    position: initial;
    padding: 0 15px;
    height: 60px;
  }
}

.submit-button {
  margin: 0 25px 40px 25px;
  display: flex;
  align-items: center;
  justify-content: center;

  > .icon {
    float: left;
    width: 25px;
    height: 25px;
    margin-right: 5px;
  }
}
</style>
