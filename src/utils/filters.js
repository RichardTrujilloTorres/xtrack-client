import Vue from 'vue'

Vue.filter('euro', (value) => `${value} €`);
Vue.filter('currency', (value, symbol) => `${value} ${symbol}`)
Vue.filter('round', (value) => {
  return parseFloat(value).toFixed(2)
});
