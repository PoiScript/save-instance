<template>

  <div class="userbackground">

    <div class="userinfo">
      <open-data class="userinfo-avatar" type="userAvatarUrl" ></open-data>
      <open-data class="userinfo-nickname" type="userNickName" lang="zh_CN"></open-data>
    </div>

    <div class="timesetting">
      <img src="/static/icons/remind.png"/>
      <span style="font-size:34rpx;color: #696969;object-fit: cover;display: block;float: left;overflow:hidden;">拍照提醒</span>
      <picker  @change="PickerChange" :value="indexPicker" :range="arrayT">
        <Button type="default" style="width:200rpx;margin-left:180rpx;font-size:34rpx;color: #696969;background-color: Transparent;">{{arrayT[indexPicker]}}</Button>
      </picker>
      <Switch checked @change="switchTime" color="#2d8cf0" style="display: block;float: left;" ></Switch>
    </div>


    <div class="sizesetting">
      <img src="/static/icons/size.png"/>
      <span style="object-fit: cover;display: block;float: left;overflow:hidden;font-size:34rpx;color: #696969;">画幅</span>
      <picker  @change="SizeChange" :value="indexSize" :range="arrayS">
        <Button type="default" style="margin-left: 440rpx;font-size:34rpx;color: #696969;background-color: Transparent;">{{arrayS[indexSize]}}</Button>
      </picker>
    </div>

    <div class="durationsetting">
      <img src="/static/icons/duration.png"/>
      <span style="object-fit: cover;display: block;float: left;overflow:hidden;font-size:34rpx;color: #696969;">每幅时长</span>
      <picker  @change="DurationChange" :value="indexDuration" :range="arrayD">
        <Button type="default" style="margin-left: 380rpx;font-size:34rpx;color: #696969;background-color: Transparent;">{{arrayD[indexDuration]}}</Button>
      </picker>
    </div>

    <div class="sizesetting">
      <img src="/static/icons/output.png"/>
      <span style="object-fit: cover;display: block;float: left;overflow:hidden;font-size:34rpx;color: #696969;">全高清输出</span>
      <Switch checked @change="switchOutput" color="#2d8cf0" style="display: block;float: left;margin-left:345rpx;"></Switch>
    </div>

    <div class="timesetting">
      <img src="/static/icons/contact.png"/>
      <span style="object-fit: cover;display: block;float: left;overflow:hidden;font-size:34rpx;color: #696969;">联系我们</span>
      <contact-button  size="50" session-from="weapp" style="margin-left:410rpx;">

      </contact-button>

    </div>


    <div class="weui-footer" style="margin-top: 120rpx; margin-bottom: 40rpx;">
      <div class="weui-footer__text">VERSION 1.0.0</div>
      <div class="weui-footer__text">© 2018 KAJI STUDIO</div>
    </div>

  </div>
</template>

<script>

  export default {

    data() {

      return {
        indexPicker:0,
        arrayT: ['每日', '每周', '一个月', '三个月', '一年'],
        indexSize:0,
        arrayS:['竖屏','宽屏','方形','圆形'],
        indexDuration:0,
        arrayD:['1 S','2 S','3 S','4 S'],
      };
    },
    methods: {
      switchTime(e) {
        console.log("switch发生change time事件，携带value值为："+ e.mp.detail.value);
      },
      switchOutput(e) {
        console.log("switch发生change output事件，携带value值为："+ e.mp.detail.value);
      },
      PickerChange(e) {
        this.indexPicker = e.mp.detail.value;
        console.log('选中的值为：' + this.arrayT[e.mp.detail.value]);
      },
      SizeChange(e) {
        this.indexSize = e.mp.detail.value;
        console.log('选中的值为：' + this.arrayS[e.mp.detail.value]);
      },
      DurationChange(e) {
        this.indexDuration = e.mp.detail.value;
        console.log('选中的值为：' + this.arrayD[e.mp.detail.value]);
      },

    }
  }
</script>


<style>


  .userbackground{
    background-color: #f5f5f5;
    height:100%;
    width:750rpx;
    position: fixed;
    overflow-x:hidden;

  }

  .userinfo{
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color:#2d8cf0;
    height:280rpx;
    width:750rpx
  }

  .userinfo-avatar{
    width: 128rpx;
    height: 128rpx;
    margin: 20rpx;
    border-radius: 50%;
    object-fit: cover;
    display: block;
    float: left;
    overflow:hidden;
  }

  .userinfo-nickname{
    color: white;
  }

  .sizesetting{
    display: flex;
    flex-direction: row;
    height: 90rpx;
    width:100%;
    background-color: #ffffff;
    border: 1rpx solid #f5f5f5;
    align-items: center;
  }
  .sizesetting img{
    object-fit: cover;
    display: block;
    float: left;
    overflow:hidden;
    width: 104.4rpx;
    height: 70.2rpx;
  }

  .durationsetting{
    display: flex;
    flex-direction: row;
    height: 90rpx;
    width:100%;
    background-color: white;
    border: 1rpx solid #f5f5f5;
    align-items: center;
  }
  .durationsetting img{

    object-fit: cover;
    display: block;
    float: left;
    overflow:hidden;
    width: 104.4rpx;
    height: 70.2rpx;
  }

  .timesetting{
    display: flex;
    flex-direction: row;
    margin-top: 120rpx;
    height: 90rpx;
    width:100%;
    background-color: white;
    border: 1rpx solid #f5f5f5;
    align-items: center;
  }


  .timesetting img{
    object-fit: cover;
    display: block;
    float: left;
    overflow:hidden;
    width: 104.4rpx;
    height: 70.2rpx;

  }
  button::after{
    border:none;
  }
  .wx-switch-input{
    width:100rpx !important;
    height:60rpx !important;
  }
  /*白色样式（false的样式）*/
  .wx-switch-input::before{
    width:97rpx !important;
    height: 57rpx !important;
  }
  /*绿色样式（true的样式）*/
  .wx-switch-input::after{
    width: 60rpx !important;
    height: 58rpx !important;
  }
  /*swtich样式end*/

  ::-webkit-scrollbar{
    width:0;
    height:0;
    color:transparent;
  }



</style>
