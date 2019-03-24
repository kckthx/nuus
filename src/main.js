import '@babel/polyfill'
import Vue from 'vue'
import './plugins/axios'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import { settings } from './services/settings';

Vue.config.productionTip = false

Vue.instance = new Vue({
  router,
  store,
  render: h => h(App),
  mixins: [settings]
}).$mount('#app')
