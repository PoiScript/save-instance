<template>
  <li @click="preview" class="item" v-if="photo" v-bind:style="{ backgroundImage: 'url(' + photo.image_url + ')' }">
    <span class="dot"></span>
    <div class="time">
      <p>{{date}}</p>
      <p>{{time}}</p>
    </div>
    <div class="shadow" v-if="photo.description">
      {{photo.description}}
    </div>
  </li>
</template>

<script>
import format from 'date-fns/format';

export default {
  props: ['photo'],

  data() {
    return {
      date: format(this.photo.created_at, 'M 月 D 日'),
      time: format(this.photo.created_at, 'HH : mm'),
    };
  },

  methods: {
    preview() {
      wx.previewImage({
        current: this.photo.image_url,
        urls: [this.photo.image_url],
      });
    },
  },
};
</script>

<style scoped>
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
  left: -28.5px;
}

.dot:before {
  content: '';
  display: block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #2d8cf0;
  border: 2px solid #fff;
  position: absolute;
  left: -6px;
  top: -10px;
}

.shadow {
  background-color: rgba(0, 0, 0, 0.65);
  position: absolute;
  color: #fff;
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
  color: #fff;
  font-size: 80%;
  font-weight: bold;
  top: -15px;
  text-align: center;
}
</style>
