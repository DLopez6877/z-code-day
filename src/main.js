import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './App.vue'

new Vue({
  el: '#app',
  render: h => h(App)
})

Vue.use(VueAxios, axios)