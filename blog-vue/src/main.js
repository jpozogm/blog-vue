import { applyPolyfills, defineCustomElements } from 'blog-stencil/loader';
import Vue from 'vue';
import App from './App.vue';
import store from './business/store/index.js';
import router from './router';


Vue.config.productionTip = false

applyPolyfills().then(() => {
  defineCustomElements();
});

Vue.config.ignoredElements = [/blog-\w*/];

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
