import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'

Vue.config.productionTip = false

const base = axios.create({
  baseURL: 'https://v3.tissini.app/api/v3/'
});

Vue.prototype.$http = base; 

export default axios;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
