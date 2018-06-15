<template>
  <div class="video-player">
    <div class="video-container">
      <video class="video" id="video" :src="video.video_url" :poster="video.thumbnail_url" :controls="false"
             @play="onPlay" @pause="onPause" @ended="onPause"></video>
    </div>
    <div class="weui-cells video-content">
      <cover-view class="fab" @click="toggle">
        <cover-image class="img" :src="fab_icon"></cover-image>
      </cover-view>
      <h2 class="title" :class="{'-empty': !video.name}">{{video.name || '未命名'}}</h2>
      <h3 class="subtitle">{{video.created_at}} | {{video.length}}s</h3>
      <p class="description" :class="{'-empty': !video.description}">没有视频描述</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'video-player',

  props: {
    video: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      videoContext: wx.createVideoContext('video'),
      playing: false,
    };
  },

  computed: {
    fab_icon() {
      return this.playing
        ? '/static/icons/pause.png'
        : '/static/icons/play.png';
    },
  },

  methods: {
    onPlay() {
      this.playing = true;
    },

    onPause() {
      this.playing = false;
    },

    toggle() {
      if (this.playing) {
        this.playing = false;
        this.videoContext.pause();
      } else {
        this.playing = true;
        this.videoContext.play();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../theme';

.video-player {
  width: 100%;
}

.video-container {
  width: 100%;
  height: 213px;

  .video {
    height: 100%;
    width: 100%;
  }
}

.video-content {
  width: calc(100% - 30px);
  margin: 0;
  padding: 10px 15px;
  position: relative;

  > .fab {
    right: 16px;
    top: -25px;
    z-index: 9999;
    position: absolute;
    width: 50px;
    height: 50px;
    background-color: red;
    border-radius: 50%;
    font-size: 50px;
    text-align: center;
    line-height: 45px;
    box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2),
      0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);

    .img {
      margin: 10px;
      width: 30px;
      height: 30px;
    }
  }

  > .title {
    color: $title-color;
    font-size: 20px;

    &.-empty {
      color: $sub-color;
      font-style: italic;
    }
  }

  > .subtitle {
    color: $title-color;
    font-size: 15px;
  }

  > .description {
    padding-top: 10px;
    color: $content-color;

    &.-empty {
      color: $sub-color;
      font-style: italic;
    }
  }
}
</style>
