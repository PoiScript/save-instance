import Vue from 'vue';
import App from './index';


const app = new Vue(App);
app.$mount();

export default {
  config: {
    navigationBarTitleText: "设置",
    backgroundColor: '#2d8cf0',
    disableScroll:true,

  },
};
