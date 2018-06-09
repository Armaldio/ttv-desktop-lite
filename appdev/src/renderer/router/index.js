import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'loading',
      component: require('@/components/Loading').default,
    },
    {
      path: '/home',
      name: 'home',
      component: require('@/components/Home').default,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
