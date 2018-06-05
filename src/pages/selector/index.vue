<template>
  <div class="selector">
    <div class="item" v-for="photo in photos" :key="photo.photo_key">
      <div
        class="thumbnail"
        :class="{ selected: selected[photo.photo_key] }"
        @click="onSelect(photo.photo_key)">
        <image class="img" :src="photo.image" mode="aspectFill"></image>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import store from '../../store';

export default {
  store,

  data() {
    return {
      selectedKey: [],
    };
  },

  computed: {
    ...mapState(['photos']),

    selected() {
      const result = {};
      for (const key of this.selectedKey) {
        result[key] = true;
      }
      return result;
    },
  },

  methods: {
    onSelect(key) {
      if (this.selectedKey.includes(key)) {
        this.selectedKey = this.selectedKey.filter(k => k !== key);
      } else {
        this.selectedKey.push(key);
      }
    },
  },
};
</script>

<style scoped>
.selector {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  display: flex;
  flex: 0 1 auto;
  flex-direction: row;
  flex-wrap: wrap;
}

.item {
  box-sizing: border-box;
  max-width: 33.33333333%;
  flex: 0 0 33.33333333%;
  margin: 0;
}

.thumbnail {
  border: 1px solid #dddddd;
  transition: all 0.2s ease-in-out;
}

.selected {
  transform: scale(0.9);
}

.img {
  display: block;
  height: 125px;
  max-width: 100%;
}
</style>
