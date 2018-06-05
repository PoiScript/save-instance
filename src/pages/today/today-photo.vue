<template>
  <div>
    <div class="photo-container" @click="chooseImage">
      <image class="photo" :src="photos[0].image" mode="aspectFill"></image>
    </div>
    <mp-cell-group :title="format(photos[0].created_at)">
      <mp-cell
        icon-src="/static/icons/period.png"
        :content="photos[0].description"
      />
      <mp-cell
        @click="chooseLocation"
        icon-src="/static/icons/locate.png"
        :content="photos[0].location"
      />
    </mp-cell-group>
  </div>
</template>

<script>
import format from 'date-fns/format';
import MpCell from 'mp-weui/packages/cell';
import MpCellGroup from 'mp-weui/packages/cell-group';
import { mapActions, mapMutations, mapState } from 'vuex';

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
    MpCell,
    MpCellGroup,
  },

  store,

  computed: {
    ...mapState(['photos']),
  },

  methods: {
    ...mapMutations([
      'updatePhotoLocation',
      'updatePhotoDescription',
      'updatePhoto',
    ]),

    ...mapActions(['fetchPhotos']),

    format(date) {
      return format(date, 'M 月 D 日 HH : mm');
    },

    chooseImage() {
      chooseImage().then(path => {
        showWarning('是否上传该图片?', true).then(res => {
          if (res.confirm) {
            upload('update/photo', path, {
              photo_key: this.photos[0].photo_key,
            }).then(() => this.fetchPhotos());
          }
        });
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
        .then(() => this.fetchPhotos())
        .finally(() => wx.hideToast());
    },
  },
};
</script>

<style scoped>
.photo-container {
  background: white;
  margin: 0 0 30px;
  padding: 10px 10px 25px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.photo {
  display: block;
  width: 100%;
}
</style>
