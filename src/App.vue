<script>
import 'mp-weui/lib/style.css';
import config from './config';
import store from './store';

export default {
  onLaunch() {
    wx.getStorage({
      key: 'openId',
      success: res => {
        store.commit('setOpenId', res.data);
        store.dispatch('fetchPhotos');
      },
      fail: () => {
        wx.login({
          success: res => {
            if (res.code) {
              wx.request({
                url: config.api_url + 'jscode2session',
                data: { code: res.code },
                success: res => {
                  if (res.data && res.data.openId) {
                    wx.setStorageSync('openId', res.data.openId);
                    store.commit('setOpenId', res.data.openId);
                    store.dispatch('fetchPhotos');
                  }
                },
              });
            } else {
              console.log('登录失败！' + res.errMsg);
            }
          },
        });
      },
    });
  },
};
</script>

<style>
.wx-switch-input {
  width: 100px !important;
  height: 60px !important;
}
/*白色样式（false的样式）*/
.wx-switch-input::before {
  width: 97px !important;
  height: 57px !important;
}
/*绿色样式（true的样式）*/
.wx-switch-input::after {
  width: 60px !important;
  height: 58px !important;
}
/*swtich样式end*/
</style>
