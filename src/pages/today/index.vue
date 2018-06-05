<template>
  <form report-submit="true" class="container">
    <today-photo v-if="hasPhotoToday"></today-photo>
    <ripple type="circle" v-else>
      <div class="photo-anchor" @click="navigateToUpload">
        <img src="/static/icons/pic.png" class="img"/>
        <button>点击发表今日记忆～</button>
      </div>
    </ripple>
  </form>
</template>

<script>
import ripple from 'mpvue-ripple';
import { mapGetters } from 'vuex';

import TodayPhoto from './today-photo';
import store from '../../store.js';
import { navigate } from '../../util';

export default {
  components: {
    ripple,
    TodayPhoto,
  },

  store,

  computed: mapGetters(['hasPhotoToday']),

  methods: {
    navigateToUpload() {
      navigate('/pages/upload/main');
    },
  },
};
</script>

<style>
page {
  height: 100%;
}

.img {
  width: 140px;
  height: 140px;
}

button,
button::after {
  margin-left: 0;
  margin-right: 0;
  padding: 0;
  box-sizing: unset;
  border: none;
  border-radius: 0;
  background-color: transparent;
  text-align: center;
  line-height: 1.5;
  -webkit-tap-highlight-color: transparent;
}

.container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.photo-anchor {
  text-align: center;
}
</style>
