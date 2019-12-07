import Vue from 'vue'

Vue.filter('euro', (value) => `${value} €`);
Vue.filter('currency', (value, symbol) => `${value} ${symbol}`)
