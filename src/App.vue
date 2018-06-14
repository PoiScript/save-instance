<script>
import 'mp-weui/lib/style.css';

import store from './store';
import { navigate, getStorage, login, request, confirm } from './util';

export default {
  async onLaunch(option) {
    try {
      if (!option.query.share && !wx.getStorageSync('finishedTutorial')) {
        if (await confirm('是否查看教程?')) {
          navigate('/pages/tutorial/main');
        }
      }

      const jwt = await getStorage('jwt');
      if (!jwt) {
        const code = await login();
        const jwt = await request('auth/login', 'POST', { code });
        store.commit('setJWT', jwt);
      } else {
        store.commit('setJWT', jwt);
      }
      await store.dispatch('fetchPhotos', true);
    } catch (e) {
      console.log(e);
    }
  },
};
</script>
