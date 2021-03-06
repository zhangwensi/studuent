import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import Element from 'element-ui'
import HighCharts from 'highcharts'
import 'element-ui/lib/theme-chalk/index.css'
import "./assets/styles/global.scss"
import '@/assets/icons'
import './utils/rem.js'


Vue.use(Element)
Vue.config.productionTip = false
Vue.prototype.$hightCharts = HighCharts

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
