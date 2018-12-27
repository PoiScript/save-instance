<template>
  <div class="page-content">
    <div v-if="videos.length > 0">
      <video-summary
        v-for="video in videos"
        :key="video.id"
        :video="video"
      ></video-summary>
    </div>
    <big-image
      v-else
      text="视频列表空空如也"
      src="/static/picture/video_empty.jpg"
      text-color="#8e8e8e"
    ></big-image>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import videoSummary from './video-summary'
import store from '../../store'
import bigImage from '../../components/big-image'

export default {
  components: {
    bigImage,
    videoSummary
  },

  store,

  computed: mapState({ videos: state => state.videos.videos }),

}
</script>

<style lang="scss" scoped>
@import '../../theme';

.page-content {
  height: calc(100vh - 55px);
  background-color: $background-color;
}
</style>
