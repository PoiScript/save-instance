<template>
  <div>
    <div class="show" v-if="hasPhotoToday">
      <div class="show">
        <div class="show"><img :src="api_url + photo.image" class="showBody showImage"></div>
        <div class="show"><p class="showBody showText">{{photo.description}}</p></div>
        <div class="show"><p class="showBody showAddress">{{photo.location}}</p></div>
      </div>
    </div>
    <div class="userbackground" v-else>
      <form report-submit="true" @submit="formSubmit">
        <button form-type="submit">
          <div class="updiv"></div>
        </button>
        <div class="imgdiv" @click="navigate">
          <ripple type="circle">
            <image src="/static/icons/pic.png" class="img"></image>
          </ripple>
        </div>
        <div class="btndiv" @click="navigate">
          <ripple type="circle">
            <button>点击上传今日记忆～</button>
          </ripple>
        </div>
        <button form-type="submit">
          <div class="bottomdiv"></div>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import ripple from 'mpvue-ripple';

import config from '../../config.js';
import store from '../../store.js';

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

  data() {
    return {
      api_url: config.api_url,
    };
  },

  methods: {
    navigate() {
      wx.navigateTo({
        url: '/pages/update/main',
        success: () => {
          console.log('success');
        },
      });
    },
  },
};
</script>

<style>
.userbackground {
  background-color: #ffffff;
  height: 100%;
  width: 750rpx;
  position: fixed;
  overflow-x: hidden;
}

.btndiv {
  margin-top: 15px;
  margin-left: 97.5px;
  margin-right: 97.5px;
}

.updiv {
  height: 157.5px;
}

.bottomdiv {
  height: 165px;
}

.imgdiv {
  margin-left: 117.5px;
  width: 130px;
  height: 130px;
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
.show {
  margin: 0 auto;
  padding: 0;
  border: 0;
  width: 100%;
}
.showBody {
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 5%;
  width: 80%;
}
.showImage {
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 5%;
  width: 80%;
}
.showText {
  text-align: center;
  font-size: 14px;
  color: #000000;
}

.showAddress {
  text-align: center;
  font-size: 14px;
  color: #000000;
}
</style>
