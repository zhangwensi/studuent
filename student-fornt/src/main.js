import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import "./assets/styles/global.scss"
import '@/assets/icons'
import './utils/rem.js'
import Blob from './excel/Blob'
import Export2Excel from './excel/Export2Excel'

Vue.use(Element)
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
