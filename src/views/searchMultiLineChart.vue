<template>
  <div style="overflow:scroll;width:100%;heigt:100%;display:flex;flex-direction: column;align-items: center">
    <div v-if="reset" style="width:100%;">
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
                         :determined = "item.determined"
                         @confirmChooseBar="confirmChooseBar"
                         @resetChooseBar = "resetChooseBar"
                         @cancelChooseBar="cancelChooseBar">
      </search-choose-bar>
      <div style="width:100%;display:flex;flex-direction:column;align-items: center;margin-bottom:10px">
        <div style="width:100%;display:flex;justify-content: space-around;padding:10px 0;">
          <div><input v-model="type" value="day" type="radio">以日为单位</div>
          <div><input v-model="type" value="month" type="radio">以月为单位</div>
          <div><input v-model="type" value="year" type="radio">以年为单位</div>
        </div>
        <div v-if="type==='day'" style="display:flex;justify-content: space-around">
          <input style="width:140px" type="date" v-model="startTime"/>
          <div>&nbsp;至&nbsp;</div>
          <input style="width:140px" type="date" v-model="endTime"/>
        </div>
        <div v-else-if="type==='month'" style="display:flex;justify-content: space-around">
          <input style="width:140px" type="month" v-model="startTime"/>
          <div>&nbsp;至&nbsp;</div>
          <input style="width:140px" type="month" v-model="endTime"/>
        </div>
        <div v-else-if="type==='year'" style="display:flex;flex-direction:column;">
          <div style="display:flex;justify-content: space-around">
            <input style="width:100px;border:1px solid gray" type="text" v-model="startTime"/>
            <div>&nbsp;至&nbsp;</div>
            <input style="width:100px;border:1px solid gray" type="text" v-model="endTime"/>
          </div>
          <div>*请输入整年份，如2016至2017</div>
        </div>
      </div>
    </div>
    <div style="display:flex;justify-content: center">
      <button style="margin:0.5rem 1rem" @click="addLine">添加条目</button>
      <button style="margin:0.5rem 1rem" @click="searchResult">查询结果</button>
    </div>
    <div v-if="resultFlag===1" style="margin-top:3rem;display: flex;justify-content: center;align-items: center">
      <!--      <span style="margin:0 0.5rem">正在查询，请稍后</span>-->
      <!--      <i class="fa fa-spinner"></i>-->
      <div class="spinner-border spinner-border-sm" role="status"></div>
      <div style="margin:0 0.5rem">正在查询，请稍后</div>
    </div>
    <div v-if="resultFlag === 2" style="margin-top:3rem;display: flex;justify-content: center;align-items: center">
      <span style="margin:0 0.5rem">未找到结果</span>
    </div>
    <div style="width:100%;height:50%;overflow-x: scroll;margin-top:2rem;text-align: center">
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
      type: 'day',
      lineInfo: [{
        id: 0,
        kind1: 4,
        kind2: 6,
        location1: 1,
        location2: 1,
        determined: false
      }],
      startTime: '',
      endTime: '',
      reset: true,
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
      // lineTemp.startTime = ''
      // lineTemp.endTime = ''
      lineTemp.determined = false
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
      temp.determined = false
      temp.kind1 = -1
      temp.kind2 = -1
      temp.location1 = -1
      temp.location2 = -1
      // temp.startTime = ''
      // temp.endTime = ''
      this.lineInfo.splice(index, 1, temp)
    },
    cancelChooseBar: function (index) {
      console.log(index + '!')
      this.lineInfo.splice(index, 1)
      this.reset = false
      this.$nextTick(() => {
        this.reset = true
      })
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
      var flag = [ 0, 0, 0, 0]
      var lines = this.lineInfo
      var len = this.lineInfo.length
      var type = 0
      for (var i = 0; i < len; i++) {
        if (len === 1) break
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
      }
      var flagCount = -1
      if (len === 1) {
        flagCount = 0
        type = 1
      } else if (flag[0] === 1 || flag[1] === 1) {
        if (flag[2] === 0 && flag[3] === 0) {
          flagCount = 0
          type = 1
        } else {
          flagCount = 1
          console.log('请确保只有唯一变量')
        }
      } else if (flag[2] === 1 || flag[3] === 1) {
        if (flag[0] === 0 && flag[1] === 0) {
          flagCount = 0
          type = 2
        } else {
          flagCount = 1
          console.log('请确保只有唯一变量')
        }
      } else if (flag[0] === 0 && flag[1] === 0 && flag[2] === 0 && flag[3] === 0) {
        flagCount = 1
        console.log('请确保有唯一变量')
      } else {
        flagCount = 1
        console.log('请确保只有唯一变量')
      }
      if (this.startTime > this.endTime) {
        flagCount = 1
        console.log('请确保起始日期小于终止日期')
      }
      if (this.type === 'day') {
        if (this.startTime.split('')[5] < this.endTime.split('')[5] || this.startTime.split('')[6] < this.endTime.split('')[6]) {
          flagCount = 1
          console.log('请确保在同一月中进行比较')
        }
      }
      if (this.type === 'month') {
        if (this.startTime.split('')[0] !== this.endTime.split('')[0] ||
           this.startTime.split('')[1] !== this.endTime.split('')[1] ||
           this.startTime.split('')[2] !== this.endTime.split('')[2] ||
           this.startTime.split('')[3] !== this.endTime.split('')[3]) {
          flagCount = 1
          console.log('请确保在同一年中进行比较')
        }
      }
      if (flagCount === 1) {
        console.log('请确保选项符合要求')
      } else {
        this.$refs.linechart.clearChart()
        this.resultFlag = 1
        var data = {}
        var marketPlace = ['marketPlace1', 'marketPlace2', 'marketPlace3', 'marketPlace4', 'marketPlace5']
        var productName = ['productName1', 'productName2', 'productName3', 'productName4', 'productName5']
        var startTime = ['startTime1', 'startTime2', 'startTime3', 'startTime4', 'startTime5']
        var endTime = ['endTime1', 'endTime2', 'endTime3', 'endTime4', 'endTime5']
        data.times = len
        var j
        if (this.type === 'day') {
          for (j = 0; j < len; j++) {
            data[marketPlace[j]] = this.show_location1[lines[j].location1].childs[lines[j].location2].farmProductsPlaceDB.marketName
            data[productName[j]] = this.show_kind1[lines[j].kind1].childs[lines[j].kind2].farmProductsName.productsName
            data[startTime[j]] = this.startTime
            data[endTime[j]] = this.endTime
          }
          this.$axios({
            method: 'post',
            url: 'http://106.15.192.168/gadget/farmProductsPrice/find',
            headers: { 'content-type': 'application/json',
              'token': this.$store.state.token
            },
            data: data
          }).then((response) => {
            // console.log(response)
            if (response.data.status !== -1) {
              this.resultFlag = 0
              var data = response.data.data
              var chartInfo = {}
              var minPrice = 100000
              var maxPrice = 0
              var dataLen = data.length
              var i
              if (type === 1) {
                for (i = 0; i < dataLen; i++) {
                  if (!chartInfo.hasOwnProperty(data[i].productNM)) {
                    chartInfo[data[i].productNM] = {}
                    chartInfo[data[i].productNM].timeNode = []
                    chartInfo[data[i].productNM].priceNode = []
                  }
                  chartInfo[data[i].productNM].timeNode.push(this.formatDate(data[i].marketTime))
                  chartInfo[data[i].productNM].priceNode.push(data[i].price.toFixed(1))
                }
              } else if (type === 2) {
                for (i = 0; i < dataLen; i++) {
                  if (!chartInfo.hasOwnProperty(data[i].marketPlace)) {
                    chartInfo[data[i].marketPlace] = {}
                    chartInfo[data[i].marketPlace].timeNode = []
                    chartInfo[data[i].marketPlace].priceNode = []
                  }
                  chartInfo[data[i].marketPlace].timeNode.push(this.formatDate(data[i].marketTime))
                  chartInfo[data[i].marketPlace].priceNode.push(data[i].price.toFixed(1))
                }
                console.log(chartInfo)
              }
              for (i = 0; i < dataLen; i++) {
                if (data[i].price < minPrice) {
                  minPrice = data[i].price
                }
                if (data[i].price > maxPrice) {
                  maxPrice = data[i].price
                }
              }
              var totalDayTemp = 0
              var startTime = 31
              var endTime = 0
              for (var key in chartInfo) {
                var dayLen = chartInfo[key].timeNode.length
                chartInfo[key].totalDay = chartInfo[key].timeNode[dayLen - 1] - chartInfo[key].timeNode[0] + 1
                if (totalDayTemp < chartInfo[key].totalDay) {
                  totalDayTemp = chartInfo[key].totalDay
                }
                if (startTime > chartInfo[key].timeNode[0]) {
                  startTime = chartInfo[key].timeNode[0]
                }
                if (endTime < chartInfo[key].timeNode[dayLen - 1]) {
                  endTime = chartInfo[key].timeNode[dayLen - 1]
                }
              }
              var info = {}
              info.type = type // 1:产品不同;2:市场不同;3:年份不同
              info.total = totalDayTemp // 计算图中要显示的最长天数
              info.startTime = startTime
              info.endTime = endTime
              info.maxPrice = maxPrice.toFixed(1)
              info.minPrice = minPrice.toFixed(1)
              info.chartInfo = chartInfo
              this.$refs.linechart.drawLineChart(info)
              // console.log(response)
            } else {
              this.resultFlag = 2
              console.log('未查询到结果')
            }
          })
        } else if (this.type === 'month') {
          var year = this.startTime.substr(0, 4)
          for (j = 0; j < len; j++) {
            data[marketPlace[j]] = this.show_location1[lines[j].location1].childs[lines[j].location2].farmProductsPlaceDB.marketName
            data[productName[j]] = this.show_kind1[lines[j].kind1].childs[lines[j].kind2].farmProductsName.productsName
            data[startTime[j]] = year + '-01-01'
            data[endTime[j]] = year + '-12-31'
          }
          data.year = year
          // console.log(data)
          this.$axios({
            method: 'post',
            url: 'http://106.15.192.168/gadget/farmProductsPrice/find/average/month',
            headers: { 'content-type': 'application/json',
              'token': this.$store.state.token
            },
            data: data
          }).then((response) => {
            // console.log(response)
            if (response.data.status !== -1) {
              this.resultFlag = 0
              var data = response.data.data
              var info = {}
              var chartInfo = {}
              var maxPrice = 0
              var minPrice = 10000
              var i
              if (type === 1) {
                for (i = 0; i < data.length; i++) {
                  if (!chartInfo.hasOwnProperty(data[i].productNM)) {
                    chartInfo[data[i].productNM] = {}
                    chartInfo[data[i].productNM].timeNode = []
                    chartInfo[data[i].productNM].priceNode = []
                  }
                  chartInfo[data[i].productNM].timeNode.push(i % 12 + 1)
                  chartInfo[data[i].productNM].priceNode.push(data[i].price.toFixed(1))
                }
              } else if (type === 2) {
                for (i = 0; i < data.length; i++) {
                  if (!chartInfo.hasOwnProperty(data[i].marketPlace)) {
                    chartInfo[data[i].marketPlace] = {}
                    chartInfo[data[i].marketPlace].timeNode = []
                    chartInfo[data[i].marketPlace].priceNode = []
                  }
                  chartInfo[data[i].marketPlace].timeNode.push(i % 12 + 1)
                  chartInfo[data[i].marketPlace].priceNode.push(data[i].price.toFixed(1))
                }
              }
              for (i = 0; i < data.length; i++) {
                if (data[i].price < minPrice) {
                  minPrice = data[i].price
                }
                if (data[i].price > maxPrice) {
                  maxPrice = data[i].price
                }
              }
              info.type = type
              info.chartInfo = chartInfo
              info.minPrice = minPrice.toFixed(1)
              info.maxPrice = maxPrice.toFixed(1)
              info.startTime = 1
              info.endTime = 12
              info.total = 12
              // console.log(info)
              this.$refs.linechart.drawLineChart(info)
            } else {
              this.resultFlag = 2
              console.log('未查询到结果')
            }
          })
        } else if (this.type === 'year') {
          for (j = 0; j < len; j++) {
            data[marketPlace[j]] = this.show_location1[lines[j].location1].childs[lines[j].location2].farmProductsPlaceDB.marketName
            data[productName[j]] = this.show_kind1[lines[j].kind1].childs[lines[j].kind2].farmProductsName.productsName
            data[startTime[j]] = this.startTime + '-01-01'
            data[endTime[j]] = this.endTime + '-12-01'
          }
          // console.log(data)
          this.$axios({
            method: 'post',
            url: 'http://106.15.192.168/gadget/farmProductsPrice/find/average/year',
            headers: { 'content-type': 'application/json',
              'token': this.$store.state.token
            },
            data: data
          }).then((response) => {
            console.log(response)
            if (response.data.status !== -1) {
              this.resultFlag = 0
              var data = response.data.data
              var i, k
              var junzhi = 0
              var count = 0
              var total = parseInt(this.endTime) - parseInt(this.startTime) + 1
              var productNM
              var marketPlace
              var info = {}
              var chartInfo = {}
              var maxPrice = 0
              var minPrice = 10000
              var del = []
              for (k = 0; k < data.length / total; k++) {
                count = 0
                junzhi = 0
                productNM = ''
                marketPlace = ''
                for (i = k * total; i < total * (k + 1); i++) {
                  if (!isNaN(data[i].price)) {
                    count++
                    junzhi += data[i].price
                    productNM = data[i].productNM
                    marketPlace = data[i].marketPlace
                  }
                }
                if (junzhi !== 0) {
                  junzhi = junzhi / count
                  for (i = k * total; i < total * (k + 1); i++) {
                    if (isNaN(data[i].price)) {
                      data[i].price = junzhi
                      data[i].productNM = productNM
                      data[i].marketPlace = marketPlace
                    }
                  }
                } else {
                  for (i = k * total; i < total * (k + 1); i++) {
                    del.push(i)
                  }
                }
              }
              count = 0
              for (i = 0; i < del.length; i++) {
                data.splice(del[i] - count, 1)
                count++
              }
              // console.log(data)
              if (type === 1) {
                for (i = 0; i < data.length; i++) {
                  if (!chartInfo.hasOwnProperty(data[i].productNM)) {
                    chartInfo[data[i].productNM] = {}
                    chartInfo[data[i].productNM].timeNode = []
                    chartInfo[data[i].productNM].priceNode = []
                  }
                  chartInfo[data[i].productNM].timeNode.push(i % total + parseInt(this.startTime))
                  chartInfo[data[i].productNM].priceNode.push(data[i].price.toFixed(1))
                }
              } else if (type === 2) {
                for (i = 0; i < data.length; i++) {
                  if (!chartInfo.hasOwnProperty(data[i].marketPlace)) {
                    chartInfo[data[i].marketPlace] = {}
                    chartInfo[data[i].marketPlace].timeNode = []
                    chartInfo[data[i].marketPlace].priceNode = []
                  }
                  chartInfo[data[i].marketPlace].timeNode.push(i % total + parseInt(this.startTime))
                  chartInfo[data[i].marketPlace].priceNode.push(data[i].price.toFixed(1))
                }
              }
              for (i = 0; i < data.length; i++) {
                if (data[i].price < minPrice) {
                  minPrice = data[i].price
                }
                if (data[i].price > maxPrice) {
                  maxPrice = data[i].price
                }
              }
              info.type = type
              info.chartInfo = chartInfo
              info.minPrice = minPrice.toFixed(1)
              info.maxPrice = maxPrice.toFixed(1)
              info.startTime = parseInt(this.startTime)
              info.endTime = parseInt(this.endTime)
              info.total = total
              // console.log(info)
              this.$refs.linechart.drawLineChart(info)
            } else {
              this.resultFlag = 2
              console.log('未查询到结果')
            }
          })
        }
        // data.times = 2
        // data.marketPlace1 = '北京朝阳区大洋路农副产品批发市场'
        // data.productName1 = '韭菜'
        // data.startTime1 = '2016-12-01'
        // data.endTime1 = '2016-12-07'
        // data.marketPlace2 = '北京昌平水屯农副产品批发市场'
        // data.productName2 = '韭菜'
        // data.startTime2 = '2016-12-01'
        // data.endTime2 = '2016-12-07'
        // console.log(data)
      }
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
// to do list:1.做一个分类栏，本别为以日为单位查询，以月为单位查询，以年为单位查询
//           2.补充以月为单位的界面，以年为单位的界面
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
