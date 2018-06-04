<template>
  <div style="margin-left: 270rpx;margin-right: 260rpx;">
    <button @click="upload" hover-class="button-hover" style="margin-top: 150rpx;">
      <div class="weui-cell weui-cell_access button-lines">
        <div class="weui-cell__hd">
          <img src="/static/icons/submit.png" style="float:left;width: 50rpx;height: 50rpx;margin-right: 10rpx;"/>
        </div>
        <div class="weui-cell__bd weui-cell_primary">
          <div>发表</div>
        </div>
      </div>
    </button>
  </div>
</template>

<script>
import rootStore from '../../store';
import { upload, showWarning, switchTab } from '../../util';

import store from './store';

export default {
  computed: {
    descr() {
      return store.state.descr;
    },
    address() {
      return store.state.address;
    },
    image() {
      return store.state.image;
    },
    openId() {
      return rootStore.state.openId;
    },
  },
  methods: {
    createFormData() {
      let formData = { openId: this.openId };
      if (this.descr) {
        formData = { ...formData, description: this.descr };
      }
      if (this.address) {
        formData = { ...formData, location: this.address };
      }
      return formData;
    },

    upload() {
      wx.showToast({
        icon: 'loading',
        title: '正在上传',
      });

      upload('upload', this.image, this.createFormData())
        .catch(() => showWarning('上传失败'))
        .then(() => switchTab('/pages/timeline/main'))
        .then(() => store.dispatch('fetchPhotos'))
        .finally(() => wx.hideToast());
    },
  },
};
</script>

<style scoped>
</style>
