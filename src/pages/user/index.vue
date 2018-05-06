<template>
  <div  class="userbackground">
    <div class="userinfo">
      <open-data class="userinfo-avatar" type="userAvatarUrl" ></open-data>
      <open-data class="userinfo-nickname" type="userNickName" lang="zh_CN"></open-data>
    </div>

    <div class="timesetting">
      <img src="../../../static/icons/remind.png"/>
      <span style="line-height:50px; vertical-align:middle;font-size:18px;color: #696969;">拍照提醒</span>
      <picker  @change="PickerChange" :value="indexPicker" :range="arrayT">
        <Button type="default" style="font-size:18px;color: #696969;margin:-45px auto auto 260px;background-color: Transparent;height:45px; width: 90px;">{{arrayT[indexPicker]}}</Button>
      </picker>
      <Switch checked @change="switchChange" color="#2d8cf0" style="line-height:50px;vertical-align:middle;margin:-80px auto auto 350px"></Switch>
    </div>

    <div class="sizesetting">
      <img src="../../../static/icons/size.png"/>
      <span style="line-height:50px; vertical-align:middle;font-size:18px;color: #696969;">画幅</span>
      <picker  @change="SizeChange" :value="indexSize" :range="arrayS">
        <Button type="default" style="font-size:18px;color: #696969;margin:-45px auto auto 330px;background-color: Transparent;height:45px; width: 90px;">{{arrayS[indexSize]}}</Button>
      </picker>
    </div>

    <div class="sizesetting">
      <img src="../../../static/icons/duration.png"/>
      <span style="line-height:50px; vertical-align:middle;font-size:18px;color: #696969;">每幅时长</span>
      <picker  @change="DurationChange" :value="indexDuration" :range="arrayD">
        <Button type="default" style="font-size:18px;color: #696969;margin:-45px auto auto 330px;background-color: Transparent;height:45px; width: 90px;">{{arrayD[indexDuration]}}</Button>
      </picker>
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
      switchChange(e) {
        console.log("switch发生change事件，携带value值为："+ e.mp.detail.value);
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
    width: 100%;
    height: 100%;
    position: fixed;
  }

  .userinfo{
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color:#2d8cf0;
    height:130px;
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
    height: 50px;
    background-color: white;
    border: 1rpx solid #f5f5f5;
  }
  .sizesetting img{
    width: 58px;
    height: 39px;
    line-height:50px;
    vertical-align:middle;
  }

  .timesetting{
    margin-top: 50px;
    height: 50px;
    background-color: white;
    border: 1rpx solid #f5f5f5;
  }


  .timesetting img{
    width: 58px;
    height: 39px;
    line-height:50px;
    vertical-align:middle;
  }
  button::after{
    border:none;
  }

</style>
