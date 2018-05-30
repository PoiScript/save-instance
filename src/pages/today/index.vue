<template>
  <div class="userbackground">
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
</template>

<script>
  import ripple from 'mpvue-ripple'

  export default {
    components: {
      ripple
    },
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
    overflow-y:hidden;

  }
  .btndiv{
    margin-top: 30rpx;
    margin-left: 195rpx;
    margin-right: 195rpx;
  }
  .updiv{
    height:315rpx;
  }
  .bottomdiv{
    height: 330rpx;
  }
  .imgdiv{
    margin-left: 235rpx;
    width:260rpx;
    height:260rpx;
  }
  .img{
    width:280rpx;
    height:280rpx;
  }
  button, button::after {

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
