<template>
<div class="reset">
  <div class="textBody">
    <textarea class="text" v-model="dailyText"></textarea>
  </div>

  <div class="choosePhoto">
    <div class="weui-uploader__input-box" @click="addPhoto" v-if="preImage === ''">
      <input id="uploaderInput" class="weui-uploader__input" type="file" accept="image/*" multiple/>
    </div>
    <div class="preView" v-else>
      <img src="preImage" style="height:154rpx;width:154rpx" alt="">
    </div>
  </div>

  <div class="address" style="border-top: 1rpx solid #D9D9D9;border-bottom: 1rpx solid #D9D9D9;">
    <div class="weui-cell weui-cell_access" >
      <div class="weui-cell__hd">
        <img src="/static/icons/output.png" style="float:left;width: 45rpx;height: 26.3rpx;margin-right: 10rpx;"/>
      </div>
      <div class="weui-cell__bd weui-cell_primary">
        <div>添加当前地址</div>
      </div>
      <div class="weui-cell__ft">
        <Switch @change="getAddress" color="#2d8cf0" style="display: block;float: left;"></Switch>
      </div>
    </div>
  </div>

  <div class="changeAddress">
    <p class="currentAddress">{{address}}</p>
    <span class="tips" @click="changeAddress">修改地址</span>
  </div>
</div>
</template>

<style scoped>
.reset{
  margin: 0 auto;
  display: block;
  width: 100%;
  height: 100%;
}
.textBody{
  display:block;
  position: relative;
  width: 100%;
  height: 174rpx;
  margin-top: 10rpx;
}
.text{
  margin: 0 auto;
  display: block;
  border-top: 2rpx solid #D9D9D9;
  border-bottom: 2rpx solid #D9D9D9;
  font-family: 'Courier New', Courier, monospace;
  font-size: 32rpx;
  overflow: hidden;
}
.choosePhoto{
  display: block;
  position: relative;
  margin-left:10%;
  height: 176rpx;
}
.address{
  margin: 0 auto;
  width: 80%;
  height: 94rpx;
  display: block;
  position: relative;
  border-top: 2rpx solid #D9D9D9;
  border-bottom: 2rpx solid #D9D9D9;
  font-size: 34rpx;
}
.changeAddress{
  display:block;
  position: relative;
  height: 82rpx;
  margin-top: 30rpx;
}
.currentAddress{
  float: left;
  margin-left: 10%;
  font-size: 30rpx;
}
.tips{
  float: right;
  font-size: 22rpx;
  margin-right: 5%;
  margin-top: 4rpx;
  color: blue;
}
</style>

<script>
export default {
  data () {
    return {
      dailyText: "",
      files:"",
      ifAddress:0,
      isActive:0,
      address:"当前地址",
      preImage:'',
    }
  },
  methods: {
    addPhoto(e){
        let _this = this;
        wx.chooseImage({
          count: 1,
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            _this.files = res.tempFilePaths
            console.log(_this.files)
            wx.showToast({  
              title: '正在上传...',
              icon: 'loading',
              mask: true,
              duration: 1000
            })
            wx.uploadFile({
              url:'/src/pages/today/photo',
              filePath:_this.files,
              name:'123456',
              success: function(res){
                _this.preImage=res.image
              }
            })
          },
          fail: function () {
            console.log('fail');
          },
          complete: function () {
            console.log('commplete');
          }
        })
    },
    predivImage(e) {
      console.log(e);
      let _this = this;
      wx.previewImage({
        urls: _this.preImage // 需要预览的图片http链接列表
      })
    },
    //用户选择地址
    getAddress(e){
      console.log(e);
      let _this = this;
      if(_this.isActive==0){
        _this.isActive=1
      }else if(_this.isActive==1){
        _this.isActive=0
      }
      if(_this.address=="当前地址"){
        if(_this.isActive==1){
          wx.chooseLocation({
            //type: 'wgs84',
            success: function(res) {
              _this.address = res.address
              console.log(_this.address)
            }
          })
        }
      }
    },
    changeAddress(e){
      let _this=this;
      wx.chooseLocation({
        //type: 'wgs84',
        success: function(res) {
          _this.address = res.address
          console.log(_this.address)
        }
      })
    }
  }
}
</script>
