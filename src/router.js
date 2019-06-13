import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/NewsPage.vue'
import NewsDetail from "./views/NewsDetail";


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children:[
        {
            path:'/news',
            component:NewsDetail
        }
      ]
    },
    {
      path: '/BBS',
      name: 'BBS',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "BBS" */ './views/BBSPage.vue')
    },
    {
      path: '/Login',
      name: 'LoginPage',
      component: () => import('./views/LoginPage.vue')
    }
  ]
})
