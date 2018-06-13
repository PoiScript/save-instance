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
      <div class="content">
        <div class="week">日</div>
        <div class="week">一</div>
        <div class="week">二</div>
        <div class="week">三</div>
        <div class="week">四</div>
        <div class="week">五</div>
        <div class="week">六</div>
        <div class="day -mark" v-for="day in days" :key="day.timestamp" @click="click(day.timestamp)"
             :class="{ '-other': !day.isSameMonth, '-select': day.isSelect, '-today': day.isToday }">
          <div>{{day.date}}</div>
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
  lastDayOfMonth,
  startOfMonth,
  startOfToday,
  startOfWeek,
  subMonths,
} from 'date-fns';

export default {
  props: {
    select: {
      type: Number,
      required: true,
    },
    markDate: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      select: startOfToday(),
      show: startOfToday(),
    };
  },

  computed: {
    title() {
      return format(this.show, 'YYYY 年 M 月');
    },
    start() {
      return this.markDate[0];
    },
    end() {
      return this.markDate[this.markDate.length - 1];
    },
    days() {
      return eachDay(
        startOfWeek(this.firstDayInMonth),
        endOfWeek(this.lastDayInMonth),
      ).map(day => ({
        date: day.getDate(),
        isSelect: isSameDay(this.select, day),
        isToday: isToday(day),
        isSameMonth: isSameMonth(day, this.firstDayInMonth),
        timestamp: day.getTime(),
      }));
    },
    firstDayInMonth() {
      return startOfMonth(this.show);
    },
    lastDayInMonth() {
      return lastDayOfMonth(this.show);
    },
  },

  methods: {
    today() {
      this.show = startOfToday();
    },
    prior() {
      const lastDayInPriorMonth = lastDayOfMonth(subMonths(this.show, 1));
      if (isAfter(lastDayInPriorMonth, this.start)) {
        this.show = lastDayInPriorMonth;
      }
    },
    next() {
      const firstDayInNextMonth = startOfMonth(addMonths(this.show, 1));
      if (isBefore(firstDayInNextMonth, this.end)) {
        this.show = firstDayInNextMonth;
      }
    },
    click(timestamp) {
      this.$emit('close');
      if (!isSameDay(timestamp, this.select)) {
        this.$emit('dateClick', timestamp);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.calendar-enter-active,
.calendar-leave-active {
  transition: opacity 0.5s;
}

.calendar-enter, .calendar-leave-to /* .fade-leave-active below version 2.1.8 */
 {
  opacity: 0;
}

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

.calendar-container {
  background-color: #2d8cf0;
  flex-direction: column;
}

.spacer {
  flex: 1 1 auto;
}

.top {
  padding: 0 16px;
  display: flex;
}

.content {
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  justify-content: space-between;
  width: 100%;
}

.day {
  padding: 10px;
  display: flex;
  text-align: center;
  height: 10vw;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  max-width: 10%;
  flex: 0 0 10%;
  margin: 2vw;

  &.-mark {
    border: 2px solid white;
    border-radius: 50%;
  }

  &.-select {
    color: #2d8cf0;
    background-color: white;
    border-radius: 50%;
  }

  &.-other {
    color: lighten(#2d8cf0, 30%);

    &.-mark {
      border: 2px solid lighten(#2d8cf0, 30%);
    }
  }
}

.week {
  @extend .day;
  color: lighten(#2d8cf0, 40%);
}
</style>
