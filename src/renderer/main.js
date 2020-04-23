import Vue from 'vue'
import ElementUI from 'element-ui'
import axios from 'axios'

import App from './App'

Vue.use(ElementUI)

Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  template: '<App/>'
}).$mount('#app')
