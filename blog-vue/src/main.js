import { applyPolyfills, defineCustomElements } from 'blog-stencil/loader';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index.js';

Vue.config.productionTip = false

applyPolyfills().then(() => {
  defineCustomElements();
});

Vue.config.ignoredElements = [
  "blog-button",
  "app-post-card",
];

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})


