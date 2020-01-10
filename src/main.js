import Vue from 'vue'

Vue.config.productionTip = false
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

import App from './app.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import store from './store/store.js'
import router from './router.js'

const app = new Vue({
  render: h => h(App),
  store,
  router
});

Vue.filter('toCurrency', function (value) {
  if (typeof value !== "number") {
    return value;
  }
  var formatter = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0
  });
  return formatter.format(value);
});

Vue.filter('abs', function(value) {
  if (typeof value !== "number") {
    return value
  }

  if (value >= 0) return value
  return value * -1;
})

app.$mount('#app')
