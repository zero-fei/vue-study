import Vue from 'vue'
import App from './App.vue'
import Bus from './utils/Bus.js'
// import router from './router/index.js'
import router from './krouter/index.js'
//  import store from "./vuex/index";
import store from "./kstore/index.js";

Vue.config.productionTip = false
Vue.prototype.$bus = new Bus()

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
