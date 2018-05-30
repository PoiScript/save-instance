<template>
  <div class="userbackground">
    <form report-submit="true" @submit="formSubmit">
    <div class="textBody">
      <textarea class="text" @input="inputs" v-model="desc" placeholder="字幕" placeholder-style="color:gray" cursor-spacing="0"></textarea>
      <div class="weui-textarea-counter " style="margin-right: 30rpx;">{{currentWordNumber}}</div>
    </div>
    <div class="weui-uploader__bd">
      <div class="weui-uploader__files" id="uploaderFiles">
        <block  v-for="item in files" :key="item">
          <div class="weui-uploader__file" @click="predivImage" :id="item" style="margin-top: 10rpx">
            <image class="weui-uploader__img" :src="item" mode="aspectFill" style="margin-left:50rpx;margin-top: 30rpx;height:220rpx;width: 220rpx;"/>
          </div>
          <image @click="removeImage" src="/static/icons/delete.png" style="position: absolute;height: 38rpx;width: 38rpx;margin-left: -38rpx;margin-top: 30rpx;"/>
        </block>
      </div>
      <div v-if="!files.length" class="weui-uploader__input-box" style="margin-left:50rpx;margin-top: 30rpx;height:220rpx;width: 220rpx;background-color: #f5f5f5;border-color:#f5f5f5 ">
        <div class="weui-uploader__input" @click="chooseImage"></div>
      </div>
    </div>
    <div style="margin-left: 50rpx;margin-right: 50rpx;">
    <button  @click="chooseAddress" hover-class="button-hover" form-type="submit" style="margin-top: 80rpx;">
      <div  class="weui-cell weui-cell_access"  style="border-top: 3rpx solid #f5f5f5;border-bottom: 3rpx solid #f5f5f5;">
        <div class="weui-cell__hd">
          <img src="/static/icons/locate.png" style="float:left;width: 45rpx;height: 45rpx;margin-right: 10rpx;"/>
        </div>
        <div class="weui-cell__bd weui-cell_primary">
          <div v-if="location != '' ">{{location}}</div>
          <div v-else>所在位置</div>
        </div>
        <div class="weui-cell__ft weui-cell__ft_in-access"></div>
      </div>
    </button>
    </div>
    <div style="margin-left: 270rpx;margin-right: 260rpx;">
      <button  form-type="submit" hover-class="button-hover" style="margin-top: 150rpx;">
        <div  class="weui-cell weui-cell_access"  style="border-top: 3rpx solid #f5f5f5;border-bottom: 3rpx solid #f5f5f5;">
          <div class="weui-cell__hd">
            <img src="/static/icons/submit.png" style="float:left;width: 50rpx;height: 50rpx;margin-right: 10rpx;"/>
          </div>
          <div class="weui-cell__bd weui-cell_primary">
            <div>发表</div>
          </div>
        </div>
      </button>
    </div>
    </form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        max:20,
        files: [],
        info:"",
        currentWordNumber:0,
        location:"",
      }
    },
    methods: {
      chooseImage(e) {
        var _this = this;
        wx.chooseImage({
          count: 1,
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            _this.files = _this.files.concat(res.tempFilePaths)
          },
          fail: function () {
            console.log('fail');
          },
          complete: function () {
            console.log('commplete');
          }
        })
      },
      removeImage() {
        this.files = [];
      },
      predivImage(e) {
        console.log(e);
        wx.previewImage({
          current: e.currentTarget.id, // 当前显示图片的http链接
          urls: this.files // 需要预览的图片http链接列表
        })
      },
      inputs() {
          this.info = this.desc.value;
          this.currentWordNumber = parseInt(this.desc.length);
      },
      chooseAddress(e){
        let _this=this;
        wx.chooseLocation({
          //type: 'wgs84',
          success: function(res) {
            _this.location = res.address
            console.log(_this.address)
          },
        })
      }
    }
  }
</script>

<style>
  .userbackground{
    background-color: #ffffff;
    height:100%;
    width:750rpx;
    position:absolute;
    overflow-x:hidden;
    display: block;
  }

  .text{
    overflow-y:hidden;
    overflow-x:hidden;
    height: 200rpx;
    margin-left: 42rpx;
    width:670rpx;
  }

  .textBody{
    display:block;
    position: relative;
    width: 100%;
    margin-top: 50rpx;
  }

  button, button::after {
    margin-left: 0;
    margin-right: 0;
    padding: 0;
    box-sizing: unset;
    border:none;
    border-radius: 0;
    background-color: transparent;
    text-align: left;
    line-height: 1.5;
    -webkit-tap-highlight-color: transparent;
  }
  .button-hover {
    background-color: transparent;

  }

</style>

