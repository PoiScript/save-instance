<template>
  <div>
    <div class="image-uploader">
      <div class="preview" :class="{ '-stripes': !photo_url }" @click="previewClick"
           :style="{ backgroundImage: photo_url ? 'url(' + photo_url + ')' : '' }">
        <div v-if="!photo_url">点击上传照片</div>
      </div>
      <div class="fab-container" @click="chooseImage">
        <fab icon-img="/static/icons/upload.png"></fab>
      </div>
    </div>
    <div class="input-cells">
      <div class="weui-cell weui-cell_access" @click="chooseAddress">
        <div class="weui-cell__hd">
          <img class="icon" src="/static/icons/locate.png"/>
        </div>
        <div class="weui-cell__bd weui-cell_primary">
          <div :class="{ empty: !location }">{{ location || '添加位置' }}</div>
        </div>
        <div class="weui-cell__ft weui-cell__ft_in-access"></div>
      </div>
      <div class="weui-cell weui-cell_access">
        <div class="weui-cell__hd">
          <img class="icon" src="/static/icons/description.png"/>
        </div>
        <div class="weui-cell__bd weui-cell_primary">
          <div>简介</div>
        </div>
        <div class="weui-cell__ft">{{wordCount}}</div>
      </div>
      <textarea class="text" :value="description" @input="updateDescr" placeholder="添加字幕"
                :placeholder-class="'empty'" :cursor-spacing="0" :show-confirm-bar="false"></textarea>
    </div>
    <div class="submit-button" @click="submit">
      <img src="/static/icons/submit.png" class="icon"/>
      <span>发表</span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex';

import fab from '../../components/fab';
import store from '../../store';
import {
  chooseImage,
  chooseLocation,
  toast,
  upload,
  switchTab,
  request,
} from '../../util';

export default {
  components: {
    fab,
  },

  store,

  data() {
    return {
      id: null,
      originalPhoto: null,
    };
  },

  computed: {
    ...mapState({
      photo_url: state => state.editing.photo_url,
      description: state => state.editing.description,
      location: state => state.editing.location,
    }),
    ...mapGetters(['wordCount', 'getPhotoById', 'editingDirty']),
    formData() {
      let res = {};
      if (this.description) {
        res.description = this.description;
      }
      if (this.location) {
        res.location = this.location;
      }
      return res;
    },
  },

  onShow() {
    this.id = this.$root.$mp.query.id;
    if (this.id && !this.editingDirty) {
      this.originalPhoto = this.getPhotoById(this.id);
      this.updateEditing(this.originalPhoto);
    }
  },

  methods: {
    ...mapMutations(['updateEditing', 'clearEditing']),

    async chooseImage() {
      const imgPath = await chooseImage();
      this.updateEditing({ photo_url: imgPath });
    },

    async chooseAddress() {
      const { address } = await chooseLocation();
      this.updateEditing({ location: address });
    },

    updateDescr(e) {
      this.updateEditing({ description: e.target.value });
    },

    previewClick() {
      if (this.photo_url) {
        wx.previewImage({
          current: this.photo_url,
          urls: [this.photo_url],
        });
      } else {
        this.chooseImage();
      }
    },

    submit() {
      if (this.id) {
        this.updatePhoto();
      } else {
        this.createPhoto();
      }
    },

    async createPhoto() {
      if (this.photo_url) {
        await upload('timeline', this.photo_url, this.formData);
        await switchTab('/pages/timeline/main');
        toast('图片上传成功', 'success');
        await store.dispatch('fetchPhotos', true);
      } else {
        toast('请选择需要上传的图片');
      }
    },

    async updatePhoto() {
      wx.showLoading({ title: '正在更新...' });

      const id = this.originalPhoto.id;

      if (this.originalPhoto.photo_url !== this.photo_url) {
        await upload(`timeline/${id}/photo`, this.photo_url);
      }

      if (
        this.originalPhoto.location !== this.location ||
        this.originalPhoto.description !== this.description
      ) {
        await request(`timeline/${id}/meta`, 'PUT', {
          description: this.description,
          location: this.location,
        });
      }

      this.clearEditing();

      wx.hideLoading();
      await switchTab('/pages/today/main');
      await store.dispatch('fetchPhotos', true);
    },
  },
};
</script>

<style lang="scss" scoped>
.image-uploader {
  height: 300px;
  width: 100%;
  position: relative;

  .preview {
    height: 100%;
    background-size: cover;
    background-position: center center;
    box-shadow: inset 0 24px 38px 3px rgba(0, 0, 0, 0.14),
      inset 0 9px 46px 8px rgba(0, 0, 0, 0.12),
      inset 0 11px 15px -7px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: #80848f;

    &.-stripes {
      background-size: 30px 30px;
      background-image: linear-gradient(
        -45deg,
        #f6f6f6 25%,
        transparent 25%,
        transparent 50%,
        #f6f6f6 50%,
        #f6f6f6 75%,
        transparent 75%,
        transparent
      );
      animation: stripes 2s linear infinite;
    }
  }
}

.fab-container {
  position: absolute;
  right: 16px;
  bottom: -25px;
}

@keyframes stripes {
  from {
    background-position: 0 0;
  }

  to {
    background-position: 60px 30px;
  }
}

.input-cells {
  margin: 40px 25px 15px 25px;
  border-top: 2px solid #f5f5f5;
  border-bottom: 2px solid #f5f5f5;

  .icon {
    float: left;
    width: 22.5px;
    height: 22.5px;
    margin-right: 5px;
  }

  .text {
    position: initial;
    padding: 0 15px;
    height: 60px;
  }
}

.empty {
  color: #80848f;
}

.submit-button {
  margin: 0 25px 40px 25px;
  display: flex;
  align-items: center;
  justify-content: center;

  > .icon {
    float: left;
    width: 25px;
    height: 25px;
    margin-right: 5px;
  }
}
</style>
