<template>
  <div class="video" @click="navigate">
    <div class="thumbnail" v-bind:style="{ backgroundImage: 'url(' + video.photo_url + ')' }">
      <div class="duration">{{ video.length }} s</div>
    </div>
    <div class="body">
      <p class="title">{{ video.name || '未命名视频' }}</p>
      <p class="date">{{ video.date }}</p>
    </div>
  </div>
</template>

<script>
import store from '../../store'

export default {
  name: 'videoSummary',
  props: {
    video: {
      type: Object,
      required: true
    }
  },

  store,

  methods: {
    navigate() {
      window.location = this.video.video_url
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../theme';

.video {
  padding: 10px;
  background-color: white;
  border-bottom: 1px solid $divider-color;
  display: flex;
  align-items: flex-start;
  cursor: pointer;
}

.thumbnail {
  position: relative;
  width: 125px;
  height: 100px;
  margin: 0 15px 0 0;
}

.duration {
  margin-top: 0;
  margin-right: 0;
  padding: 0 4px;
  font-weight: 500;
  font-size: 15px;
  background-color: black;
  height: 25px;
  line-height: 25px;
  opacity: 0.75;
  filter: alpha(opacity=75);
  display: -moz-inline-stack;
  vertical-align: top;
  display: inline-block;
  position: absolute;
  color: white;
  bottom: 0;
  right: 0;
  z-index: 1;
}

.body {
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.title {
  flex: 1;
}

.date {
  color: #767676;
  line-height: 1.3em;
}
</style>
