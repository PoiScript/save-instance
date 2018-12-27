<template>
  <div class="page-content">
    <div v-if="photos.length > 0" class="timeline">
      <div class="item-container">
        <item v-for="photo in photos" :key="photo.id" :photo="photo"></item>
      </div>
      <a href="/pages/selector/index" class="fab-container">
        <fab icon="/static/icons/movie.png"></fab>
      </a>
    </div>
    <div v-else class="empty-image-container">
      <big-image
        src="/static/picture/timeline_empty.jpg"
        text="时光轴空空如也"
        text-color="#fff"
      ></big-image>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import item from './item'
import fab from '../../components/fab'
import bigImage from '../../components/big-image'
import store from '../../store'

export default {
  components: {
    bigImage,
    fab,
    item
  },

  store,

  computed: mapState({ photos: state => state.timeline.photos })
}
</script>

<style scoped>
.page-content {
  min-height: calc(100vh - 55px);
  background: linear-gradient(to right, #2d8cf0, #5ac4f8);
  margin-bottom: 55px;
}

.timeline {
  margin: 0;
  padding: 0 0 25px 60px;
}

.item-container {
  list-style-type: none;
  margin: 0;
  padding: 0;
  position: relative;
  top: 25px;
}

.item-container:before {
  content: '';
  display: block;
  width: 0;
  height: 100%;
  border: 1px solid white;
  position: absolute;
  top: 0;
  left: 30px;
}

.fab-container {
  position: fixed;
  right: 16px;
  bottom: 71px; /* 16px + 55px */
}

.empty-image-container {
  height: calc(100vh - 55px);
}
</style>
