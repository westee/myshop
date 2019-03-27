
import Vue from 'vue'
import router from './router/index.js'
import store from './vuex/index.js'
const app = new Vue({
  el:'#app',
  router,
  store
})