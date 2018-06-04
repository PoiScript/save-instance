<template>
  <form report-submit="true" class="container">
    <div v-if="hasPhotoToday" class="polaroid-images">
      <div class="a">
        <img :src="photo.image"/>
      </div>
    </div>
    <ripple type="circle" v-else>
      <div @click="navigateToUpload">
        <img src="/static/icons/pic.png" class="img"/>
        <button>点击上传今日记忆～</button>
      </div>
    </ripple>
  </form>
</template>

<script>
import ripple from 'mpvue-ripple';

import store from '../../store.js';
import { navigate } from '../../util';

export default {
  components: {
    ripple,
  },

  computed: {
    hasPhotoToday() {
      return store.getters.hasPhotoToday;
    },

    photo() {
      return store.getters.firstPhoto;
    },
  },

  methods: {
    navigateToUpload() {
      navigate('/pages/update/main');
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

.a {
  background: white;
  margin: 0 15px 30px;
  padding: 10px 10px 25px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}
</style>
