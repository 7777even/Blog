import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import 'default-passive-events'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'


Vue.use(ElementUI)    // UI插件
Vue.use(mavonEditor)    // md插件


Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()


let vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


export default vue
