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
    <footer v-if="selectedKey.length > 0" :class="{ warn: selectedKey.length < 5 }">
      <span v-if="selectedKey.length < 5">还需要选择 {{ 5 - selectedKey.length}} 张照片</span>
      <span v-else>已选择 {{ selectedKey.length }} 张照片</span>
      <span class="spacer"></span>
      <span v-if="selectedKey.length >= 5" @click="onSubmit" class="generate-btn">生成视频</span>
    </footer>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import store from '../../store';
import { request, warning, confirm, redirect } from '../../util';

export default {
  store,

  data() {
    return {
      selectedKey: [],
    };
  },

  computed: {
    ...mapState(['photos', 'openId']),

    selected() {
      const result = {};
      for (const key of this.selectedKey) {
        result[key] = true;
      }
      return result;
    },
  },

  methods: {
    ...mapActions(['fetchVideos']),

    onSelect(key) {
      if (this.selectedKey.includes(key)) {
        this.selectedKey = this.selectedKey.filter(k => k !== key);
      } else {
        this.selectedKey.push(key);
      }
    },

    onSubmit() {
      if (this.selectedKey.length >= 5) {
        confirm('是否生成视频?').then(check => {
          if (check) this.generate();
        });
      } else {
        warning(`还需要选择${5 - this.selectedKey.length}张照片!`);
      }
    },

    generate() {
      wx.showToast({
        icon: 'loading',
        title: '正在生成...',
      });

      request('video', 'POST', {
        openId: this.openId,
        keys: this.selectedKey,
      })
        .then(() => this.fetchVideos(true))
        .then(() => {
          this.selectedKey = [];
          wx.hideToast();
        })
        .then(() => confirm('视频生成完毕, 是否跳转到视频列表查看'))
        .then(check => {
          if (check) {
            redirect('/pages/video-list/main');
          }
        });
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

footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  color: #fff;
  background: #2d8cf0;
  padding: 10px;
  display: flex;
}

footer.warn {
  background: #ff9900;
}

.spacer {
  flex: 1 1 auto;
}

.generate-btn {
  font-weight: 700;
}
</style>
