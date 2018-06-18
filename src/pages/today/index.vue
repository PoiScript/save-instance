<template>
  <form report-submit="true" class="container">
    <div class="btn-row">
      <span @click="prior">prior</span>
      <span class="show-title" @click="showCalendar = true">{{selectedDate}}</span>
      <span @click="next">next</span>
    </div>
    <photo v-if="photo" :photo="photo"></photo>
    <a class="empty-photo" href="/pages/photo-edit/main" v-else hover-class="none">
      <ripple type="circle">
        <big-image text="点击发表今日记忆～" src="/static/picture/camera.png" :img-shake="true"></big-image>
      </ripple>
    </a>
    <div :class="showCalendar ? 'calendar-visible' : 'calendar-hidden'">
      <calendar @close="showCalendar = false"></calendar>
    </div>
  </form>
</template>

<script>
import { addDays, subDays, isAfter } from 'date-fns';
import ripple from 'mpvue-ripple';
import { mapGetters, mapMutations, mapState } from 'vuex';

import photo from './photo';
import store from '../../store';
import bigImage from '../../components/big-image';

import calendar from '../../components/calendar';

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
    };
  },

  computed: {
    ...mapGetters(['selectedDate', 'isSelectedToday', 'firstDayInTimeline']),
    ...mapState({
      date: state => state.timeline.selected.date,
      photo: state => state.timeline.selected.photo,
    }),
  },

  methods: {
    ...mapMutations(['setSelectedDate']),

    next() {
      if (!this.isSelectedToday) {
        this.setSelectedDate(addDays(this.date, 1));
      }
    },
    prior() {
      if (isAfter(this.date, this.firstDayInTimeline)) {
        this.setSelectedDate(subDays(this.date, 1));
      }
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

.calendar-visible {
  visibility: visible;
  opacity: 1;
  transition: all 0.33s linear;
}

.calendar-hidden {
  visibility: hidden;
  opacity: 0;
}
</style>
