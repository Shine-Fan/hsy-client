<template>
  <div style="width:100%;display:flex;flex-direction: column;align-items: center">
    <div style="display: flex;justify-content: center;">
      <div class="tool-item">单产品查询</div>
      <div class="tool-item">对比查询</div>
    </div>
    <div id="choose_area" style="position:relative;top:1rem;width:90%;display:flex;flex-direction:column;align-items: center">
      <div class="choose-item" style="top:0;">
        <div style="width:20%;">类别</div>
        <select style="width:70%;background-color:white" name="product" v-model="kind1" onmousedown="if(this.options.length > 5){this.size = 5;this.style.zIndex=1;}
        else{this.size=this.options.length;this.style.zIndex=1;}"
                onblur="this.size = 0;this.style.zIndex=0;" onchange="this.size=0;this.style.zIndex=0;">
          <option value="-1" selected disabled>请选择产品类别</option>
          <option v-for="(item,index1) in show_kind1" :key="index1" :value="index1">
            {{item.farmProductsName.productsName}}
          </option>
        </select>
      </div>
      <div class="choose-item" style="top:3rem;">
        <div style="width:20%;">产品</div>
        <select style="width:70%;background-color:white" name="product" v-model="kind2" onmousedown="if(this.options.length > 8){this.size = 8;this.style.zIndex=1;}
        else{this.size=this.options.length;this.style.zIndex=1;}"
                onblur="this.size = 0;this.style.zIndex=0;" onchange="this.size=0;this.style.zIndex=0;">
            <option value="-1" selected disabled>请选择产品</option>
            <option v-for="(item,index2) in show_kind2.childs"
                    :key="index2"
                    :value="index2">
              {{item.farmProductsName.productsName}}
            </option>
        </select>
      </div>
      <div class="choose-item" style="top:6rem;">
        <div style="width:20%;">地名</div>
        <select style="width:70%;background-color:white" name="product" v-model="location1" onmousedown="if(this.options.length > 8){this.size = 8;this.style.zIndex=1;}
        else{this.size=this.options.length;this.style.zIndex=1;}"
                onblur="this.size = 0;this.style.zIndex=0;" onchange="this.size=0;this.style.zIndex=0;">
          <option value="-1" selected disabled>请选择地名</option>
          <option v-for="(item,index) in show_location1" :key="index" :value="index">
            {{item.farmProductsPlaceDB.marketName}}
          </option>
        </select>
      </div>
      <div class="choose-item" style="top:9rem;">
        <div style="width:20%;">市场</div>
        <select style="width:70%;background-color:white" name="product" v-model="location2" onmousedown="if(this.options.length > 8){this.size = 8;this.style.zIndex=1;}
        else{this.size=this.options.length;this.style.zIndex=1;}"
                onblur="this.size = 0;this.style.zIndex=0;" onchange="this.size=0;this.style.zIndex=0;">
          <option value="-1" selected disabled>请选择市场</option>
          <option v-for="(item,index) in show_location2.childs" :key="index" :value="index">
            {{item.farmProductsPlaceDB.marketName}}
          </option>
        </select>
      </div>
      <div style="width:90%;display:flex;position:absolute;top:12.5rem;justify-content: space-around">
        <input style="width:140px" type="date" v-model="startTime"/>
        <div>至</div>
        <input style="width:140px" type="date" v-model="endTime"/>
      </div>
      <div style="width:90%;position: absolute;top:15rem;font-size: 0.9rem;color:gray;text-align: center">注：请选择整周、整月、整年时间段</div>
      <div style="display:flex;position:absolute;top:17rem">
        <button style="margin:0 15px" @click="search">查询</button>
        <button style="margin:0 15px" @click="reset">重置</button>
      </div>
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
    <div style="position:absolute;top:55%;width:100%;overflow-x: scroll">
      <line-chart ref="linechart"></line-chart>
    </div>
  </div>
</template>

<script>
import lineChart from '../components/lineChart'
export default {
  name: 'searchLineChart',
  components: {
    lineChart
  },
  data: function () {
    return {
      kind1: 4,
      kind2: 6,
      location1: 1,
      location2: 1,
      show_kind1: null,
      show_location1: null,
      startTime: '2016-12-01',
      endTime: '2016-12-31',
      chartInfo: {},
      resultFlag: 0 // 0:默认；1：正在查询；2：未找到结果；
    }
  },
  computed: {
    show_kind2: function () {
      return this.kind1 > -1 ? this.show_kind1[this.kind1] : []
    },
    show_location2: function () {
      return this.location1 > -1 ? this.show_location1[this.location1] : []
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
  },
  methods: {
    reset: function () {
      this.kind1 = -1
      this.kind2 = -1
      this.location1 = -1
      this.location2 = -1
      this.$refs.linechart.clearChart()
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
    search: function () {
      if (this.kind1 > -1 && this.kind2 > -1 && this.location1 > -1 && this.location2 > -1) {
        // console.log(this.show_location1[this.location1].childs[this.location2].farmProductsPlaceDB.marketName)
        // console.log(this.show_kind1[this.kind1].childs[this.kind2].farmProductsName.productsName)
        console.log(this.startTime)
        // console.log(this.endTime)
        this.$refs.linechart.clearChart()
        this.resultFlag = 1
        this.$axios({
          method: 'post',
          url: 'http://106.15.192.168/gadget/farmProductsPrice/find',
          headers: { 'content-type': 'application/json',
            'token': this.$store.state.token
          },
          data: {
            marketPlace: this.show_location1[this.location1].childs[this.location2].farmProductsPlaceDB.marketName,
            productName: this.show_kind1[this.kind1].childs[this.kind2].farmProductsName.productsName,
            startTime: this.startTime,
            endTime: this.endTime
          }
        }).then((response) => {
          console.log(response)
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
      } else {
        console.log('选择参数不足')
      }
    }
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
