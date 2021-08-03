// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './lib/rem.js'
import './lib/global.css'
import VueCookies from 'vue-cookies'
import axios from "axios";

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// use
Vue.use(mavonEditor)


import 'highlight.js/styles/default.css';
import Highlight from 'vue-markdown-highlight'
Vue.use(Highlight)

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueCookies)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
