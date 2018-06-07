<script>
import 'mp-weui/lib/style.css';

import store from './store';
import {
  navigate,
  getStorage,
  login,
  request,
  setStorage,
  confirm,
} from './util';

export default {
  onLaunch(option) {
    if (!option.query.share && !wx.getStorageSync('finishedTutorial')) {
      confirm('是否查看教程?').then(check => {
        if (check) {
          navigate('/pages/tutorial/main');
        }
      });
    }

    getStorage('openId')
      .catch(() =>
        login()
          .then(code => request('jscode2session', 'GET', { code }))
          .then(({ openId }) => openId)
          .then(id => setStorage('openId', id)),
      )
      .then(id => store.commit('setOpenId', id))
      .then(() => store.dispatch('fetchPhotos', true));
  },
};
</script>
