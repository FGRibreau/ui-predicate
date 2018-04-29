import Vue from 'vue';

import App from './simple.vue';

import UIPredicateCore from '..';
Vue.use(UIPredicateCore);

// expose for debug purposes
window.Vue = Vue;
window.UIPredicateCore = UIPredicateCore;
window.app = new Vue({
  el: '#app',
  render: h => h(App),
});
