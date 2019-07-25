import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import My from './views/My.vue'
import menu from './views/UserMenu.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/My',
      name: 'my',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "my" */ './views/My.vue'),
      children:[
        {
        path: '/PIM',
        name: 'PIM',
        component: () => import(/* webpackChunkName: "PIM" */ './views/PIM.vue')
      },
    {
      path:'/VIPM',
      name: 'VIPM',
      component: () => import(/* webpackChunkName: "VIPM" */ './views/VIPM.vue')
    },
    {
      path:'/Message',
      name: 'Message',
      component: () => import(/* webpackChunkName: "VIPM" */ './views/Message.vue')
    },
    {
      path:'/UserFootprint',
      name: 'UserFootprint',
      component: () => import(/* webpackChunkName: "VIPM" */ './views/UserFootprint.vue'),
      children:[
        {
          path:'/Comment',
          name:'Comment',
          component: () => import('./views/Comment.vue')
        },
        {
          path:'/Collection',
          name:'Collection',
          component: () => import('./views/Collection.vue')
        },
        {
          path:'/Like',
          name:'Like',
          component: () => import('./views/Like.vue')
        },
        {
          path:'/Follow',
          name:'Follow',
          component: () => import('./views/Follow.vue')
        },
        {
          path:'/Fans',
          name:'Fans',
          component: () => import('./views/Fans.vue')
        },
        {
          path:'/Article',
          name:'Article',
          component: () => import('./views/Article.vue')
        }
      ]
    }
  ]
    }
  ]    

})
