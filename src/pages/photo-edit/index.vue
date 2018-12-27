<template>
  <div>
    <div class="image-uploader">
      <div v-if="url"><img alt="" class="preview" :src="url"/></div>
      <div v-else class="stripes"></div>
      <label for="file-input" class="fab-container">
        <fab icon="/static/icons/upload.png"></fab>
      </label>
      <input
        type="file"
        id="file-input"
        style="display: none"
        @change="handleFiles"
      />
    </div>
    <div class="input-cells">
      <div class="weui-cell weui-cell_access">
        <div class="weui-cell__hd">
          <img alt="" class="icon" src="/static/icons/description.png" />
        </div>
        <div class="weui-cell__bd weui-cell_primary" style="color: #999999">
          <div>简介</div>
        </div>
        <div class="weui-cell__ft">{{ wordCount }}</div>
      </div>
      <textarea aria-label="" class="text" v-model="description"></textarea>
    </div>
    <div class="submit-button" @click="uploadImage">
      <img alt="" src="/static/icons/submit.png" class="icon" />
      <span>发表</span>
    </div>
  </div>
</template>

<script>
import fab from '../../components/fab'
import store from '../../store'
import config from '../../config'

import { mapState, mapMutations } from 'vuex'

export default {
  components: {
    fab
  },

  store,

  data() {
    return {
      description: '',
      file: null
    }
  },

  computed: {
    ...mapState({ url: state => state.editing.url }),

    wordCount() {
      return this.description.length
    }
  },

  methods: {
    ...mapMutations(['setUrl']),

    handleFiles(event) {
      let reader = new FileReader()

      reader.onload = e => {
        this.setUrl(e.target.result)
      }

      this.file = event.target.files[0]
      reader.readAsDataURL(event.target.files[0])
    },

    uploadImage() {
      let data = new FormData()
      data.append('photo', this.file)
      data.append('description', this.description)
      window
        .fetch(config.api_url + 'timeline', {
          method: 'POST',
          body: data
        })
        .then(() => {
          window.location = '/'
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../theme';

.image-uploader {
  height: 300px;
  width: 100%;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    pointer-events: none;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    box-shadow: inset 0 24px 38px 3px rgba(0, 0, 0, 0.14),
      inset 0 9px 46px 8px rgba(0, 0, 0, 0.12),
      inset 0 11px 15px -7px rgba(0, 0, 0, 0.2);
  }

  .preview {
    height: 300px;
    width: 100vw;
  }

  > .stripes {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: $sub-color;
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

@keyframes stripes {
  from {
    background-position: 0 0;
  }

  to {
    background-position: 60px 30px;
  }
}

.fab-container {
  position: absolute;
  right: 16px;
  bottom: -25px;
}

.input-cells {
  margin: 40px 25px 15px 25px;
  border-top: 2px solid $divider-color;
  border-bottom: 2px solid $divider-color;

  .icon {
    float: left;
    width: 22.5px;
    height: 22.5px;
    margin-right: 5px;
  }

  .text {
    position: initial;
    width: 100%;
    height: 150px;
    border: none;
    outline: none;
  }
}

.submit-button {
  margin: 0 25px 40px 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  > .icon {
    float: left;
    width: 25px;
    height: 25px;
    margin-right: 5px;
  }
}
</style>
