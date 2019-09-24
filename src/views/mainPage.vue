<template>
  <div>
    <div class="first-part">
      <div class="slides">
        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel" style="width:100%">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img class="d-block w-100" src="../assets/ex1.jpg" alt="First slide">
            </div>
            <div class="carousel-item">
              <img class="d-block w-100" src="../assets/ex2.png" alt="Second slide">
            </div>
            <div class="carousel-item">
              <img class="d-block w-100" src="../assets/ex3.jpg" alt="Third slide">
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
          <span v-if="this.isLogin" style="display:flex;width:3rem;height:3rem;justify-content: center;align-items:center;margin:auto"><i class="fa fa-user-circle" style="font-size: 1.5rem"></i></span>
        </div>
      </div>
    </div>
    <div class="second-part">
      <div class="layer">
        <div class="layer-item">
          <img class="layer-item" src="../assets/search2.png"/>
          <div>行情查询</div>
        </div>
        <div style="height:4rem;width:1px;background-color:#ddd;"></div>
        <div class="layer-item">
          <img class="layer-item" src="../assets/search1.png"/>
          <div>证书查询</div>
        </div>
        <div style="height:4rem;width:1px;background-color:#ddd;"></div>
        <div class="layer-item">
          <img class="layer-item" src="../assets/bug.png"/>
          <div>病虫害识别</div>
        </div>
      </div>
      <div class="layer">
        <div class="layer-item" @click="toItemPage(4)">
          <img class="layer-item" src="../assets/community.png"/>
          <div>社群交流</div>
        </div>
        <div style="height:4rem;width:1px;background-color:#ddd;"></div>
        <div class="layer-item" @click="toItemPage(5)">
          <img class="layer-item" src="../assets/news.png"/>
          <div>新闻行情</div>
        </div>
        <div style="height:4rem;width:1px;background-color:#ddd;"></div>
        <div class="layer-item">
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
                    :imgSrc="item.src"
                    :communityName="item.name"
                    :communityMotto="item.motto"
                    :memberNum="item.number"
      ></communityBar>
    </div>
    <div class="forth-part">
      <router-link to="/news">
        <div class="part-title">火热资讯 <i class="fa fa-angle-double-right"></i></div>
      </router-link>
      <newsBar v-for="(item,index) in newsBarContent"
               :key="index"
               :imgSrc="item.src"
               :newsName="item.name"
               :newsDate="item.date"
               :summary="item.summary"
               :readerNum="item.number"
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
      isLogin: false,
      communityBarContent: [
        {
          name: '番茄群',
          src: require('../assets/tomato.jpg'), // 图片存放于assets中需要require,存放于static中则不需要
          motto: '多C多漂亮',
          number: 999
        },
        {
          name: '玉米群',
          src: require('../assets/corn.jpg'),
          motto: '种子不选好，满地长稗草',
          number: 499
        },
        {
          name: '茄子群',
          src: require('../assets/eggplant.png'),
          motto: '一要质，而要量，田间选种不上当一要质，而要量，田间选种不上当一要质，而要量，田间选种不上当',
          number: 874
        }
      ],
      newsBarContent: [
        {
          src: require('../assets/news1.jpg'),
          name: '玉米、小麦卢瑟品种指标体系发布',
          date: '2019-08-20',
          number: 999

        },
        {
          src: require('../assets/news2.jpg'),
          name: '油菜籽质好价稳',
          date: '2019-08-19',
          number: 699
        },
        {
          src: require('../assets/news3.jpg'),
          name: '国产大豆货源紧张',
          date: '2019-08-20',
          number: 399
        }

      ]
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
      if (!this.isLogin) {
        this.isLogin = true
      }
    }
  },
  mounted () {
    var that = this
    function myFun (result) {
      that.location = result.name
    }
    var myCity = new BMap.LocalCity()   //使用百度地图定位
    myCity.get(myFun)
    // if (navigator.geolocation) {
    //   // var options = {
    //   //   enableHighAccuracy: true,
    //   //   maximumAge: 1000
    //   // }
    //   navigator.geolocation.getCurrentPosition(showPosition, showErr)
    // }
    // function showPosition (position) {
    //   console.log(position)
    //   // $.getJSON('http://api.map.baidu.com/geocoder/v2/?ak=71709218d45a706b9c7e3abc2f037b23&callback=?&location=' + position.coords.latitude + ',' + position.coords.longitude + '&output=json&pois=1', function (res) {
    //   //   console.log(res)
    //   // })
    // }
    // function showErr (error) {
    //   console.log(error)
    // }
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
