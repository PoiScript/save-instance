<template>
  <div class="user-background">
    <form report-submit="true" @submit="formSubmit">
<<<<<<< HEAD
      <user-info></user-info>
      <div class="cell-padding"></div>
      <div class="weui-panel">
        <div class="weui-panel__bd">
          <div class="weui-media-box weui-media-box_small-appmsg">
            <div class="weui-cells weui-cells_in-small-appmsg">
              <cell-switch title="拍照提醒"
                           img="/static/icons/remind.png"
                           :checked="true"
                           :on-switch-change="switchTime"></cell-switch>
              <cell-picker title="提醒周期"
                           img="/static/icons/period.png"
                           :value="indexPicker" :range="arrayT"
                           :on-switch-change="PickerChange"></cell-picker>
              <cell-picker title="画幅"
                           img="/static/icons/size.png"
                           :value="indexSize" :range="arrayS"
                           :on-picker-change="SizeChange"></cell-picker>
              <cell-picker title="每幅时长"
                           img="/static/icons/duration.png"
                           :value="indexDuration" :range="arrayD"
                           :on-picker-change="DurationChange"></cell-picker>
              <cell-switch title="全高清输出"
                           img="/static/icons/output.png"
                           :checked="true"
                           :on-switch-change="switchOutput"></cell-switch>
              <div class="cell-padding"></div>
              <div class="weui-cells weui-cells_in-small-appmsg">
                <cell-support></cell-support>
=======
      <userinfo></userinfo>
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
>>>>>>> feat: add Vuex store to manage openId
              </div>
            </div>
          </div>
        </div>
      </div>
      <user-footer></user-footer>
    </form>
  </div>
</template>

<script>
<<<<<<< HEAD
import config from '../../config';
import store from '../../store';
import cellPicker from './cell-picker';
import cellSupport from './cell-support';
import cellSwitch from './cell-switch';
import footer from './footer';
import userInfo from './info';

export default {
  components: {
    'cell-picker': cellPicker,
    'cell-support': cellSupport,
    'cell-switch': cellSwitch,
    'user-footer': footer,
    'user-info': userInfo,
  },

=======
import userinfo from './info';
import config from '../../config';
import store from '../../store';

export default {
  components: {
    userinfo,
  },
>>>>>>> feat: add Vuex store to manage openId
  data() {
    return {
      confirm: false,
      showDialog: false,
      indexPicker: 0,
      arrayT: ['每日', '每周', '一个月', '三个月', '一年'],
      indexSize: 0,
      arrayS: ['竖屏', '宽屏', '方形', '圆形'],
      indexDuration: 0,
      arrayD: ['1 S', '2 S', '3 S', '4 S'],
      userInfo: {},
    };
  },
  methods: {
    switchTime(e) {
      console.log(
        'switch发生change time事件，携带value值为：' + e.mp.detail.value,
      );
    },
    switchOutput(e) {
      console.log(
        'switch发生change output事件，携带value值为：' + e.mp.detail.value,
      );
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
<<<<<<< HEAD
    },

    formSubmit(e) {
      const formId = e.mp.detail.formId;
      if (store.state.openId && !formId.includes('the formId is a mock one')) {
        wx.request({
          method: 'POST',
          header: { 'content-type': 'application/json' },
          url: config.api_url + 'formId',
          data: { openId: store.state.openId, formId },
        });
      }
    },
=======
    },

    formSubmit(e) {
      const formId = e.mp.detail.formId;
      if (store.state.openId && !formId.contains('the formId is a mock one')) {
        wx.request({
          method: 'POST',
          header: { 'content-type': 'application/json' },
          url: config.api_url + 'formId',
          data: { openId: store.state.openId, formId },
        });
      }
    },
>>>>>>> feat: add Vuex store to manage openId
  },
};
</script>


<style>
button,
button::after {
<<<<<<< HEAD
  margin: 0;
=======
  margin-left: 0;
  margin-right: 0;
>>>>>>> feat: add Vuex store to manage openId
  padding: 0;
  box-sizing: unset;
  border: none;
  border-radius: 0;
  background-color: transparent;
<<<<<<< HEAD
  line-height: 1.5;
  text-align: start;
}

.user-background {
  background-color: #f5f5f5;
  height: 100%;
  width: 375px;
=======
  text-align: left;
  line-height: 1.5;
  -webkit-tap-highlight-color: transparent;
}
.button-hover {
  background-color: #ececec;
}

.userbackground {
  background-color: #f5f5f5;
  height: 100%;
  width: 750rpx;
>>>>>>> feat: add Vuex store to manage openId
  position: fixed;
  overflow-x: hidden;
}

<<<<<<< HEAD
.cell-padding {
  background-color: #f5f5f5;
  height: 50px;
}
=======
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #2d8cf0;
  height: 280rpx;
  width: 100%;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
  object-fit: cover;
  display: block;
  float: left;
  overflow: hidden;
}

.userinfo-nickname {
  color: white;
}

.wx-switch-input {
  width: 100rpx !important;
  height: 60rpx !important;
}
/*白色样式（false的样式）*/
.wx-switch-input::before {
  width: 97rpx !important;
  height: 57rpx !important;
}
/*绿色样式（true的样式）*/
.wx-switch-input::after {
  width: 60rpx !important;
  height: 58rpx !important;
}
/*swtich样式end*/
>>>>>>> feat: add Vuex store to manage openId

::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}
</style>
