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
  wx.showToast({
    icon: 'loading',
    title: '正在上传...',
  });
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      formData,
      filePath,
      url: config.api_url + path,
      name: 'photo',
      header: { 'content-type': 'multipart/form-data' },
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
        wx.hideToast();
        wx.hideNavigationBarLoading();
      },
    });
  });
};

/** promisify wx.login api */
export const login = () => {
  wx.showNavigationBarLoading();
  wx.showToast({
    icon: 'loading',
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
        wx.hideToast();
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

export const confirm = content =>
  new Promise((resolve, reject) => {
    wx.showModal({
      content,
      title: '请确认',
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
    title: '提示',
    showCancel: false,
  });

export const showWarning = (content, showCancel = false) =>
  new Promise((resolve, reject) => {
    wx.showModal({
      content,
      title: '提示',
      showCancel,
      success: res => {
        resolve(res);
      },
      fail: err => {
        reject('Show Modal Error' + JSON.stringify(err));
      },
    });
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
