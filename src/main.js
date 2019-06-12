import Vue from 'vue'
import store from '@/store'
import ElementUI from 'element-ui'
import router from '@/router'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/base.css'
import '@/assets/css/elContainer.css'
import App from './App'
import 'vue/dist/vue'
import 'element-ui/lib'
import 'jquery'
import '@/assets/cookie/cookie.js' 
import Utils from './lib/utils'

Vue.use(Utils)
Vue.use(ElementUI)
let vRouter = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
Vue.use({
  vRouter
})
