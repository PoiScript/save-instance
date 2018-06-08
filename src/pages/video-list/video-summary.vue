<template>
  <a class="video" :href="'/pages/video-detail/main?key=' + video.video_key" hover-class="none">
    <image class="thumbnail" :src="video.thumbnail" mode="aspectFill">
      <div class="duration">{{video.duration}} s</div>
    </image>
    <div class="body">
      <p class="title">{{video.name || '未命名视频'}}</p>
      <p class="date">{{video.created_at}}</p>
    </div>
  </a>
</template>

<script>
export default {
  name: 'videoSummary',
  props: {
    video: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.video {
  padding: 10px;
  background-color: #fff;
  border-bottom: 1px solid #b4b4b4;
  display: flex;
  align-items: flex-start;
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
  background-color: #000;
  height: 25px;
  line-height: 25px;
  opacity: 0.75;
  filter: alpha(opacity=75);
  display: -moz-inline-stack;
  vertical-align: top;
  display: inline-block;
  position: absolute;
  color: #fff;
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
