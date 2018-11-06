import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import filters from './filters'

// TODO find a better way to do this
import popper from 'popper.js'
import jquery from 'jquery'
import bootstrap from 'bootstrap/dist/js/bootstrap'
import bootstrapCss from 'bootstrap/dist/css/bootstrap.css'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
