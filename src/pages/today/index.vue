<template>
  <div class="page-content">
    <div class="btn-row">
      <div class="arrow-container" @click="prior">
          <span
            class="arrow -left"
            :class="{ '-disable': reachTheStart }"
          ></span>
      </div>
      <span class="show-title">{{ selectedDate }}</span>
      <div class="arrow-container" @click="next">
          <span
            class="arrow -right"
            :class="{ '-disable': reachTheEnd }"
          ></span>
      </div>
    </div>
    <div class="container">
      <photo v-if="photo" :photo="photo"></photo>
      <a
        style="text-decoration: none"
        v-else-if="reachTheEnd"
        href="/pages/photo-edit/index"
      >
        <big-image
          text="点击发表今日记忆～"
          src="/static/picture/camera.png"
          :img-shake="true"
          text-color="#444"
        ></big-image>
      </a>
      <div v-else>
        <big-image
          src="/static/picture/not_photo.jpg"
          text="这一天没有上传照片"
          text-color="#8e8e8e"
        ></big-image>
      </div>
    </div>
  </div>
</template>

<script>
import { addDays, isSameDay, isToday, subDays } from 'date-fns'
import { mapGetters, mapMutations, mapState } from 'vuex'

import photo from './photo'
import store from '../../store'
import calendar from '../../components/calendar'
import bigImage from '../../components/big-image'

export default {
  components: {
    bigImage,
    photo,
    calendar
  },

  store,

  data() {
    return {
      showCalendar: false
    }
  },

  computed: {
    ...mapGetters(['selectedDate', 'firstMonthInTimeline']),
    ...mapState({
      date: state => state.timeline.selected.date,
      photo: state => state.timeline.selected.photo
    }),

    reachTheStart() {
      return isSameDay(this.date, this.firstMonthInTimeline)
    },

    reachTheEnd() {
      return isToday(this.date)
    }
  },

  methods: {
    ...mapMutations(['setSelectedDate']),

    next() {
      if (!this.reachTheEnd) {
        this.setSelectedDate(addDays(this.date, 1))
      }
    },

    prior() {
      if (!this.reachTheStart) {
        this.setSelectedDate(subDays(this.date, 1))
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../theme';

.page-content {
  height: calc(100vh - 55px);
  background-color: $background-color;
}

.container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: calc(100vh - 110px);
}

.btn-row {
  display: flex;
  padding: 12.5px;
  align-items: center;

  .arrow-container {
    flex: 0 0 20%;
    display: flex;
    align-items: center;
    height: 30px;
  }

  .arrow {
    border-right: 3px solid;
    border-bottom: 3px solid;
    height: 10px;
    width: 10px;
    margin: 0 auto;
    cursor: pointer;

    &.-right {
      transform: rotate(-45deg);
    }

    &.-left {
      transform: rotate(135deg);
    }

    &.-disable {
      color: $disabled-color;
      cursor: default;
    }
  }
}

.show-title {
  flex: 1 1 auto;
  text-align: center;
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
