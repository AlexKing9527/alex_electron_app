import Vue from 'vue'
<<<<<<< HEAD
import ElementUI from 'element-ui'
=======
>>>>>>> 86e8b436634a8d6a5e728c75808919e7971a556b
import axios from 'axios'

import App from './App'

<<<<<<< HEAD
Vue.use(ElementUI)

=======
>>>>>>> 86e8b436634a8d6a5e728c75808919e7971a556b
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  template: '<App/>'
}).$mount('#app')
