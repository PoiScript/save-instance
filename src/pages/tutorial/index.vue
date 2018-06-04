<template>
  <div class="page">
    <swiper :indicator-dots="true"
            :duration="900"
            :circular="false"
            class="swiper-img">
      <div v-for="(url, index) in imgUrls" :key="index">
        <swiper-item>
          <img :src="url" class="slide-image"/>
          <div v-if="index === imgUrls.length - 1" class="btn" @click="navigate">点击开启咔记</div>
        </swiper-item>
      </div>
    </swiper>
  </div>
</template>

<script>
import { switchTab } from '../../util';

export default {
  data() {
    return {
      imgUrls: [
        '/static/picture/introduce1.png',
        '/static/picture/introduce2.png',
        '/static/picture/introduce3.png',
      ],
    };
  },
  methods: {
    navigate() {
      switchTab('/pages/today/main');
    },
  },
};
</script>
<style scoped>
.page {
  height: 100%;
  width: 375px;
  position: fixed;
  overflow-x: hidden;
}

.slide-image {
  width: 100%;
  height: 100%;
  position: relative;
}

.swiper-img {
  height: 100%;
  width: 100%;
}

.btn {
  position: absolute;
  left: 224px;
  top: 10px;
  background-color: transparent;
  color: black;
  width: 150px;
  height: 40px;
  font-size: 17px;
  font-weight: bold;
  border: none;
}
</style>
