import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import filters from './filters'
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
