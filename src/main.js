
// Require the polyfill before requiring any other modules.
require('intersection-observer');

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import filters from './utils/filters'
import messages from '../i18/messages'

// TODO find a better way to do this
import popper from 'popper.js'
import jquery from 'jquery'
import bootstrap from 'bootstrap/dist/js/bootstrap'
import bootstrapCss from 'bootstrap/dist/css/bootstrap.css'

// Icons
import fontAwesome from 'font-awesome/css/font-awesome.css';

const _ = require('lodash')

import VueSweetalert2 from 'vue-sweetalert2';
import VueForm from 'vue-form';
import VueI18n from 'vue-i18n';
import Multiselect from 'vue-multiselect';
import multiselectCss from 'vue-multiselect/dist/vue-multiselect.min.css';

import {VueAuthenticate} from 'vue-authenticate';
import VueAxios from 'vue-axios';
import axios from 'axios';

import InstantSearch from 'vue-instantsearch'
import VueObserveVisibility from 'vue-observe-visibility'


// Instant search
Vue.use(InstantSearch)
Vue.use(VueObserveVisibility)



// Authentication
Vue.use(VueAxios, axios)
export const vueAuth = new VueAuthenticate(axios, {
  baseUrl: `${process.env.VUE_APP_LOGIN_URL}`
})


Vue.config.productionTip = false

Vue.use(VueSweetalert2)
Vue.use(VueI18n)
Vue.use(VueForm, {
  inputClasses: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  },
  formControlFeedback: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  },
  validators: {
    'multi-select-validator': (value, attrValue, vnode) => {
      if (!value) {
        return false
      }

      return true
    }
  }
})
Vue.use(Multiselect)


// Internalization
const i18n = new VueI18n({
  locale: 'en',
  messages
})

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
