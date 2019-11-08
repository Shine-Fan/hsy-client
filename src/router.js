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
import certificateSearch from './views/certificateSearch'
// import searchLineChart from './views/searchLineChart'
import communityArticle from './views/communityArticle'
import searchMultiLineChart from './views/searchMultiLineChart'
import searchPieChart from './views/searchPieChart'
import searchMainChart from './views/searchMainChart'
import test from './views/test'
Vue.use(Router)
// const originalPush = Router.prototype.push
// Router.prototype.push = function push (location) {
//   return originalPush.call(this, location).catch(err => err)
// }
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
      path: '/search_main_chart',
      name: 'searchMainChart',
      component: searchMainChart,
      // redirect: '/search_main_chart/search_multi_line_chart',
      children: [
        {
          path: 'search_multi_line_chart',
          name: 'searchMultiLineChart',
          component: searchMultiLineChart
        },
        {
          path: 'search_pie_chart',
          name: 'searchPieChart',
          component: searchPieChart
        }
      ]
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    // {
    //   path: '/search_pie_chart',
    //   name: 'searchPieChart',
    //   component: searchPieChart
    // },
    {
      path: '/certificate_search',
      name: 'certificateSearch',
      component: certificateSearch
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
    }, {
      path: '/community_article',
      name: 'communityArticle',
      component: communityArticle
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
