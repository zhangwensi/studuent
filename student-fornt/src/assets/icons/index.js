import Vue from 'vue'
import SvgIcon  from '@/components/svgIcon/svgIcon.vue'

// 注册为全局组件
Vue.component('svg-icon', SvgIcon)

const requireAll = requireContext => requireContext.keys().map(requireContext)

const req = require.context('./svg', false, /\.svg$/)

requireAll(req)
