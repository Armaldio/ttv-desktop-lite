import Vue from 'vue';
import axios from 'axios';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

import App from './App';
import router from './router';
import store from './store';
import db from './scripts/database';
import theme from '../theme/theme.js';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.use(Vuetify, {
  theme,
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
