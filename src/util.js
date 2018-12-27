import 'whatwg-fetch'

import config from './config'

/** promisify wx.request api */
export const request = (path, method, data, headers = {}) => {
  return new Promise((resolve, reject) => {
    window.fetch(config.api_url + path, data, {
      method,
      headers: {
        ...headers,
        'content-type': 'application/json'
      },
      success: res => {
        if (res.statusCode !== 200) {
          reject('Request Failed with status code' + res.statusCode)
        } else {
          resolve(res.data)
        }
      },
      fail: err => {
        reject('Network Failed: ' + err)
      }
    })
  })
}

/** promisify wx.uploadFile api */
export const upload = (path, filePath, formData, headers = {}) => {
  wx.showNavigationBarLoading()
  wx.showLoading({ title: '正在上传...' })
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      formData,
      filePath,
      url: config.api_url + path,
      name: 'photo',
      header: {
        ...headers,
        'content-type': 'multipart/form-data'
      },
      success: res => {
        if (res.statusCode !== 200) {
          console.warn('上传失败!')
          reject('Request Failed with status code' + res.statusCode)
        } else {
          resolve(res.data)
        }
      },
      fail: err => {
        console.warn('上传失败!')
        reject('Network Failed: ' + err)
      }
    })
  })
}

export const toast = (content, icon = 'none') =>
  wx.showToast({
    duration: 1500,
    title: content,
    icon
  })

export const redirect = url =>
  new Promise((resolve, reject) => {
    wx.redirectTo({
      url,
      success: () => {
        resolve()
      },
      fail: err => {
        reject('Redirect Error' + JSON.stringify(err))
      }
    })
  })

export const showActionSheet = (...itemList) => {
  return new Promise((resolve, reject) => {
    wx.showActionSheet({
      itemList,
      success: res => {
        resolve(res.tapIndex)
      },
      fail: res => {
        reject('Show ActionSheet Failed' + res.errMsg)
      }
    })
  })
}
