import Vue from "vue"
import "./plugins/vuetify"
import App from "./App.vue"
import router from "./router/"
import store from "./store"
import "./registerServiceWorker"
import "roboto-fontface/css/roboto/roboto-fontface.css"
import "font-awesome/css/font-awesome.css"
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import axios from 'axios'
import {BASE_URL} from './request/config'


Vue.use(iView);
Vue.config.productionTip = false


/* axios request 拦截器 */
axios.defaults.withCredentials=true
axios.interceptors.request.use(
  config => {
    // 基础路径
    config.baseURL = BASE_URL
    return config
  },
  err => {
    return Promise.reject(err)
  }
)
// 响应拦截器
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

Vue.prototype.$axios = axios
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
