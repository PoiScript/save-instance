<template>
  <div>
    <div class="photo">
      <img :src="firstPhoto.image"/>
    </div>
    <mp-cell-group :title="format(firstPhoto.created_at)">
      <mp-cell
        icon-src="/static/icons/period.png"
        :content="firstPhoto.description"
      />
      <mp-cell
        icon-src="/static/icons/locate.png"
        :content="firstPhoto.location"
      />
    </mp-cell-group>
  </div>
</template>

<script>
import format from 'date-fns/format';
import MpCell from 'mp-weui/packages/cell';
import MpCellGroup from 'mp-weui/packages/cell-group';
import { mapGetters } from 'vuex';

import store from '../../store.js';

export default {
  name: 'TodayPhoto',

  components: {
    MpCell,
    MpCellGroup,
  },

  store,

  computed: mapGetters(['firstPhoto']),

  methods: {
    format(date) {
      return format(date, 'M 月 D 日 HH : mm');
    },
  },
};
</script>

<style scoped>
.photo {
  background: white;
  margin: 0 15px 30px;
  padding: 10px 10px 25px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}
</style>
