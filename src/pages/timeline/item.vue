<template>
  <li class="item" v-bind:style="{ backgroundImage: 'url(' + photo.photo_url + ')' }">
    <span class="dot"></span>
    <div class="time">
      <p>{{ date }}</p>
      <p>{{ time }}</p>
    </div>
    <div class="shadow" v-if="photo.description">{{ photo.description }}</div>
    <div class="shadow">{{ photo.description }}</div>
  </li>
</template>

<script>
import format from 'date-fns/format'

import config from '../../config'

export default {
  props: {
    photo: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      date: format(this.photo.date, 'M 月 D 日'),
      time: format(this.photo.date, 'HH : mm'),
      image: config.api_url + this.photo.id + '.jpg'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../theme';

.item {
  /* 375px - 180px */
  height: 215px;
  position: relative;
  border-radius: 10px;
  margin: 0 0 30px 60px;
  width: calc(100% - 90px);
  background-size: cover;
  background-position: center center;
}

.dot {
  content: '';
  display: block;
  width: 0;
  height: 100%;
  position: absolute;
  top: 0;
  left: -30px;
}

.dot:before {
  content: '';
  display: block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: $primary-color;
  border: 2px solid white;
  position: absolute;
  left: -6px;
  top: -10px;
}

.shadow {
  background-color: rgba(0, 0, 0, 0.65);
  position: absolute;
  color: white;
  bottom: 0;
  right: 0;
  left: 0;
  padding: 10px;
  border-radius: 0 0 10px 10px;
  overflow: scroll;
  max-height: 2em;
}

.time {
  position: absolute;
  left: -100px;
  color: white;
  font-size: 80%;
  font-weight: bold;
  text-align: center;

  p {
    margin: 0;
    padding: 0;
  }
}
</style>
