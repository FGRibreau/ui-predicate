import Vue from 'vue';

import App from './simple.vue';

import UIPredicateVue from '..';
console.log(UIPredicateVue);
Vue.use(UIPredicateVue);

// expose for debug purposes
window.UIPredicateVue = UIPredicateVue;
window.app = new Vue({
  el: '#app',
  render: h => h(App),
});
