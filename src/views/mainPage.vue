<template>
  <div>
    <div class="first-part">
      <div class="slides">
        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel" style="width:100%">
          <div class="carousel-inner">
            <div class="carousel-item active" >
              <img class="d-block w-100" src="../assets/ex1.jpg" alt="First slide" @click="toCertainNews">
            </div>
            <div class="carousel-item" >
              <img class="d-block w-100" src="../assets/ex2.png" alt="Second slide" @click="toCertainNews">
            </div>
            <div class="carousel-item" >
              <img class="d-block w-100" src="../assets/ex3.jpg" alt="Third slide" @click="toCertainNews">
            </div>
          </div>
          <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
        <div></div>
      </div>
      <div class="navbar">
        <div style="width:23%;height:3rem;line-height:3rem;text-align:center;color:white;font-weight: bold;letter-spacing: 1px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;z-index:10">{{this.location}}</div>
        <div class="search" @click="toSearch">
          <i class="fa fa-search" style="padding:0 0.5rem"></i>
          <input type="text" value="搜索..." class="searchbar">
        </div>
        <div style="width:17%;height:3rem;line-height:3rem;text-align:center;color:white;font-weight: bold;letter-spacing: 1px;z-index:10">
          <span v-if="!this.isLogin"  @click="login">登录</span>
          <span v-if="this.isLogin" style="display:flex;width:3rem;height:3rem;justify-content: center;align-items:center;margin:auto" @click="user_info">
            <i class="fa fa-user-circle" style="font-size: 1.5rem"></i>
          </span>
          <div v-if="show_user_info" style="position:absolute;right:2.5rem;top:2.5rem;width:6rem;background-color: white;display:flex;flex-direction:column;color:black;font-weight: normal">
            <div style="border-bottom:1px solid #bbb;line-height: 2.5rem">个人中心</div>
            <div style="line-height: 2.5rem" @click="logout">退出登录</div>
          </div>
        </div>
      </div>
    </div>
    <div class="second-part">
      <div class="layer">
        <div class="layer-item" @click="toSearchLineChartPage">
          <img class="layer-item" src="../assets/search2.png"/>
          <div>行情查询</div>
        </div>
        <div style="height:4rem;width:1px;background-color:#ddd;"></div>
        <div class="layer-item" @click="toCertificateSearchPage">
          <img class="layer-item" src="../assets/search1.png"/>
          <div>证书查询</div>
        </div>
        <div style="height:4rem;width:1px;background-color:#ddd;"></div>
        <div class="layer-item" @click="totest">
          <img class="layer-item" src="../assets/bug.png"/>
          <div>病虫害识别</div>
        </div>
      </div>
      <div class="layer">
        <div class="layer-item" @click="toCommunityPage(1)">
          <img class="layer-item" src="../assets/community.png"/>
          <div>社群交流</div>
        </div>
        <div style="height:4rem;width:1px;background-color:#ddd;"></div>
        <div class="layer-item" @click="toNewsPage">
          <img class="layer-item" src="../assets/news.png"/>
          <div>新闻行情</div>
        </div>
        <div style="height:4rem;width:1px;background-color:#ddd;"></div>
        <div class="layer-item" @click="toCommunityPage(2)">
          <img class="layer-item" src="../assets/expert.png"/>
          <div>专家网红</div>
        </div>
      </div>
    </div>
    <div style="margin:0.5rem 0 1rem;height:0.5rem;background-color:#eee"></div>
    <div class="third-part">
      <router-link to="/community">
        <div class="part-title">人气社群 <i class="fa fa-angle-double-right"></i></div>
      </router-link>
      <communityBar v-for="(item, index) in communityBarContent"
                    :key="index"
                    :item="item"
      ></communityBar>
    </div>
    <div class="forth-part">
      <router-link to="/news">
        <div class="part-title">火热资讯 <i class="fa fa-angle-double-right"></i></div>
      </router-link>
      <newsBar v-for="(item,index) in newsBarContent"
               :key="index"
               :imgSrc="item.src"
               :newsName="item.title"
               :newsDate="item.createTime"
               :newsAuthor="item.author"
               :newsId = 'item.id'
               @toCertainNews="toCertainNews"
      ></newsBar>
    </div>
  </div>
</template>

