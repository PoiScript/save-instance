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
import config from '../../config';
import rootStore from '../../store';
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
    upload() {
      wx.showToast({
        icon: 'loading',
        title: '正在上传',
      });

      let formData = { openId: this.openId };
      if (this.descr) {
        formData = { ...formData, description: this.descr };
      }
      if (this.address) {
        formData = { ...formData, location: this.address };
      }

      wx.uploadFile({
        url: config.api_url + 'upload',
        filePath: this.image,
        name: 'photo',
        header: { 'content-type': 'multipart/form-data' },
        formData,
        success: res => {
          if (res.statusCode !== 200) {
            wx.showModal({
              title: '提示',
              content: '上传失败',
              showCancel: false,
            });
          }
          // TODO: navigate to timeline
        },
        fail: e => {
          console.log(e);
          wx.showModal({
            title: '提示',
            content: '上传失败',
            showCancel: false,
          });
        },
        complete: () => {
          wx.hideToast(); //隐藏Toast
        },
      });
    },
  },
};
</script>

<style scoped>
</style>
