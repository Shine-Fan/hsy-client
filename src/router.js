import Vue from 'vue'
import Router from 'vue-router'
import mainPage from './views/mainPage'
import newsPage from './views/newsPage'
import communityPage from './views/communityPage'
import communityChatInfo from './views/communityChatInfo'
import memberPage from './views/memberPage'
import chatRoom from './views/chatRoom'
import newsDetail from './views/newsDetail'
import communityDetail from './views/communityDetail'
import search from './views/search'
import login from './views/login'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'mainPage',
      component: mainPage
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/news',
      name: 'newsPage',
      component: newsPage
    },
    {
      path: '/community',
      name: 'communityPage',
      component: communityPage
    },
    {
      path: '/community_chat_info',
      name: 'communityChatInfo',
      component: communityChatInfo
    },
    {
      path: '/member_page',
      name: 'memberPage',
      component: memberPage
    },
    {
      path: '/chat_room',
      name: 'chatRoom',
      component: chatRoom
    },
    {
      path: '/news_detail',
      name: 'newsDetail',
      component: newsDetail
    },
    {
      path: '/community_detail',
      name: 'communityDetail',
      component: communityDetail
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
