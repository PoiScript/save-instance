<template>
<div>
  <div class="show" v-if="istoday===1">
    <div class="show"><img src="../../../static/picture/shiLiTu.jpg" class="showBody showImage"></div>
    <div class="show"><p class="showBody showText">今天真是个好日子</p></div>
    <div class="show"><p class="showBody showAddress">广州市白云区广源大道中151号</p></div>
  </div>
  <div class="userbackground" v-if="istoday===0">
    <form report-submit="true" @submit="formSubmit">
      <button form-type="submit">
        <div class="updiv"></div>
      </button>
      <div class="imgdiv" @click="navigate">
        <ripple type="circle">
         <image src="/static/icons/pic.png" class="img"></image>
        </ripple>
      </div>
      <div class="btndiv" @click="navigate">
        <ripple type="circle">
          <button>点击上传今日记忆～</button>
        </ripple>
      </div>
      <button form-type="submit">
        <div class="bottomdiv"></div>
      </button>
    </form>
  </div>
</div>

</template>

<script>
import ripple from 'mpvue-ripple';

export default {
  components: {
    ripple,
  },
  data() {
    return {
      time: '',
      image: '',
      text: '',
      address: '',
      isStorage: 0, //当isStorage为0时，即缓存不存在，否则缓存存在，从缓存中读取数据
      istoday: 0, //用于测试，当istoday为1的时候，即用户已上传图片
      openID: '',
      wxcode: '', //以下三个数据都用于返回给服务器以获得openid
      encryptedData: '',
      iv: '',
    };
  },
  onLoad: function() {
    // 页面初始化
    //首先应该获取全局变量istoday的布尔值
    //然后查看缓存，如果有读取缓存信息，否则向服务器获取信息
    wx.getStorage({
      key: 'key',
      success: function(res) {
        this.isStorage = 1;
        console.log(res.data);
      },
      fail: function(res) {
        this.isStorage = 0;
        console.log('fail to get storage');
      },
    });
    if (this.isStorage === 0) {
      wx.login({
        success: function(res) {
          //微信js_code
          this.wxcode = res.code;
          console.log('wxcode=' + this.wxcode);
          //获取用户信息
          wx.getUserInfo({
            success: function(res) {
              //获取用户敏感数据密文和偏移向量
              console.log(res.encryptedData);
              console.log(res.iv);
              this.encryptedData = res.encryptedData;
              this.iv = res.iv;
            },
            fail: function() {
              console.log('fail to get UserInfo');
            },
          });
        },
      });
      wx.request({
        url: '../today/getopenID', //仅为示例，并非真实的接口地址
        data: {
          wxcode: this.wxcode,
          encryptedData: this.encryptedData,
          iv: this.iv,
        },
        header: {
          'content-type': 'application/json', // 默认值
        },
        success: function(res) {
          console.log('success get user openID');
          console.log(res.data);
          //获得服务器传来的openID
          //接下来是将服务器获得的data信息绑定到image,text,address
        },
        fail: function() {
          console.log('fail to get openID');
        },
      });
      wx.request({
        url: '../today/getData', //仅为示例，并非真实的接口地址
        data: {
          openID: this.openID,
        },
        header: {
          'content-type': 'application/json', // 默认值
        },
        success: function(res) {
          //通过openID获得用户上传的信息
          console.log('success get user publish data');
          console.log(res.data);
          //然后将数据保存到image,text,address中
          this.image = res.image;
          this.text = res.text;
          this.address = res.address;
        },
        fail: function() {
          console.log('fail to get user data');
        },
      });
    }
  },
  methods: {
    navigate() {
      wx.navigateTo({
        url: '/pages/update/main',
        success: function() {
          console.log('success');
        },
      });
    },
  },
};
</script>

<style>
.userbackground {
  background-color: #ffffff;
  height: 100%;
  width: 750rpx;
  position: fixed;
  overflow-x: hidden;
  overflow-y: hidden;
}
.btndiv {
  margin-top: 30rpx;
  margin-left: 195rpx;
  margin-right: 195rpx;
}
.updiv {
  height: 315rpx;
}
.bottomdiv {
  height: 330rpx;
}
.imgdiv {
  margin-left: 235rpx;
  width: 260rpx;
  height: 260rpx;
}
.img {
  width: 280rpx;
  height: 280rpx;
}
button,
button::after {
  margin-left: 0;
  margin-right: 0;
  padding: 0;
  box-sizing: unset;
  border: none;
  border-radius: 0;
  background-color: transparent;
  text-align: center;
  line-height: 1.5;
  -webkit-tap-highlight-color: transparent;
}
.show {
  margin: 0 auto;
  padding: 0;
  border: 0;
  width: 100%;
}
.showBody {
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 5%;
  width: 80%;
}
.showImage {
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 5%;
  width: 80%;
}
.showText {
  text-align: center;
  font-size: 28rpx;
  color: #000000;
}
.showAddress {
  text-align: center;
  font-size: 28rpx;
  color: #000000;
}

button,
button::after {
  margin-top: 30rpx;
  margin-left: 0;
  margin-right: 0;
  padding: 0;
  box-sizing: unset;
  border: none;
  border-radius: 0;
  background-color: transparent;
  text-align: center;
  line-height: 1.5;
  -webkit-tap-highlight-color: transparent;
}
</style>
