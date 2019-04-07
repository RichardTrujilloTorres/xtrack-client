import Vue from 'vue'

Vue.filter('euro', (value) => value +  '&euro;') // not working: keeps escaping it
Vue.filter('currency', (value, symbol) => `${value} ${symbol}`)
