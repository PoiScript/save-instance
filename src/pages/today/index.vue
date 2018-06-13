<template>
  <form report-submit="true" class="container">
      <div class="btn-row">
        <span @click="prior">prior</span>
        <span class="show-title" @click="showModal = !showModal">{{title}}</span>
        <span @click="next">next</span>
      </div>
      <today-photo v-if="hasPhotoToday"></today-photo>
      <a href="/pages/upload/main" v-else hover-class="none">
        <ripple type="circle">
          <big-image text="点击发表今日记忆～" src="/static/picture/camera.png" :img-shake="true"></big-image>
        </ripple>
      </a>
      <calendar v-if="showModal" @close="showModal = false" @dateClick="dateClick" :select="select"></calendar>
  </form>
</template>

<script>
import ripple from 'mpvue-ripple';
import { mapGetters } from 'vuex';

import TodayPhoto from './today-photo';
import store from '../../store.js';
import bigImage from '../../components/big-image';

import calendar from '../../components/calendar';

import { addDays, format, startOfToday, subDays } from 'date-fns';

export default {
  components: {
    bigImage,
    ripple,
    TodayPhoto,
    calendar,
  },

  data() {
    return {
      showModal: false,
      select: startOfToday().getTime(),
    };
  },

  store,

  computed: {
    ...mapGetters(['hasPhotoToday']),
    title() {
      return format(this.select, 'YYYY/MM/DD');
    },
  },

  methods: {
    dateClick(timestamp) {
      this.select = timestamp;
    },
    next() {
      this.select = addDays(this.select, 1).getTime();
    },
    prior() {
      this.select = subDays(this.select, 1).getTime();
    },
  },
};
</script>

<style>
page {
  width: 100%;
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

.btn-row {
  display: flex;
  margin: 0 10px;
}

.show-title {
  flex: 1 1 auto;
  text-align: center;
}
</style>
