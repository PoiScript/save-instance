import config from '../config';

export {
  login,
  getStorage,
  setStorage,
  navigate,
  switchTab,
  toast,
  confirm,
  warning,
  chooseLocation,
  chooseImage,
  redirect,
  saveVideo,
  saveVideoToAlbum,
} from './wx';

import { request as wxRequest, upload as wxUpload } from './wx';
import isFuture from 'date-fns/is_future';
import store from '../store';

export const request = (path, method = 'GET', data = null, auth = true) => {
  const jwt = store.state.jwt;
  return jwt && auth
    ? isFuture(jwt.expires_in)
      ? wxRequest(path, method, data, { authorization: jwt.token })
      : wxRequest('auth/refresh', 'POST', {
          refresh_token: jwt.refresh_token,
        }).then(jwt => {
          store.commit('setJWT', jwt);
          return wxRequest(path, method, data, { authorization: jwt.token });
        })
    : wxRequest(path, method, data);
};

export const upload = (path, filePath, formData) => {
  const jwt = store.state.jwt;
  return isFuture(jwt.expires_in)
    ? wxUpload(path, filePath, formData, { authorization: jwt.token })
    : wxRequest('auth/refresh', 'POST', {
        refresh_token: jwt.refresh_token,
      }).then(jwt => {
        store.commit('setJWT', jwt);
        return wxUpload(path, filePath, formData, { authorization: jwt.token });
      });
};