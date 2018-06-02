<script>
import 'mp-weui/lib/style.css';
import store from './store';
import { getStorage, login, request, setStorage } from './util';

export default {
  onLaunch() {
    getStorage('openId')
      .catch(() =>
        login()
          .then(code => request('jscode2session', 'GET', { code }))
          .then(({ openId }) => openId)
          .then(id => setStorage('openId', id)),
      )
      .then(id => store.commit('setOpenId', id))
      .then(() => store.dispatch('fetchPhotos'));
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
