<template>
  <div class="page">
    <swiper :indicator-dots="indicatorDots"
            :autoplay="autoplay"
            :interval="interval"
            :duration="duration"
            :circular="circular"
            @change="swiperChange"
            @animationfinish="animationfinish"
            class="swiper-img">
      <div v-for="item in imgUrls" :key="index">
        <swiper-item>
          <image :src="item" class="slide-image"></image>
          <div v-if="item==imgUrls[2]" class="btn" @click="navigate">点击开始咔记 ></div>
        </swiper-item>
      </div>
    </swiper>
  </div>
</template>

<script>
export default {
  data() {
    return {
      indicatorDots: true, //是否显示面板指示点
      duration: 900, //滑动动画时长
      circular: false, //是否采用衔接滑动
      imgUrls: [
        'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
      ],
    };
  },
  methods: {
    swiperChange(e) {
      console.log('第' + e.mp.detail.current + '张轮播图发生了滑动');
    },
    animationfinish(e) {
      console.log('第' + e.mp.detail.current + '张轮播图滑动结束');
    },
    navigate() {
      wx.switchTab({
        url: '/pages/today/main',
        success: () => {
          console.log('success');
        },
      });
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
  left: 240px;
  top: 10px;
  background-color: transparent;
  color: white;
  font-size: 18px;
  border: none;
}
</style>
