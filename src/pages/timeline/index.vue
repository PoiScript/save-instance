<template>
  <div class="box">
    <ul>
      <item v-for="photo in photos" :key="photo.photo_key" :photo="photo"></item>
    </ul>
    <a href="/pages/selector/main" class="timeline--fab-container" hover-class="none">
      <fab icon-img="/static/icons/movie.png"></fab>
    </a>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import item from './item';
import fab from '../../components/fab';
import store from '../../store';

export default {
  components: {
    fab,
    item,
  },

  store,

  computed: mapState(['photos']),

  onPullDownRefresh() {
    store.dispatch('fetchPhotos', true).then(() => wx.stopPullDownRefresh());
  },
};
</script>

<style>
page {
  width: 100%;
  background-color: #2d8cf0;
}

.box {
  margin: 0;
  padding: 0 0 25px 60px;
  background-color: #2d8cf0;
}

.box ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  position: relative;
  top: 25px;
}

.box ul:before {
  content: '';
  display: block;
  width: 0;
  height: 100%;
  border: 1px solid #fff;
  position: absolute;
  top: 0;
  left: 30px;
}

.timeline--fab-container {
  position: fixed;
  right: 16px;
  bottom: 16px;
}
</style>
