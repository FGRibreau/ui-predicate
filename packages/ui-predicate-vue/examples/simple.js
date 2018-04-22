import Vue from 'vue';

import App from './simple.vue';

Vue.component(
  'ui-predicate-options',
  require('../src/components/ui-predicate-options')
);
Vue.component(
  'ui-predicate-comparison',
  require('../src/components/ui-predicate-comparison')
);
Vue.component(
  'ui-predicate-compound',
  require('../src/components/ui-predicate-compound')
);
Vue.component('ui-predicate', require('../src/components/ui-predicate'));

new Vue({
  el: '#app',
  render: h => h(App),
});
