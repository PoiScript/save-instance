<template>
  <div class="container" v-if="video">
    <video class="video" :src="video.video"
           :poster="video.thumbnail"
           controls></video>
    <div class="action-row">
      <div class="action">
        <img class="action-img" src="/static/icons/edit.png"/>
        <p class="action-text">重命名</p>
      </div>
      <div class="action">
        <img class="action-img" src="/static/icons/download.png"/>
        <p class="action-text">下载</p>
      </div>
      <div class="action">
        <img class="action-img" src="/static/icons/share.png"/>
        <p class="action-text">分享</p>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../../store';

export default {
  data() {
    return {
      key: 0,
    };
  },

  computed: {
    video() {
      return this.$store.getters.getVideoByKey(
        parseInt(this.$root.$mp.query.key),
      );
    },
  },

  store,

  onLoad(options) {
    this.key = options.key;
  },

  methods: {},
};
</script>

<style>
page {
  height: 100%;
  background-color: #f5f5f5;
}

.container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.video {
  width: 100%;
}

.action-row {
  padding-top: 15px;
  margin: 0;
  box-sizing: border-box;
  display: flex;
  flex: 0 1 auto;
  flex-direction: row;
  width: 100%;
}

.action {
  box-sizing: border-box;
  max-width: 33.33333333%;
  flex: 0 0 33.33333333%;
  margin: 0;
  text-align: center;
}

.action-img {
  width: 30px;
  height: 30px;
}
</style>
