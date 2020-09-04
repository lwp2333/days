import Vue from 'vue'
import App from './App.vue'
import Vant from 'vant'
import '@antv/data-set'
import { Toast } from 'vant'
import mavonEditor from 'mavon-editor'
import myLoading from './components/loading/index'
import 'mavon-editor/dist/css/index.css'
// use
import 'vant/lib/index.css'

import './registerServiceWorker'
import router from './router'
import store from './store'
import './style/common.scss'
Vue.config.productionTip = false
Vue.use(Vant)
Vue.use(mavonEditor)
Vue.use(myLoading, { text: '加载中...' })
Vue.use(Toast)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
