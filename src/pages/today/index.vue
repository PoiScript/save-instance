<template>
  <div class="userbackground">
    <image @click="navigate" src="/static/icons/pic.png" class="img"></image>
    <button @click="navigate">今日还没有上传照片哦～</button>
  </div>
</template>

<script>

  export default {
    data() {
      return {}
    },
    methods: {
      navigate(){
        wx.navigateTo({
          url:"/pages/update/main",
          success:function () {
            console.log("success")
          }
        })
      }
    }
  }
</script>

<style>
  .userbackground{
    background-color: #FFFFFF;
    height:100%;
    width:750rpx;
    position: fixed;
    overflow-x:hidden;

  }

  .img{
    width:250rpx;
    height:250rpx;
    margin-top: 315rpx;
    margin-left: 250rpx;
  }
  button, button::after {
    margin-top: 30rpx;
    margin-left: 0;
    margin-right: 0;
    padding: 0;
    box-sizing: unset;
    border:none;
    border-radius: 0;
    background-color: transparent;
    text-align: center;
    line-height: 1.5;
    -webkit-tap-highlight-color: transparent;
  }


</style>
