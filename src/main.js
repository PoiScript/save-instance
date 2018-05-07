import Vue from 'vue';
import App from './App';



Vue.config.productionTip = false;
App.mpType = 'app';


const app = new Vue(App);
app.$mount();

export default {
  config: {
    pages: ['^pages/today/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#2d8cf0',
      navigationBarTextStyle: 'white',
    },
    tabBar: {
      color: '#80848f',
      selectedColor: '#2d8cf0',
      backgroundColor: 'white',
      list: [
        {
          text: '今日',
          pagePath: 'pages/today/main',
          iconPath: 'static/icons/camera.png',
          selectedIconPath: 'static/icons/camera_selected.png',
        },
        {
          text: '时光轴',
          pagePath: 'pages/timeline/main',
          iconPath: 'static/icons/view_day.png',
          selectedIconPath: 'static/icons/view_day_selected.png',
        },
        {
          text: '设置',
          pagePath: 'pages/user/main',
          iconPath: 'static/icons/person.png',
          selectedIconPath: 'static/icons/person_selected.png',
        },
      ],
    },
  },
};
