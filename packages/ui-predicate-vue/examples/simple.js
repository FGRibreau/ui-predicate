import Vue from 'vue';

import App from './simple.vue';

import uiPredicate from './..';

Vue.use(uiPredicate);

new Vue({
  el: '#app',
  render: h => h(App),
});
