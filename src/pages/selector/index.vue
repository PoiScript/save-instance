<template>
  <div class="selector">
    <div class="item" v-for="photo in photos" :key="photo.id">
      <div
        class="thumbnail"
        :class="{ selected: selected[photo.id] }"
        @click="onSelect(photo.id)"
      >
        <img alt="" class="img" :src="photo.photo_url"/>
      </div>
    </div>
    <footer
      v-if="selectedIds.length > 0"
      :class="{ '-warn': selectedIds.length < 3 }"
    >
      <span v-if="selectedIds.length < 3"
        >还需要选择 {{ 3 - selectedIds.length }} 张照片</span
      >
      <span v-else>已选择 {{ selectedIds.length }} 张照片</span>
      <span class="spacer"></span>
      <span
        v-if="selectedIds.length >= 3"
        @click="generate"
        class="generate-btn"
        >生成视频</span
      >
    </footer>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import store from '../../store'
import config from '../../config'

export default {
  store,

  data() {
    return {
      selectedIds: []
    }
  },

  computed: {
    ...mapState({ photos: state => state.timeline.photos }),

    selected() {
      const result = {}
      for (const id of this.selectedIds) {
        result[id] = true
      }
      return result
    }
  },

  methods: {
    ...mapActions(['fetchVideos']),

    onSelect(id) {
      if (this.selectedIds.includes(id)) {
        this.selectedIds = this.selectedIds.filter(i => i !== id)
      } else {
        this.selectedIds.push(id)
      }
    },

    async generate() {
      if (this.selectedIds.length >= 3) {
        if (window.confirm('是否生成视频?')) {
          try {
            await fetch(config.api_url + 'videos', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ ids: this.selectedIds })
            })
            this.fetchVideos()
            this.selectedIds = []
            window.location = '/pages/video-list/index'
          } catch (e) {
            console.log(e)
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../theme';

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
  border: 1px solid $border-color;
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

footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  color: white;
  background: $primary-color;
  padding: 10px;
  display: flex;

  &.-warn {
    background: $warning-color;
  }
}

.spacer {
  flex: 1 1 auto;
}

.generate-btn {
  font-weight: 700;
}
</style>
