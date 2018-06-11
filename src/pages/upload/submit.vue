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
import { mapState } from 'vuex';

import store from './store';
import rootStore from '../../store';
import { switchTab, toast, _upload } from '../../util';

export default {
  store,

  computed: mapState(['descr', 'address', 'image']),

  methods: {
    createFormData() {
      let formData = {};
      if (this.descr) {
        formData = { ...formData, description: this.descr };
      }
      if (this.address) {
        formData = { ...formData, location: this.address };
      }
      return formData;
    },

    async upload() {
      if (this.image) {
        await _upload('timeline', this.image, this.createFormData());
        await switchTab('/pages/timeline/main');
        toast('图片上传成功', 'success');
        rootStore.dispatch('fetchPhotos', true);
      } else {
        toast('请选择需要上传的图片');
      }
    },
  },
};
</script>

<style scoped>
</style>
