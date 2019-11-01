<template>
  <div class="main">
    <div>
      <div class="news-menu">
        <div class="choose-bar">
          <ul class="layer1">
            <li v-for="(item1,index1) in chooseBarContent"
                :key="index1"
                class="layer1-item"
                :class="{'active1':isActive1 == index1}"
                @click="changeStatus(index1,item1.id,1)"
            >{{item1.name}}
            </li>
          </ul>
        </div>
        <div class="choose-bar">
          <ul class="layer2">
            <li v-for="(item2,index2) in chooseBarContent[isActive1].children"
                :key="index2"
            >
              <div class="layer2-item"
                   :class="{'active2':isActive2 == index2}"
                   @click="changeStatus(index2,item2.id,2)"
              >{{item2.name}}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div style="height:6.5rem;"></div>
    <div class="news_bar_area">
      <newsBar v-for="(item,index) in newsBarContent"
               :key="index"
               :imgSrc="item.src"
               :newsName="item.title"
               :newsDate="item.createTime"
               :newsAuthor="item.author"
               :newsId = "item.id"
               @toCertainNews="toCertainNews"
      ></newsBar>
    </div>
  </div>
</template>

<script>
import newsBar from '../components/newsBar'

export default {
  name: 'newsPage.vue',
  components: {
    newsBar
  },
  data: function () {
    return {
      chooseBarContent: [
        {
          name: '新闻头条',
          id: '1',
          children: [
            {
              name: '热点资讯',
              id: '11'
            },
            {
              name: '三农快讯',
              id: '12'
            },
            {
              name: '政策法规',
              id: '13'
            },
            {
              name: '农资趣事',
              id: '14'
            },
            {
              name: '打假专区',
              id: '15'
            },
            {
              name: '人物周刊',
              id: '16'
            },
            {
              name: '展会信息',
              id: '17'
            },
            {
              name: '农资企业',
              id: '18'
            }
          ]
        },
        {
          name: '行情数据',
          id: '2',
          children: [
            {
              name: '每日行情',
              id: '21'
            },
            {
              name: '价格走势',
              id: '22'
            },
            {
              name: '趋势预测',
              id: '23'
            },
            {
              name: '价格预测',
              id: '24'
            },
            {
              name: '涨跌预警',
              id: '25'
            },
            {
              name: '价格地图',
              id: '26'
            },
            {
              name: '产量价格',
              id: '27'
            }
          ]
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

        },
        {
          id: 5,
          src: require('../assets/news5.jpg'),
          title: '油菜籽质好价稳',
          createTime: 1563174571000,
          author: 'Liam'
        },
        {
          id: 6,
          src: require('../assets/news6.png'),
          title: '国产大豆货源紧张',
          date: 1563174571000,
          author: 'Eri'
        },
        {
          id: 7,
          src: require('../assets/news7.jpg'),
          title: '玉米、小麦卢瑟品种指标体系发布',
          date: 1563174571000,
          author: 'Lisa'

        },
        {
          id: 8,
          src: require('../assets/news8.jpg'),
          title: '油菜籽质好价稳',
          createTime: 1563174571000,
          author: 'Wang'
        },
        {
          id: 9,
          src: require('../assets/news1.jpg'),
          title: '国产大豆货源紧张',
          createTime: 1563174571000,
          author: 'Adam'
        }
      ],
      newsBar_origin: [
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

        },
        {
          id: 5,
          src: require('../assets/news5.jpg'),
          title: '油菜籽质好价稳',
          createTime: 1563174571000,
          author: 'Liam'
        },
        {
          id: 6,
          src: require('../assets/news6.png'),
          title: '国产大豆货源紧张',
          date: 1563174571000,
          author: 'Eri'
        },
        {
          id: 7,
          src: require('../assets/news7.jpg'),
          title: '玉米、小麦卢瑟品种指标体系发布',
          date: 1563174571000,
          author: 'Lisa'

        },
        {
          id: 8,
          src: require('../assets/news8.jpg'),
          title: '油菜籽质好价稳',
          createTime: 1563174571000,
          author: 'Wang'
        },
        {
          id: 9,
          src: require('../assets/news1.jpg'),
          title: '国产大豆货源紧张',
          createTime: 1563174571000,
          author: 'Adam'
        }
      ],
      isActive1: 0,
      isActive2: -1,
      pId: -1
    }
  },
  methods: {
    changeStatus (index, id, num) {
      if (num === 1) {
        this.isActive1 = index
        this.isActive2 = -1
        this.pId = id
        this.requestNewsItem(this.pId, 1)
      } else if (num === 2) {
        if (this.isActive2 === -1 || this.isActive2 !== index) {
          this.isActive2 = index
          this.requestNewsItem(id, 2)
        } else {
          this.isActive2 = -1
          this.requestNewsItem(this.pId, 1)
        }
      }
    },
    requestNewsItem (id, index) {
      // 请求属于父id的所有新闻列表
      if (index === 1) {
        this.newsBarContent = this.newsBar_origin
        // this.$axios({
        //   method: 'post',
        //   url: 'http://106.15.192.168/news/find_all',
        //   data: {
        //   },
        //   headers: { 'content-type': 'application/json' }
        // }).then((response) => {
        //   this.chooseBarContent = response.data.data
        //   console.log('获取所属父id的新闻列表成功')
        // })
      } else if (index === 2) {
        this.$axios({
          method: 'post',
          url: 'http://106.15.192.168/news/find_section',
          data: {
            sectionId: 1
          },
          headers: { 'content-type': 'application/json' }
        }).then((response) => {
          console.log('获取所属子id的新闻列表成功')
          this.newsBarContent = response.data.data
          console.log(response)
        })
      }
    },
    toCertainNews (id) {
      console.log(id)
      this.$router.push({ path: '/news_detail', query: { id: id } })
    }
  },
  created () {
    // 请求获取新闻板块名称
    this.$axios({
      method: 'get',
      url: 'http://106.15.192.168/news/section',
      header: { 'content-type': 'application/json'}
    }).then((response) => {
      console.log('获取新闻板块名称成功')
      // this.chooseBarContent = response.data.data
    })
    // 获取所属父板块的所有新闻
    // this.$axios({
    //   method: 'post',
    //   url: 'http://106.15.192.168/news/find_all',   //!!!!接口文档需要修改
    //   data: {
    //   },
    //   header: { 'content-type': 'application/json' }
    // }).then((res) => {
    //   //this.newsBarContent = res.data.data
    //   console.log(res)
    // })
  }
}
</script>

