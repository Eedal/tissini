import Vue from 'vue'
import Vuex from 'vuex'

import moduleAuthentication from './modules/authentication'
import moduleCartShopping from './modules/cartShopping'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    moduleAuthentication,
    moduleCartShopping
  }
})
