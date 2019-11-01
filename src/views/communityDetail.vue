<template>
  <div class="main" style="position:absolute;top:0;width:100%;height:100%;overflow: scroll;">
    <div class="title-area">
      <div style="width:30%;display: flex;">
        <!--实现自适应的正方形图片-->
        <div style="width:90%;position:relative;padding-bottom: 90%;height:0;">
          <img style="position:absolute;width:100%;height:100%;border-radius: 50%" src="../assets/news7.jpg">
        </div>
      </div>
      <div style="display: flex;flex-direction:column;width:70%">
        <div style="display: flex;align-items: center;justify-content: space-around">
          <div>
            <div class="title-num">1234</div>
            <div class="title-item">发表</div>
          </div>
          <div>
            <div class="title-num">1234</div>
            <div class="title-item">关注</div>
          </div>
          <div>
            <div class="title-num">1234</div>
            <div class="title-item">粉丝</div>
          </div>
          <div>
            <div class="title-num">1234</div>
            <div class="title-item">获赞</div>
          </div>
        </div>
        <div style="display:flex;align-items: center;justify-content: space-around">
          <router-link to="/community_chat_info">
            <div style="margin:0.6rem 0;padding:2px 0.8rem;border:1px solid #eeeeee;border-radius:0.2rem;letter-spacing:1px">社群聊天室</div>
          </router-link>
          <div style="margin:0.6rem 0;padding:2px 0.8rem;border-radius:0.2rem;letter-spacing:1px;background-color:red;color:white">+关注</div>
        </div>
      </div>
    </div>
    <div class="intro-area">
      <span>简介：{{introduction}}</span>
    </div>
    <div style="width:100%;height:6px;background-color: #efefef;"></div>
    <div class="choose-area">
      <div class="choose-bar" :class="{fixbar:isFix}">
        <div class="choose-item" :class="{active:itemNum === 1}" @click="change_item(1)">全部</div>
        <div class="choose-item" :class="{active:itemNum === 2}" @click="change_item(2)">文章</div>
        <div class="choose-item" :class="{active:itemNum === 3}" @click="change_item(3)">视频</div>
      </div>
      <div class="choose-content">
        <community-bar-in-detail v-for="(item,index) in newsList"
                                 :key="index"
                                 :item="item"
                                 @toCertainArticle="toCertainArticle"
        ></community-bar-in-detail>
      </div>
    </div>
  </div>
</template>

<script>
import communityBarInDetail from '../components/communityBarInDetail'
export default {
  name: 'communityDetail',
  components: {
    communityBarInDetail
  },
  data: function () {
    return {
      itemNum: 1,
      isFix: false,
      introduction: '“中科发5号”等新品种在产量、抗病等农艺性状中表现突出，外观品质优、食味佳，丰收在即。',
      newsList: [
        {
          id: 1,
          usr_img: require('../assets/news7.jpg'),
          usr_name: '农科小能手',
          time: '09-12 17:20',
          news_img: require('../assets/news4.jpg'),
          news_title: '灾害损失减少30%、整精米率提高8%——水稻新品种“中科发5号”选育成功'

        },
        {
          id: 2,
          usr_img: require('../assets/news7.jpg'),
          usr_name: '农科小能手',
          time: '09-12 17:20',
          news_img: require('../assets/news4.jpg'),
          news_title: '灾害损失减少30%、整精米率提高8%——水稻新品种“中科发5号”选育成功'

        },
        {
          id: 3,
          usr_img: require('../assets/news7.jpg'),
          usr_name: '农科小能手',
          time: '09-12 17:20',
          news_img: require('../assets/news4.jpg'),
          news_title: '灾害损失减少30%、整精米率提高8%——水稻新品种“中科发5号”选育成功'

        },
        {
          id: 4,
          usr_img: require('../assets/news7.jpg'),
          usr_name: '农科小能手',
          time: '09-12 17:20',
          news_img: require('../assets/news4.jpg'),
          news_title: '灾害损失减少30%、整精米率提高8%——水稻新品种“中科发5号”选育成功'

        },
        {
          id: 5,
          usr_img: require('../assets/news7.jpg'),
          usr_name: '农科小能手',
          time: '09-12 17:20',
          news_img: require('../assets/news4.jpg'),
          news_title: '灾害损失减少30%、整精米率提高8%——水稻新品种“中科发5号”选育成功'

        }
      ]
    }
  },
  methods: {
    change_item (index) {
      this.itemNum = index
    },
    toCertainArticle: function (id) {
      this.$router.push({ path: '/community_article', query: { id: id } })
    },
    topTab () { // 功能：当页面滑动到一定位置，则固定选择栏
      var scrollTop = document.getElementsByClassName('main')[0].scrollTop
      var index = document.getElementsByClassName('choose-bar')[0].offsetTop
      if (scrollTop > index) {
        this.isFix = true
      } else if (this.isFix) {
        this.isFix = false
      }
      // console.log(this.isFix)
    }
  },
  created () {
    var id = this.$route.query.id
    console.log(id)
    this.$axios({
      method: 'post',
      url: 'http://106.15.192.168/group/findById',
      headers: { 'content-type': 'application/json',
        'token': this.$store.state.token },
      data: { id: id }
    }).then((response) => {
      console.log(response)
    })
  },
  mounted () {
    this.$nextTick(() => {
      window.addEventListener('scroll', this.topTab, true) // 加true,才起作用
    })
  },
  destroyed () {
    window.removeEventListener('scroll', this.topTab, true) // 离开网页清楚滚动监听，否则会报错
  }
}
</script>

<style scoped>
  .main::-webkit-scrollbar{
    display: none;
  }
  .title-area{
    width:95%;
    display:flex;
    margin:10px auto 0 auto;
    align-items: center;
  }
  .title-num{
    font-size:1.1rem;
    font-weight: bold;
  }
  .title-item{
    font-size:0.9rem;
    color:darkgray;
    text-align: center;
  }
  .intro-area{
    width:95%;
    font-size:0.9rem;
    color:gray;
    margin:0.6rem auto;
    letter-spacing: 1px;
    display:flex;
    justify-content: center;
  }
  .fixbar{
    position:fixed;
    top:0;
    background-color:white;
  }
  .choose-bar{
    display:flex;
    justify-content: center;
    height:2.5rem;
    width:100%;
    border-bottom:1px solid #efefef;
  }
  .choose-bar > .active{
    color:red;
    border-bottom: 1px solid red;
  }
  .choose-item{
    height:2.5rem;
    width:3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size:1.1rem;
    margin:0 0.8rem;
  }
  .choose-content{
    width:100%;
    margin:15px auto;
  }
</style>
