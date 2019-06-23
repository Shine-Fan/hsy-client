import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/MainPage.vue'
import News from "./views/NewsPage.vue"
import BBS from "./views/BBSPage.vue"
import Community from "./views/Community.vue"


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
    },
    {
      path: '/news',
      name:'news',
      component: News,
    },
    {
      path: '/bbs',
      name: 'bbs',
      component: BBS,
    },
    {
      path:'/community',
      name:'community',
      component:Community,
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: () => import('./views/LoginPage.vue')
    }
  ]
})
