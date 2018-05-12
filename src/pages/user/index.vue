<template>

  <div class="userbackground">
    <form report-submit="true" @submit="formSubmit">
      <button form-type="submit">
    <div class="userinfo">
      <open-data class="userinfo-avatar" type="userAvatarUrl" ></open-data>
      <open-data class="userinfo-nickname" type="userNickName" lang="zh_CN"></open-data>
    </div>
        <div style="background-color:#f5f5f5; height: 80rpx; "></div></button>
    <div class="weui-panel" >
      <div class="weui-panel__bd">
        <div class="weui-media-box weui-media-box_small-appmsg">
          <div class="weui-cells weui-cells_in-small-appmsg">
            <div class="weui-cell weui-cell_access" >
              <div class="weui-cell__hd">
                <button form-type="submit" hover-class="none">
                <img src="/static/icons/remind.png" style="float:left;width: 45rpx;height: 45rpx;margin-right: 10rpx;"/>
                </button>
              </div>
              <div class="weui-cell__bd weui-cell_primary">
                <button form-type="submit" hover-class="none">
                <div>拍照提醒</div>
                </button>
              </div>
                <picker  @change="PickerChange" :value="indexPicker" :range="arrayT">
                  <button form-type="submit" hover-class="none">
                    <div class="weui-cell__ft" style="margin-right: 30rpx;">{{arrayT[indexPicker]}}</div>
                  </button>
                </picker>
              <div class="weui-cell__ft">
                <Switch checked @change="switchTime" color="#2d8cf0" style="display: block;float: left;" ></Switch>
              </div>
            </div>

            <picker  @change="SizeChange" :value="indexSize" :range="arrayS" >
              <button form-type="submit" hover-class="button-hover">
            <div class="weui-cell weui-cell_access"  style="border-top: 1rpx solid #D9D9D9;">
              <div class="weui-cell__hd">
                <img src="/static/icons/size.png" style="float:left;width: 45rpx;height: 45rpx;margin-right: 10rpx;"/>
              </div>
              <div class="weui-cell__bd weui-cell_primary">
                <div>画幅</div>
              </div>
                <div class="weui-cell__ft weui-cell__ft_in-access">{{arrayS[indexSize]}}</div>
            </div>
              </button>
            </picker>

            <picker  @change="DurationChange" :value="indexDuration" :range="arrayD" >
              <button form-type="submit" hover-class="button-hover">
            <div  class="weui-cell weui-cell_access"  style="border-top: 1rpx solid #D9D9D9;">
              <div class="weui-cell__hd">
                <img src="/static/icons/duration.png" style="float:left;width: 45rpx;height: 45rpx;margin-right: 10rpx;"/>
              </div>
              <div class="weui-cell__bd weui-cell_primary">
                <div>每幅时长</div>
              </div>
              <div class="weui-cell__ft weui-cell__ft_in-access">{{arrayD[indexDuration]}}&nbsp;</div>
            </div>
              </button>
            </picker>

            <div style="border-top: 1rpx solid #D9D9D9;border-bottom: 1rpx solid #D9D9D9;">
            <div class="weui-cell weui-cell_access" >
              <div class="weui-cell__hd">
                <button form-type="submit" hover-class="none">
                <img src="/static/icons/output.png" style="float:left;width: 45rpx;height: 26.3rpx;margin-right: 10rpx;"/>
                </button>
              </div>
              <div class="weui-cell__bd weui-cell_primary">
                <button form-type="submit" hover-class="none">
                <div>全高清输出</div>
                </button>
              </div>
              <div class="weui-cell__ft">
                <Switch checked @change="switchOutput" color="#2d8cf0" style="display: block;float: left;"></Switch>
              </div>
            </div>
            </div>
            <button form-type="submit" hover-class="none">
              <div style="background-color:#f5f5f5; height: 100rpx; "></div>
            </button>

            <button form-type="submit" hover-class="button-hover">
              <div  class="weui-cell weui-cell_access"  style="border-top: 1rpx solid #D9D9D9;">
                <div class="weui-cell__hd">
                  <img src="/static/icons/contact.png" style="float:left;width: 45rpx;height: 45rpx;margin-right: 10rpx;"/>
                </div>
                <div class="weui-cell__bd weui-cell_primary">
                  <div>联系我们</div>
                </div>
                <div class="weui-cell__ft weui-cell__ft_in-access"></div>
              </div>
            </button>

          </div>
        </div>
      </div>
    </div>



      <button form-type="submit" hover-class="none">
    <div class="weui-footer" style="margin-top: 70rpx;">
      <div class="weui-footer__text">VERSION 1.0.0</div>
      <div class="weui-footer__text">© 2018 KAJI STUDIO</div>
    </div>
    </button>
    </form>
  </div>
</template>

<script>


  export default {

    data() {
      return {
        confirm: false,
        showDialog: false,
        indexPicker:0,
        arrayT: ['每日', '每周', '一个月', '三个月', '一年'],
        indexSize:0,
        arrayS:['竖屏','宽屏','方形','圆形'],
        indexDuration:0,
        arrayD:['1 S','2 S','3 S','4 S'],
        userInfo:{},
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
    background-color: #ECECEC;

  }

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
    width:100%;
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
