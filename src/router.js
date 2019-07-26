import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/MainPage.vue'
import News from "./views/NewsPage.vue"
import officialCommunity from "./views/officialCommunity.vue"
import hotCommunity from "./views/hotCommunity"
import Info from "./views/InfoPage.vue"
<<<<<<< HEAD
import NewsDetail from "./views/NewsDetail.vue"
import specificCommunity from "./views/specificCommunity"
import editArticle from "./views/editArticle.vue"
import applyCommunity from "./views/applyCommunity.vue"

=======
import Comments from "./views/NewsComments.vue"
>>>>>>> 5913a70ecdf1fb964ef7ecfaeefa768e4f0c41e6


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
      name: 'news',
      component: News,
    },
    {
<<<<<<< HEAD
      path:'news/detail/:id',
      name:'newsdetail',
      component:NewsDetail,
=======
      path:'/comments',
      name:'comments',
      component:Comments,
>>>>>>> 5913a70ecdf1fb964ef7ecfaeefa768e4f0c41e6
    },
    {
      path: '/info',
      name:'info',
      component:Info,
    },
    {
      path:'/officommunity',
      name:'offiCommunity',
      component:officialCommunity,
    },
    {
      path:'/hotcommunity',
      name:'hotCommunity',
      component:hotCommunity,
    },
    {
      path:'/specicommunity/:id',
      name:'specicommunity',
      component:specificCommunity,
      meta:{
        keepAlive:true
      }
    },
    {
<<<<<<< HEAD
      path:'/write',
      name:'editarticle',
      component:editArticle,
=======
      path:'/community',
      name:'commmunity',
      component:Community,
>>>>>>> 5913a70ecdf1fb964ef7ecfaeefa768e4f0c41e6
    },

    {
      path:'/applycommunity',
      name:'applycommunity',
      component:applyCommunity,
    }
  ]
})
