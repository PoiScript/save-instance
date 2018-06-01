<script>
import 'mp-weui/lib/style.css';
import config from './config';
import store from './store';
import { getStorage, login, showWarning, request, setStorage } from './util';

export default {
  onLaunch() {
    getStorage('openId')
      .catch(() =>
        login()
          .then(code => request('jscode2session', 'GET', { code }))
          .then(({ openId }) => openId)
          .then(id => setStorage('openId', id)),
      )
      .then(id => {
        store.commit('setOpenId', id);
        return request('timeline/' + id, 'GET', {});
      })
      .then(data =>
        store.commit(
          'photosFetched',
          // prefix all photo with the api url
          data.map(photo => {
            photo.image = config.api_url + photo.image;
            return photo;
          }),
        ),
      )
      .catch(() => showWarning('登录失败! 无法获取时间轴'));
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
