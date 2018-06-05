<template>
  <div class="weui-uploader__bd">
    <div v-if="image" class="weui-uploader__files" id="uploaderFiles">
      <div class="weui-uploader__file" @click="preview" :id="item" style="margin-top: 10rpx">
        <img class="weui-uploader__img" :src="image" mode="aspectFill"
             style="margin-left:50rpx;margin-top: 30rpx;height:220rpx;width: 220rpx;"/>
      </div>
      <img @click="remove" src="/static/icons/delete.png" style="position: absolute;height: 38rpx;width: 38rpx;margin-left: -38rpx;margin-top: 30rpx;"/>
    </div>
    <div v-else class="weui-uploader__input-box"
         style="margin-left:50rpx;margin-top: 30rpx;height:220rpx;width: 220rpx;background-color: #f5f5f5;border-color:#f5f5f5 ">
      <div class="weui-uploader__input" @click="choose"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import store from './store';
import { chooseImage } from '../../util';

export default {
  store,

  computed: mapState(['image']),

  methods: {
    choose() {
      chooseImage().then(path => store.commit('setImage', path));
    },

    remove() {
      store.commit('setImage', null);
    },

    preview(e) {
      wx.previewImage({
        current: e.currentTarget.id, // 当前显示图片的http链接
        urls: [this.image], // 需要预览的图片http链接列表
      });
    },
  },
};
</script>

<style scoped>
</style>
