<template>
  <div class="calendar-mask">
    <div class="calendar-wrapper">
      <div class="top">
        <span class="title">{{title}}</span>
        <span class="spacer"></span>
        <span @click="today">t</span>
        <span @click="prior">p</span>
        <span @click="next">n</span>
      </div>
      <div class="row">
        <div class="week">日</div>
        <div class="week">一</div>
        <div class="week">二</div>
        <div class="week">三</div>
        <div class="week">四</div>
        <div class="week">五</div>
        <div class="week">六</div>
      </div>
      <div class="row" v-for="(chunk, chunkIndex) in dayChunks" :key="chunkIndex">
        <div class="day" v-for="(day, dayIndex) in chunk" :key="dayIndex" @click="day.isFuture ? null : click(day)"
             :class="{ '-other': !day.isSameMonth, '-select': day.isSelect, '-today': day.isToday, '-mark': !!day.photo, '-future': day.isFuture }">
          {{day.date}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  addMonths,
  eachDay,
  endOfWeek,
  format,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  isToday,
  isFuture,
  lastDayOfMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from 'date-fns';
import { mapGetters, mapState, mapMutations } from 'vuex';

import store from '../store';

export default {
  data() {
    return {
      show: new Date(),
    };
  },

  store,

  computed: {
    ...mapState({
      photos: state => state.timeline.photos,
      selected: state => state.timeline.selected.date,
    }),

    title() {
      return format(this.show, 'YYYY 年 M 月');
    },
    dayChunks() {
      const days = eachDay(this.startOfCalendar, this.endOfCalendar).map(
        day => ({
          date: day.getDate(),
          day: day,
          photo: this.photos.find(p => isSameDay(p.created_at, day)),
          isSelect: isSameDay(this.selected, day),
          isToday: isToday(day),
          isSameMonth: isSameMonth(day, this.show),
          isFuture: isFuture(day),
        }),
      );
      const res = [];
      for (let i = 0; i < days.length; i += 7) {
        res.push(days.slice(i, i + 7));
      }
      return res;
    },
    startOfCalendar() {
      return startOfWeek(startOfMonth(this.show));
    },
    endOfCalendar() {
      return endOfWeek(lastDayOfMonth(this.show));
    },
  },

  methods: {
    ...mapMutations(['setSelectedDate', 'setSelectedPhoto']),
    ...mapGetters(['firstDayInTimeline', 'lastDayInTimeline']),

    today() {
      this.show = new Date();
    },
    prior() {
      const lastDayInPriorMonth = lastDayOfMonth(subMonths(this.show, 1));
      if (isAfter(lastDayInPriorMonth, this.firstDayInTimeline)) {
        this.show = lastDayInPriorMonth;
      }
    },
    next() {
      const firstDayInNextMonth = startOfMonth(addMonths(this.show, 1));
      if (isBefore(firstDayInNextMonth, this.lastDayInTimeline)) {
        this.show = firstDayInNextMonth;
      }
    },
    click(day) {
      if (day.photo) {
        this.setSelectedPhoto(day.photo);
      } else {
        this.setSelectedDate(day.day);
      }
      this.$emit('close');
    },
  },
};
</script>
<style lang="scss" scoped>
.calendar-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #2d8cf0;
  display: table;
  color: white;
}

.calendar-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.spacer {
  flex: 1 1 auto;
}

.top {
  padding: 0;
  margin: 0 auto;
  display: flex;
  width: 300px;

  > .title {
    font-size: 20px;
  }
}

.row {
  display: flex;
  justify-content: space-around;
  width: 300px;
  margin: 0 auto;
}

.day {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  font-size: 18px;
  color: #fff;
  line-height: 30px;
  text-align: center;
  margin-top: 5px;

  &.-today {
    position: relative;

    &::before {
      transform: translateX(-50%);
      border-radius: 100%;
      position: absolute;
      background: white;
      bottom: 5px;
      height: 5px;
      width: 5px;
      content: '';
      left: 50%;
    }

    &.-select::before {
      background: #2d8cf0;
    }
  }

  &.-mark {
    border: 2px solid white;
    border-radius: 50%;
  }

  &.-select {
    color: #2d8cf0;
    background-color: white;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    line-height: 32px;
  }

  &.-other {
    color: lighten(#2d8cf0, 30%);

    &.-mark {
      border: 2px solid lighten(#2d8cf0, 30%);
    }
  }

  &.-future {
    color: lighten(#2d8cf0, 30%);
  }
}

.week {
  @extend .day;
  font-size: 15px;
  color: lighten(#2d8cf0, 40%);
}
</style>
