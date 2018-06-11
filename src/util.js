import config from './config';
import store from './store';

import isFuture from 'date-fns/is_future';

export const _request = (path, method = 'GET', data = null, auth = true) => {
  const jwt = store.state.jwt;
  return jwt && auth
    ? isFuture(jwt.expires_in)
      ? request(path, method, data, jwt.token)
      : request('auth/refresh', 'POST', {
          refresh_token: jwt.refresh_token,
        }).then(jwt => {
          store.commit('setJWT', jwt);
          return request(path, method, data, jwt.token);
        })
    : request(path, method, data, null);
};

/** promisify wx.request api */
export const request = (path, method, data, token) => {
  wx.showNavigationBarLoading();
  return new Promise((resolve, reject) => {
    wx.request({
      method,
      data,
      url: config.api_url + path,
      header: {
        'content-type': 'application/json',
        authorization: token,
      },
      success: res => {
        if (res.statusCode !== 200) {
          reject('Request Failed with status code' + res.statusCode);
        } else {
          resolve(res.data);
        }
      },
      fail: err => {
        reject('Network Failed: ' + err);
      },
      complete: () => {
        wx.hideNavigationBarLoading();
      },
    });
  });
};

export const _upload = (path, filePath, formData) => {
  const jwt = store.state.jwt;
  return isFuture(jwt.expires_in)
    ? upload(path, filePath, formData)
    : request('auth/refresh', 'POST', {
        refresh_token: jwt.refresh_token,
      }).then(jwt => {
        store.commit('setJWT', jwt);
        return upload(path, filePath, formData);
      });
};

/** promisify wx.uploadFile api */
export const upload = (path, filePath, formData) => {
  const jwt = store.state.jwt;
  wx.showNavigationBarLoading();
  wx.showLoading({
    title: '正在上传...',
  });
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      formData,
      filePath,
      url: config.api_url + path,
      name: 'photo',
      header: {
        'content-type': 'multipart/form-data',
        authorization: jwt.token,
      },
      success: res => {
        if (res.statusCode !== 200) {
          wx.showModal({
            content: '上传失败!',
            title: '提示',
            showCancel: false,
          });
          reject('Request Failed with status code' + res.statusCode);
        } else {
          resolve(res.data);
        }
      },
      fail: err => {
        wx.showModal({
          content: '上传失败!',
          title: '提示',
          showCancel: false,
        });
        reject('Network Failed: ' + err);
      },
      complete: () => {
        wx.hideLoading();
        wx.hideNavigationBarLoading();
      },
    });
  });
};

/** promisify wx.login api */
export const login = () => {
  wx.showNavigationBarLoading();
  wx.showLoading({
    title: '正在登录...',
  });
  return new Promise((resolve, reject) => {
    wx.login({
      success: res => {
        if (res.code) {
          resolve(res.code);
        } else {
          wx.showModal({
            content: '登录失败!',
            title: '提示',
            showCancel: false,
          });
          reject('Login Failed');
        }
      },
      fail: () => {
        wx.showModal({
          content: '登录失败!',
          title: '提示',
          showCancel: false,
        });
        reject('Login Failed');
      },
      complete: () => {
        wx.hideLoading();
        wx.hideNavigationBarLoading();
      },
    });
  });
};

/** promisify wx.getStorage api */
export const getStorage = key => {
  wx.showNavigationBarLoading();
  return new Promise(resolve => {
    wx.getStorage({
      key,
      success: res => {
        resolve(res.data);
      },
      fail: () => {
        resolve(null);
      },
      complete: () => {
        wx.hideNavigationBarLoading();
      },
    });
  });
};

/** promisify wx.setStorage api */
export const setStorage = (key, data) => {
  wx.showNavigationBarLoading();
  return new Promise((resolve, reject) => {
    wx.setStorage({
      key,
      data,
      success: () => {
        resolve(data);
      },
      fail: () => {
        reject('Set Storage Error');
      },
      complete: () => {
        wx.hideNavigationBarLoading();
      },
    });
  });
};

export const navigate = url =>
  new Promise((resolve, reject) => {
    wx.navigateTo({
      url,
      success: () => {
        resolve();
      },
      fail: err => {
        reject('Navigate Error' + JSON.stringify(err));
      },
    });
  });

export const switchTab = url =>
  new Promise((resolve, reject) => {
    wx.switchTab({
      url,
      success: () => {
        resolve();
      },
      fail: err => {
        reject('Switch Tab Error' + JSON.stringify(err));
      },
    });
  });

export const toast = (content, icon = 'none') =>
  wx.showToast({
    duration: 1500,
    title: content,
    icon,
  });

export const confirm = (content, title = '请确认') =>
  new Promise((resolve, reject) => {
    wx.showModal({
      content,
      title,
      showCancel: true,
      success: res => {
        if (res.confirm) {
          resolve(true);
        } else if (res.cancel) {
          resolve(false);
        }
      },
      fail: err => {
        reject('Show Modal Error' + JSON.stringify(err));
      },
    });
  });

export const warning = content =>
  wx.showModal({
    content,
    title: '错误',
    showCancel: false,
  });

export const chooseLocation = () =>
  new Promise((resolve, reject) => {
    wx.chooseLocation({
      success: res => {
        resolve(res);
      },
      fail: err => {
        reject('Choose Location Error' + JSON.stringify(err));
      },
    });
  });

export const chooseImage = () =>
  new Promise((resolve, reject) => {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        resolve(res.tempFilePaths[0]);
      },
      fail: err => {
        reject('Choose Image Error' + JSON.stringify(err));
      },
    });
  });

export const redirect = url =>
  new Promise((resolve, reject) => {
    wx.redirectTo({
      url,
      success: () => {
        resolve();
      },
      fail: err => {
        reject('Redirect Error' + JSON.stringify(err));
      },
    });
  });

export const downloadFile = url => {
  wx.showNavigationBarLoading();
  wx.showLoading({
    title: '正在下载...',
  });
  return new Promise((resolve, reject) => {
    wx.downloadFile({
      url,
      success: res => {
        if (res.statusCode === 200) {
          resolve(res.tempFilePath);
        } else {
          warning('视频下载失败!');
          reject('Download File Failed.');
        }
      },
      fail: res => {
        warning('视频下载失败!');
        reject('Download File Failed: ' + JSON.stringify(res));
      },
      complete: () => {
        wx.hideLoading();
        wx.hideNavigationBarLoading();
      },
    });
  });
};

export const saveVideoToPhotosAlbum = path =>
  new Promise((resolve, reject) => {
    wx.saveVideoToPhotosAlbum({
      filePath: path,
      success: () => {
        toast('视频下载成功', 'success');
        resolve();
      },
      fail: res => {
        reject('Save Video Failed: ' + JSON.stringify(res));
      },
    });
  });
