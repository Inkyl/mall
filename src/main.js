import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
//vue实例可以作为事件总线
Vue.prototype.$bus = new Vue()


new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
