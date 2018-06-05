<template>
  <div style="margin-left: 50rpx;margin-right: 50rpx;">
    <button @click="chooseAddress" hover-class="button-hover" style="margin-top: 80rpx;">
      <div class="weui-cell weui-cell_access"
           style="border-top: 3rpx solid #f5f5f5;border-bottom: 3rpx solid #f5f5f5;">
        <div class="weui-cell__hd">
          <img class="locate-img" src="/static/icons/locate.png"/>
        </div>
        <div class="weui-cell__bd weui-cell_primary">
          <div v-if="address">{{address}}</div>
          <div v-else>所在位置</div>
        </div>
        <div class="weui-cell__ft weui-cell__ft_in-access"></div>
      </div>
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import store from './store';
import { chooseLocation } from '../../util';

export default {
  store,

  computed: mapState(['address']),

  methods: {
    chooseAddress() {
      chooseLocation().then(res => store.commit('setAddress', res.address));
    },
  },
};
</script>

<style scoped>
.locate-img {
  float: left;
  width: 22.5px;
  height: 22.5px;
  margin-right: 5px;
}
</style>
