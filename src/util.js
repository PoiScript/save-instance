import config from './config';

/** promisify wx.request api */
export const request = (path, method, data) => {
  wx.showNavigationBarLoading();
  return new Promise((resolve, reject) => {
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
      complete: () => {
        wx.hideNavigationBarLoading();
      },
    });
  });
};

/** promisify wx.uploadFile api */
export const upload = (path, filePath, formData) => {
  wx.showNavigationBarLoading();
  return new Promise((resolve, reject) => {
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
      complete: () => {
        wx.hideNavigationBarLoading();
      },
    });
  });
};

/** promisify wx.login api */
export const login = () => {
  wx.showNavigationBarLoading();
  return new Promise((resolve, reject) => {
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
      complete: () => {
        wx.hideNavigationBarLoading();
      },
    });
  });
};

/** promisify wx.getStorage api */
export const getStorage = key => {
  wx.showNavigationBarLoading();
  return new Promise((resolve, reject) => {
    wx.getStorage({
      key,
      success: res => {
        resolve(res.data);
      },
      fail: () => {
        reject('Get Storage Error');
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

export const showWarning = content =>
  wx.showModal({
    content,
    title: '提示',
    showCancel: false,
  });
