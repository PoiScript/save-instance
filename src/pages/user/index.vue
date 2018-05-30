<template>
  <div class="user-background">
    <form report-submit="true" @submit="formSubmit">
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
  },
};
</script>


<style>
button,
button::after {
  margin: 0;
  padding: 0;
  box-sizing: unset;
  border: none;
  border-radius: 0;
  background-color: transparent;
  line-height: 1.5;
  text-align: start;
}

.user-background {
  background-color: #f5f5f5;
  height: 100%;
  width: 375px;
  line-height: 1.5;
  text-align: start;
}

.user-background {
  background-color: #f5f5f5;
}

::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}
</style>
