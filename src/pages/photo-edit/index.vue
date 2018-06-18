<template>
  <div>
    <div class="image-uploader">
      <div class="preview" :style="imageStyleStr" :class="{ '-stripes': !photo_url }" @click="previewClick">
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
import { mapActions, mapGetters } from 'vuex';

import fab from '../../components/fab';
import store from '../../store';
import {
  chooseImage,
  chooseLocation,
  request,
  toast,
  upload,
} from '../../util';

export default {
  components: {
    fab,
  },

  store,

  data() {
    return {
      id: null,
      photo_url: null,
      description: null,
      location: null,
      original: null,
    };
  },

  computed: {
    ...mapGetters(['getPhotoById']),

    imageStyleStr() {
      return this.photo_url ? `background-image: url(${this.photo_url})` : '';
    },
    wordCount() {
      return this.description ? this.description.length : 0;
    },
    formData() {
      const res = {};
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
    if (this.id) {
      if (this.id !== (this.original ? this.original.id : null)) {
        this.original = this.getPhotoById(this.id);
        this.photo_url = this.original.photo_url;
        this.description = this.original.description;
        this.location = this.original.location;
      }
      // check if the form is dirty before resting
    } else if (!this.photo_url && !this.description && !this.location) {
      this.original = null;
      this.photo_url = null;
      this.description = null;
      this.location = null;
    }
  },

  methods: {
    ...mapActions(['fetchPhotos']),

    async chooseImage() {
      this.photo_url = await chooseImage();
    },

    async chooseAddress() {
      this.location = await chooseLocation();
    },

    updateDescr(e) {
      this.description = e.target.value;
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
        wx.navigateBack();
        toast('图片上传成功', 'success');
        await this.fetchPhotos();
      } else {
        toast('请选择需要上传的图片');
      }
    },

    async updatePhoto() {
      const promise = [];

      if (this.original.photo_url !== this.photo_url) {
        promise.push(upload(`timeline/${this.id}/photo`, this.photo_url));
      }

      if (
        this.original.location !== this.location ||
        this.original.description !== this.description
      ) {
        promise.push(
          request(`timeline/${this.id}/meta`, 'PUT', {
            description: this.description,
            location: this.location,
          }),
        );
      }

      if (promise.length > 0) {
        wx.showLoading({ title: '正在更新...' });

        await Promise.all(promise);
        await this.fetchPhotos();

        wx.hideLoading();
      }

      wx.navigateBack();
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
