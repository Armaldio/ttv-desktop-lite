import Vue from 'vue';
import axios from 'axios';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

import App from './App';
import router from './router';
import store from './store';
import db from './scripts/database';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.use(Vuetify, {
  theme: {
    primary: '#6441a5',
    secondary: '#4b408b',
    // accent: '#8c9eff',
    // error: '#b71c1c',

    white: '#fff',
    grey: '#D3D3D3',
  },
});
Vue.use(db);

Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
}).$mount('#app');
