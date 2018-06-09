<template>
  <form report-submit="true" class="container">
    <today-photo v-if="hasPhotoToday"></today-photo>
    <a href="/pages/upload/main" v-else hover-class="none">
      <ripple type="circle">
        <big-image text="点击发表今日记忆～" src="/static/picture/camera.png" :img-shake="true"></big-image>
      </ripple>
    </a>
  </form>
</template>

<script>
import ripple from 'mpvue-ripple';
import { mapGetters } from 'vuex';

import TodayPhoto from './today-photo';
import store from '../../store.js';
import bigImage from '../../components/big-image';

export default {
  components: {
    bigImage,
    ripple,
    TodayPhoto,
  },

  store,

  computed: mapGetters(['hasPhotoToday']),
};
</script>

<style>
page {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
}

.container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
