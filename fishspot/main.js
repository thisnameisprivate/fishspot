import App from './App'
import uView from 'uview-ui'
import tabbars from '@/components/tabbars/tabbars.vue'; // 自定义底部导航条
import navbar from '@/components/navbar/navbar.vue'; // 顶部胶囊


// #ifndef VUE3
import Vue from 'vue'
Vue.use('tabbars', tabbars)
Vue.use(uView)
uni.$u.config.unit = 'rpx'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif