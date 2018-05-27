import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/twitch',
      name: 'home',
      component: require('@/components/Home').default,
    },
    {
      path: '/',
      name: 'start',
      component: require('@/components/StartingPage').default,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
