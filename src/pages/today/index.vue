<template>
  <form report-submit="true" class="container">
      <div class="btn-row">
        <span @click="prior">prior</span>
        <span class="show-title" @click="showCalendar = true">{{title}}</span>
        <span @click="next">next</span>
      </div>
      <photo v-if="photo" :photo="photo"></photo>
      <a class="empty-photo" href="/pages/photo-edit/main" v-else hover-class="none">
        <ripple type="circle">
          <big-image text="点击发表今日记忆～" src="/static/picture/camera.png" :img-shake="true"></big-image>
        </ripple>
      </a>
      <calendar v-if="showCalendar" @dateClick="dateClick" :select="selectedDate"></calendar>
  </form>
</template>

<script>
import ripple from 'mpvue-ripple';
import { mapState } from 'vuex';

import photo from './photo';
import store from '../../store.js';
import bigImage from '../../components/big-image';

import calendar from '../../components/calendar';

import { addDays, format, isSameDay, subDays } from 'date-fns';

export default {
  components: {
    bigImage,
    ripple,
    photo,
    calendar,
  },

  store,

  data() {
    return {
      showCalendar: false,
      selectedDate: new Date(),
    };
  },

  computed: {
    ...mapState(['photos']),
    photo() {
      return this.photos.find(p => isSameDay(this.selectedDate, p.created_at));
    },
    title() {
      return format(this.selectedDate, 'YYYY/MM/DD');
    },
  },

  methods: {
    dateClick(date) {
      this.showCalendar = false;
      this.selectedDate = date;
    },
    next() {
      this.selectedDate = addDays(this.selectedDate, 1);
    },
    prior() {
      this.selectedDate = subDays(this.selectedDate, 1);
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

.empty-photo {
  width: 320px;
  padding: 100px 0;
}
</style>