<script>
import communityBar from '../components/communityBar'
import newsBar from '../components/newsBar'
export default {
  name: 'mainPage.vue',
  components: {
    communityBar,
    newsBar
  },
  data: function () {
    return {
      location: '位置',
      show_user_info: false,
      communityBarContent: [
        {
          sectionId: 1,
          groupName: '番茄群',
          src: require('../assets/tomato.jpg'), // 图片存放于assets中需要require,存放于static中则不需要
          summary: '多C多漂亮',
          likes: 999
        },
        {
          sectionId: 2,
          groupName: '玉米群',
          src: require('../assets/corn.jpg'),
          summary: '种子不选好，满地长稗草',
          likes: 499
        },
        {
          sectionId: 3,
          groupName: '茄子群',
          src: require('../assets/eggplant.png'),
          summary: '一要质，而要量，田间选种不上当一要质，而要量，田间选种不上当一要质，而要量，田间选种不上当',
          likes: 874
        },
        {
          sectionId: 4,
          groupName: '胡萝卜群',
          src: require('../assets/carrot.jpg'), // 图片存放于assets中需要require,存放于static中则不需要
          summary: '多C多漂亮',
          likes: 999
        }
      ],
      newsBarContent: [
        {
          id: 1,
          src: require('../assets/news1.jpg'),
          title: '玉米、小麦卢瑟品种指标体系发布',
          createTime: 1563174571000,
          author: 'Sam'

        },
        {
          id: 2,
          src: require('../assets/news2.jpg'),
          title: '油菜籽质好价稳',
          createTime: 1563174571000,
          author: 'Ann'
        },
        {
          id: 3,
          src: require('../assets/news3.jpg'),
          title: '国产大豆货源紧张',
          createTime: 1563174571000,
          author: 'Ken'
        },
        {
          id: 4,
          src: require('../assets/news4.jpg'),
          title: '玉米、小麦卢瑟品种指标体系发布',
          createTime: 1563174571000,
          author: 'Ben'
        }
      ]
    }
  },
  computed: {
    isLogin () {
      return this.$store.getters.loginStatus
    }
  },
  methods: {
    toItemPage: function (index) {
      if (index === 4) {
        this.$router.push({ path: '/community' })
      } else if (index === 5) {
        this.$router.push({ path: '/news' })
      }
    },
    toSearch: function () {
      this.$router.push({ path: '/search' })
    },
    login: function () {
      this.$router.push('/login')
    },
    user_info: function () {
      this.show_user_info = !this.show_user_info
    },
    logout: function () {
      this.$axios({
        method: 'get',
        url: 'http://106.15.192.168/logout',
        header: { 'content-type': 'application/json' }
      }).then((response) => {
        sessionStorage.clear()
        this.$store.state.token = null
        this.show_user_info = false
        console.log('退出登录')
      })
    },
    toSearchLineChartPage: function () {
      // this.$router.push({ path: '/search_pie_chart' })
      // this.$router.push({ path: '/search_multi_line_chart' })
      //   this.$router.push({ path: '/search_line_chart' })
      this.$router.push({ path: '/search_main_chart' })
    },
    toCertificateSearchPage: function () {
      this.$router.push({ path: '/search_pie_chart' })
      // this.$router.push({ path: '/certificate_search' })
    },
    totest: function () {
      this.$router.push('/test')
    },
    toCommunityPage: function (index) {
      this.$router.push({ path: '/community', query: { type: index } })
    },
    toNewsPage: function () {
      this.$router.push({ path: '/news' })
    },
    toCertainNews (id) {
      this.$router.push({ path: '/news_detail', query: { id: id } })
    }
  },
  mounted () {
    var that = this
    function myFun (result) {
      that.location = result.name
    }
    var myCity = new BMap.LocalCity() // 使用百度地图定位
    myCity.get(myFun)
  }
}
</script>

<style scoped>
  .first-part{
    position: relative;
    height:12rem;
    display:flex;
    justify-content: center;
    margin-bottom:0.5rem;
  }
  .navbar{
    position:absolute;
    top:0;
    padding:0;
    width:100%;
    height:3rem;
    display: flex;
    align-items: center;
    background-color: rgba(80,80,80,0.20);
  }
  .search{
    color:white;
    padding:0 0.6rem;
    border-radius:1rem;
    width:60%;
    display:flex;
    align-items: center;
    background-color: rgba(211, 211, 211, 0.45);
  }
  .searchbar{
    background-color:transparent;
    color:white;
    text-align:left;
    border:none;
    outline:none;
  }
  .slide{
    position:absolute;
    left:0;
    top:0;
  }
  .carousel-item img{
    height:12rem;
  }
  .second-part{
    padding:0 1rem;
  }
  .layer{
    display:flex;
    justify-content: space-between;
    align-items: center;
  }
  .layer-item {
    display:inline;
    text-align:center;
    width:5rem;
    height:5rem;
    color:#888;
  }
  .layer-item img{
    width:3.5rem;
    height:3.5rem;
  }
  .third-part, .forth-part{
    margin-bottom:1rem;
    padding:0 1.25rem;
  }
  .part-title{
    width:6rem;
    color:#888;
  }
</style>
