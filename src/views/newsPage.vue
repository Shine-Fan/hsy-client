<template>
  <div class="main">
    <div>
      <div class="news-menu">
        <div class="choose-bar">
          <ul class="layer1">
            <li v-for="(item,index) in chooseBarContent"
                :key="index"
                class="layer1-item"
                :class="{'active1':isActive1 == index}"
                @click="changeStatus(index,1)"
            >{{item.class}}
            </li>
          </ul>
        </div>
        <div class="choose-bar">
          <ul class="layer2">
            <li v-for="(item,index) in chooseBarContent[isActive1].children"
                :key="index"
            >
              <div class="layer2-item"
                   :class="{'active2':isActive2 == index}"
                   @click="changeStatus(index,2)"
              >{{item.class}}
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
               :newsName="item.name"
               :newsDate="item.date"
               :summary="item.summary"
               :readerNum="item.number"
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
          class: '新闻头条',
          children: [
            {
              class: '热点资讯'
            },
            {
              class: '三农快讯'
            },
            {
              class: '政策法规'
            },
            {
              class: '农资趣事'
            },
            {
              class: '打假专区'
            },
            {
              class: '人物周刊'
            },
            {
              class: '展会信息'
            },
            {
              class: '农资企业'
            }
          ]
        },
        {
          class: '行情数据',
          children: [
            {
              class: '每日行情'
            },
            {
              class: '价格走势'
            },
            {
              class: '趋势预测'
            },
            {
              class: '价格预测'
            },
            {
              class: '涨跌预警'
            },
            {
              class: '价格地图'
            },
            {
              class: '产量价格'
            }
          ]
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
        },
        {
          src: require('../assets/news4.jpg'),
          name: '玉米、小麦卢瑟品种指标体系发布',
          date: '2019-08-20',
          number: 999

        },
        {
          src: require('../assets/news5.jpg'),
          name: '油菜籽质好价稳',
          date: '2019-08-19',
          number: 699
        },
        {
          src: require('../assets/news6.png'),
          name: '国产大豆货源紧张',
          date: '2019-08-20',
          number: 399
        },
        {
          src: require('../assets/news7.jpg'),
          name: '玉米、小麦卢瑟品种指标体系发布',
          date: '2019-08-20',
          number: 999

        },
        {
          src: require('../assets/news8.jpg'),
          name: '油菜籽质好价稳',
          date: '2019-08-19',
          number: 699
        },
        {
          src: require('../assets/news1.jpg'),
          name: '国产大豆货源紧张',
          date: '2019-08-20',
          number: 399
        }
      ],
      isActive1: 0,
      isActive2: 0
    }
  },
  methods: {
    changeStatus (index, num) {
      if (num === 1) {
        this.isActive1 = index
        this.isActive2 = 0
      } else if (num === 2) {
        this.isActive2 = index
      }
    }
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