<style scoped>
  .news-menu {
    position: fixed;
    top: 0;
    width:100%;
    background-color:white;
    z-index:4;
    padding-bottom:0.25rem;
    border-bottom: 0.1rem solid lightgray;
  }

  .layer1 {
    font-size: 1.1rem;
    white-space: nowrap; /*只在一行显示*/
    overflow-x: auto; /*超出范围,则使用滚动条*/
    height: 2.8rem;
    display: flex;
    align-items: center;
    padding: 0;
    margin: 0 0.5rem;
    list-style: none;
    border-bottom: 1px solid #bfbfbf;
  }

  .layer1::-webkit-scrollbar { /*去掉滚动条效果*/
    display: none;
  }

  .layer1-item {
    line-height: 2.8rem;
    height: 2.8rem;
    margin: 0 0.5rem;
  }

  .active1 {
    color: royalblue;
    border-bottom: 2px solid royalblue;
  }

  .layer2 {
    font-size: 1rem;
    white-space: nowrap; /*只在一行显示*/
    overflow-x: auto; /*超出范围,则使用滚动条*/
    height: 2.8rem;
    display: flex;
    align-items: center;
    padding: 0;
    margin: 0.25rem 0.25rem;
    list-style: none;
  }

  .layer2::-webkit-scrollbar { /*去掉滚动条效果*/
    display: none;
  }

  .layer2-item {
    display: flex;
    align-items: center;
    height: 2rem;
    padding: 0 0.5rem;
    margin: 0 0.5rem;
    border-radius: 1rem;
    color: royalblue;
    border: 1px solid royalblue;
  }

  .active2 {
    background-color: royalblue;
    color: white;
  }

  .news_bar_area {
    margin: 0.5rem 1.25rem 1rem;
  }
  .main{
    position:absolute;
    top:0;
    overflow:scroll;
    width:100%;
    height:100%;
  }
  .main::-webkit-scrollbar{
    display:none;
  }
</style>
