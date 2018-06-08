<template>
  <div class="photo-container">
    <div class="photo">
      <img class="photo-content" :src="photo.image_url" mode="aspectFill" @click="previewImage"/>
      <div class="fab-container">
        <fab :onClick="chooseImage" icon-img="/static/icons/edit_white.png"></fab>
      </div>
    </div>
    <div class="cell">
      <div class="weui-cells__title">{{date}}</div>
      <div class="weui-cells weui-cells_after-title">
        <div class="weui-cell weui-cell_access">
          <div class="weui-cell_hd">
            <img class="weui-cell_icon" src="/static/icons/locate.png"/>
          </div>
          <div class="weui-cell__bd">地址</div>
          <div class="weui-cell_hd" @click="chooseLocation">
            <img class="weui-cell_icon edit-button" src="/static/icons/edit.png"/>
          </div>
        </div>
        <div class="cell-detail">{{photo.location || '点击设置地址'}}</div>
        <div class="weui-cell weui-cell_access">
          <div class="weui-cell_hd">
            <img class="weui-cell_icon" src="/static/icons/description.png"/>
          </div>
          <div class="weui-cell__bd">简介</div>
          <div v-if="!editingDescription" class="weui-cell_hd" @click="editDescription">
            <img class="weui-cell_icon edit-button" src="/static/icons/edit.png"/>
          </div>
        </div>
        <textarea class="cell-detail description-textarea"
                  title="photo description"
                  :focus="editingDescription"
                  :disabled="!editingDescription"
                  :value="photo.description"
                  placeholder="未设置简介"
                  wrap="hard"
                  @blur="submitDescription($event.target.value)"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import format from 'date-fns/format';
import MpCell from 'mp-weui/packages/cell';
import MpCellGroup from 'mp-weui/packages/cell-group';
import { mapMutations } from 'vuex';

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

  data() {
    return {
      editingDescription: false,
      inputDescription: '',
    };
  },

  computed: {
    photo() {
      return store.state.photos[0];
    },
    date() {
      return format(this.photo.created_at, 'M 月 D 日 HH : mm');
    },
  },

  methods: {
    ...mapMutations(['updateTodayPhoto']),

    chooseImage() {
      chooseImage().then(path => {
        showWarning('是否上传该图片?', true).then(res => {
          if (res.confirm) {
            upload('update/photo', path, {
              photo_key: this.photo.photo_key,
            }).then(newPhoto => {
              this.updateTodayPhoto(JSON.parse(newPhoto));
            });
          }
        });
      });
    },

    editDescription() {
      this.editingDescription = true;
    },

    submitDescription(value) {
      this.editingDescription = false;

      if (this.photo.description === value) return;

      showWarning('是否更新简介?', true).then(res => {
        if (res.confirm) {
          wx.showToast({
            icon: 'loading',
            title: '正在更新...',
          });
          request('update/description', 'POST', {
            photo_key: this.photo.photo_key,
            description: value,
          })
            .then(newPhoto => this.updateTodayPhoto(newPhoto))
            .finally(() => wx.hideToast());
        }
      });
    },

    previewImage() {
      wx.previewImage({
        current: this.photo.image,
        urls: [this.photo.image],
      });
    },

    chooseLocation() {
      chooseLocation()
        .then(res => {
          wx.showToast({
            icon: 'loading',
            title: '正在更新...',
          });
          return request('update/location', 'POST', {
            photo_key: this.photo.photo_key,
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

.edit-button {
  margin: 0;
}

.description-textarea {
  line-height: 1em;
  height: 3em;
  width: 100%;
}

.cell-detail {
  padding: 0 15px 10px 15px;
  font-size: 0.9em;
  color: #555555;
}
</style>
