<template>
  <div style="width:100%;heigt:100%;display:flex;flex-direction: column;align-items: center">
    <div style="width:100%;">
      <search-choose-bar class="search-choose-bar" v-for="(item,index) in lineInfo"
                         :key = "item.id"
                         :show_kind1="show_kind1"
                         :show_location1="show_location1"
                         :index = "index"
                         :id = "item.id"
                         :kind1="item.kind1"
                         :kind2="item.kind2"
                         :location1="item.location1"
                         :location2="item.location2"
                         :startTime="item.startTime"
                         :endTime="item.endTime"
                         @confirmChooseBar="confirmChooseBar"
                         @resetChooseBar = "resetChooseBar"
                         @cancelChooseBar="cancelChooseBar">
      </search-choose-bar>
    </div>
    <div style="display:flex;justify-content: center">
      <button style="margin:0.5rem 1rem" @click="addLine">添加条目</button>
      <button style="margin:0.5rem 1rem" @click="searchResult">查询结果</button>
    </div>
    <div v-if="resultFlag===1" style="position:absolute;top:25rem;display: flex;justify-content: center;align-items: center">
      <!--      <span style="margin:0 0.5rem">正在查询，请稍后</span>-->
      <!--      <i class="fa fa-spinner"></i>-->
      <div class="spinner-border spinner-border-sm" role="status"></div>
      <div style="margin:0 0.5rem">正在查询，请稍后</div>
    </div>
    <div v-if="resultFlag === 2" style="position:absolute;top:25rem;display: flex;justify-content: center;align-items: center">
      <span style="margin:0 0.5rem">未找到结果</span>
    </div>
    <div style="width:100%;height:50%;overflow-x: scroll">
      <line-chart ref="linechart"></line-chart>
    </div>
  </div>
</template>

<script>
import lineChart from '../components/lineChart'
import searchChooseBar from '../components/searchChooseBar'
export default {
  name: 'searchMultiLineChart',
  components: {
    lineChart,
    searchChooseBar
  },
  data: function () {
    return {
      lineInfo: [{
        id: 0,
        kind1: -1,
        kind2: -1,
        location1: -1,
        location2: -1
      }],
      count: 1,
      show_kind1: null,
      show_location1: null,
      chartInfo: {},
      resultFlag: 0 // 0:默认；1：正在查询；2：未找到结果；
    }
  },
  computed: {
    lineNum: function () {
      return this.lineInfo.length
    },
    show_kind2: function () {
      return this.kind1 > -1 ? this.show_kind1[this.kind1] : []
    },
    show_location2: function () {
      return this.location1 > -1 ? this.show_location1[this.location1] : []
    }
  },
  methods: {
    addLine: function () {
      var lineTemp = {}
      lineTemp.id = this.count
      this.count = this.count + 1
      lineTemp.kind1 = -1
      lineTemp.kind2 = -1
      lineTemp.location1 = -1
      lineTemp.location2 = -1
      this.lineInfo.push(lineTemp)
    },
    confirmChooseBar: function (lineTemp) {
      var index = lineTemp.index
      var data = lineTemp.data
      this.lineInfo.splice(index, 1, data)
      console.log(this.lineInfo)
    },
    resetChooseBar: function (index) {
      var temp = {}
      temp.id = this.lineInfo[index].id
      temp.kind1 = -1
      temp.kind2 = -1
      temp.location1 = -1
      temp.location2 = -1
      temp.startTime = ''
      temp.endTime = ''
      this.lineInfo.splice(index, 1, temp)
    },
    cancelChooseBar: function (index) {
      this.lineInfo.splice(index, 1)
      console.log(this.lineInfo)
    },
    formatDate: function (value) {
      var date = new Date(value)
      // var y = date.getFullYear()
      // var MM = date.getMonth() + 1
      // MM = MM < 10 ? ('0' + MM) : MM
      var d = date.getDate()
      // d = d < 10 ? ('0' + d) : d
      return d
    },
    searchResult: function () {
      // 先检查是否同一变量
      var flag = [ 0, 0, 0, 0, 0 ]
      var lines = this.lineInfo
      var len = this.lineInfo.length
      for (var i = 0; i < len; i++) {
        if (lines[i].kind1 !== lines[(i + 1) % len].kind1) {
          flag[0] = 1
        }
        if (lines[i].kind2 !== lines[(i + 1) % len].kind2) {
          flag[1] = 1
        }
        if (lines[i].location1 !== lines[(i + 1) % len].location2) {
          flag[2] = 1
        }
        if (lines[i].location2 !== lines[(i + 1) % len].location2) {
          flag[3] = 1
        }
        if (lines[i].startTime !== lines[(i + 1) % len].startTime && lines[i].endTime !== lines[(i + 1) % len].endTime) {
          flag[4] = 1
        }
      }
      var flagCount = 0
      for (var k = 0; k < flag.length; k++) {
        flagCount += flag[k]
      }
      console.log(flagCount)
      if (flagCount > 1) {
        console.log('请确保只有唯一变量')
      }
      // this.$refs.linechart.clearChart()
      this.resultFlag = 1
      this.$axios({
        method: 'post',
        url: 'http://106.15.192.168/gadget/farmProductsPrice/find',
        headers: { 'content-type': 'application/json',
          'token': this.$store.state.token
        },
        data: {
          marketPlace: '北京朝阳区大洋路农副产品批发市场',
          productName: '韭菜',
          startTime: '2016-12-01',
          endTime: '2016-12-16'
        }
      }).then((response) => {
        console.log(response.data)
        if (response.data.status !== -1) {
          this.resultFlag = 0
          var data = response.data.data
          var timeNode = []
          var priceNode = []
          var minPrice = 100000
          var maxPrice = 0
          var len = data.length
          for (var i = 0; i < len; i++) {
            timeNode.push(this.formatDate(data[i].marketTime))
            priceNode.push(data[i].price)
            if (data[i].price < minPrice) {
              minPrice = data[i].price
            }
            if (data[i].price > maxPrice) {
              maxPrice = data[i].price
            }
          }
          this.chartInfo.timeNode = timeNode
          this.chartInfo.priceNode = priceNode
          this.chartInfo.totalDay = timeNode[len - 1] - timeNode[0] + 1
          this.chartInfo.maxPrice = maxPrice
          this.chartInfo.minPrice = minPrice
          this.$refs.linechart.drawLineChart(this.chartInfo)
          // console.log(response)
          // console.log(this.chartInfo)
        } else {
          this.resultFlag = 2
          console.log('未查询到结果')
        }
      })
    }
  },
  created () {
    this.$axios({
      method: 'get',
      url: 'http://106.15.192.168/gadget/farmProductsPrice/classify',
      headers: { 'content-type': 'application/json',
        'token': this.$store.state.token
      }
    }).then((response) => {
      this.show_kind1 = response.data.data
      // console.log(response)
      this.$axios({
        method: 'get',
        url: 'http://106.15.192.168/gadget/farmProductsPrice/place',
        headers: { 'content-type': 'application/json',
          'token': this.$store.state.token
        }
      }).then((response) => {
        this.show_location1 = response.data.data
        // console.log(response)
      })
    })
  }
}
</script>

<style scoped>
  .tool-item{
    font-size: 1.2rem;
    padding:0.4rem 0.5rem;
  }
  .choose-item{
    width:90%;
    position:absolute;
    display: flex;
    font-size:1.1rem;
    margin:10px 0;
  }
  .choose-item:first-child{
    margin-top:15px;
  }

</style>
