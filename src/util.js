import config from './config';

/** promisify wx.request api */
export const request = (path, method, data) =>
  new Promise((resolve, reject) => {
    wx.request({
      method,
      data,
      url: config.api_url + path,
      header: {
        'content-type': 'application/json',
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
    });
  });

/** promisify wx.uploadFile api */
export const upload = (path, filePath, formData) =>
  new Promise((resolve, reject) => {
    wx.uploadFile({
      formData,
      filePath,
      url: config.api_url + path,
      name: 'photo',
      header: { 'content-type': 'multipart/form-data' },
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
    });
  });

/** promisify wx.login api */
export const login = () =>
  new Promise((resolve, reject) => {
    wx.login({
      success: res => {
        if (res.code) {
          resolve(res.code);
        } else {
          reject('Login Failed');
        }
      },
      fail: () => {
        reject('Login Failed');
      },
    });
  });

/** promisify wx.getStorage api */
export const getStorage = key =>
  new Promise((resolve, reject) => {
    wx.getStorage({
      key,
      success: res => {
        resolve(res.data);
      },
      fail: () => {
        reject('Get Storage Error');
      },
    });
  });

/** promisify wx.setStorage api */
export const setStorage = (key, data) =>
  new Promise((resolve, reject) => {
    wx.setStorage({
      key,
      data,
      success: () => {
        resolve(data);
      },
      fail: () => {
        reject('Set Storage Error');
      },
    });
  });

export const showWarning = content =>
  wx.showModal({
    content,
    title: '提示',
    showCancel: false,
  });
