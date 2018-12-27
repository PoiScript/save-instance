import Vue from 'vue'
import App from './App'
import store from './store/index'
import router from './router'

const app = new Vue({ el: '#app', store, router, ...App })
app.$mount()
