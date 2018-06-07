<template>
  <div class="photo-container">
    <div class="photo">
      <img class="photo-content" :src="photos[0].image" mode="aspectFill" @click="previewImage"/>
      <div class="fab-container">
        <fab :onClick="chooseImage" icon-img="/static/icons/edit_white.png"></fab>
      </div>
    </div>
    <div class="cell">
      <mp-cell-group :title="format(photos[0].created_at)">
        <mp-cell
          icon-src="/static/icons/description.png"
          :content="photos[0].description ? photos[0].description : '点击设置简介'"
        />
        <mp-cell
          @click="chooseLocation"
          icon-src="/static/icons/locate.png"
          :content="photos[0].location ? photos[0].location : '点击设置地址'"
        />
      </mp-cell-group>
    </div>
  </div>
</template>

<script>
import format from 'date-fns/format';
import MpCell from 'mp-weui/packages/cell';
import MpCellGroup from 'mp-weui/packages/cell-group';
import { mapMutations, mapState } from 'vuex';

import fab from '../../components/fab';
import store from '../../store.js';
import {
  chooseImage,
  chooseLocation,
  request,
  showWarning,
  upload,
} from '../../util';

export default {
  name: 'TodayPhoto',

  components: {
    fab,
    MpCell,
    MpCellGroup,
  },

  store,

  computed: mapState(['photos']),

  methods: {
    ...mapMutations(['updateTodayPhoto']),

    format(date) {
      return format(date, 'M 月 D 日 HH : mm');
    },

    chooseImage() {
      chooseImage().then(path => {
        showWarning('是否上传该图片?', true).then(res => {
          if (res.confirm) {
            upload('update/photo', path, {
              photo_key: this.photos[0].photo_key,
            }).then(newPhoto => {
              this.updateTodayPhoto(JSON.parse(newPhoto));
            });
          }
        });
      });
    },

    previewImage() {
      wx.previewImage({
        current: this.photos[0].image,
        urls: [this.photos[0].image],
      });
    },

    chooseLocation() {
      chooseLocation()
        .then(res => {
          wx.showToast({
            icon: 'loading',
            title: '正在上传...',
          });
          return request('update/location', 'POST', {
            photo_key: this.photos[0].photo_key,
            location: res.address,
          });
        })
        .then(newPhoto => this.updateTodayPhoto(newPhoto))
        .finally(() => wx.hideToast());
    },
  },
};
</script>

<style scoped>
.photo {
  position: relative;
  background: white;
}

.photo-container {
  background: white;
  margin: 0;
  padding: 10px;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.photo-content {
  display: block;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.fab-container {
  position: absolute;
  right: 10px;
  bottom: -22.5px;
}

.cell {
  width: 320px;
}
</style>
