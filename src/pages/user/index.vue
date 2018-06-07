<template>
  <div class="user-background">
    <form report-submit="true" @submit="formSubmit">
      <user-info></user-info>
      <panel title="视频">
        <a href="/pages/video-list/main">
          <cell-button img="/static/icons/video.png" text="视频列表"></cell-button>
        </a>
      </panel>
      <panel title="设置">
        <cell-switch title="拍照提醒"
                     img="/static/icons/remind.png"
                     :checked="daily_notify"
                     :onSwitchChange="switchDailyNotify"></cell-switch>
        <cell-picker title="提醒周期"
                     img="/static/icons/period.png"
                     :value="notify_time" :range="notifyTimes"
                     :onPickerChange="changeNotifyTime"></cell-picker>
        <cell-picker title="每幅时长"
                     img="/static/icons/duration.png"
                     :value="duration" :range="durations"
                     :onPickerChange="changeDuration"></cell-picker>
      </panel>
      <panel title="其他">
        <a href="/pages/tutorial/main">
          <button form-type="submit">
            <cell-button img="/static/icons/contact.png" text="查看教程"></cell-button>
          </button>
        </a>
        <button form-type="submit" hover-class="button-hover" open-type="contact">
          <cell-button img="/static/icons/contact.png" text="联系我们"></cell-button>
        </button>
      </panel>
    </form>
    <footer>
      <mp-footer text="VERSION 1.0.0"></mp-footer>
      <mp-footer text="KAJI STUDIO © 2018"></mp-footer>
    </footer>
  </div>
</template>

<script>
import MpFooter from 'mp-weui/packages/footer';
import { mapState } from 'vuex';

import store from '../../store';
import { request, showWarning } from '../../util';
import cellButton from './cell-button';
import cellPicker from './cell-picker';
import cellSwitch from './cell-switch';
import userInfo from './info';
import panel from './panel';

export default {
  components: {
    MpFooter,
    cellButton,
    cellPicker,
    cellSwitch,
    userInfo,
    panel,
  },

  store,

  computed: {
    ...mapState(['openId']),
    settings() {
      return {
        daily_notify: this.daily_notify,
        notify_time: this.notify_time,
        duration: this.duration,
        photo_shape: this.photo_shape,
        hd_output: this.hd_output,
      };
    },
  },

  data() {
    return {
      notifyTimes: [
        '8:00',
        '10:00',
        '12:00',
        '14:00',
        '16:00',
        '18:00',
        '20:00',
        '22:00',
        '24:00',
      ],
      durations: ['1s', '2s', '3s', '4s'],
      daily_notify: true,
      notify_time: 0,
      duration: 0,
    };
  },

  onLoad() {
    wx.showToast({
      icon: 'loading',
      title: '获取用户配置...',
    });

    this.getSettings().finally(() => wx.hideToast());
  },

  methods: {
    switchDailyNotify(value) {
      this.updateSettings({ daily_notify: value });
    },

    changeNotifyTime(value) {
      this.updateSettings({ notify_time: parseInt(value) });
    },

    changeDuration(value) {
      this.updateSettings({ duration: parseInt(value) });
    },

    formSubmit(e) {
      const formId = e.mp.detail.formId;
      if (this.openId && !formId.includes('the formId is a mock one')) {
        request('formId', 'POST', { openId: this.openId, formId });
      }
    },

    updateSettings(settings) {
      wx.showToast({
        icon: 'loading',
        title: '更新用户配置...',
      });

      request('settings/' + this.openId, 'POST', {
        ...this.settings,
        ...settings,
      })
        .catch(() => showWarning('用户配置更新失败!'))
        .then(() => this.getSettings())
        .finally(() => wx.hideToast());
    },

    getSettings() {
      return request('settings/' + this.openId, 'GET', null)
        .then(settings => {
          this.daily_notify = settings.daily_notify;
          this.notify_time = settings.notify_time;
          this.duration = settings.duration;
        })
        .catch(() => showWarning('获取用户配置失败!'));
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
}

::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}

footer {
  margin: 35px 0;
}
</style>
