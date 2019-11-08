<!--大坑：@click事件重名-->
<template>
  <div>
    <div :style="{'height':dynamicHeight}" style="position:relative;top:0rem;margin:10px 1rem 0;display:flex;flex-direction:column;align-items: center;" >
      <div class="choose-item" style="top:0rem">
        <div class="choose-item-title">类别</div>
        <select name="class1" class="choose-item-content" v-model="class1" onmousedown="if(this.options.length > 5){this.size = 5;this.style.zIndex=1;}
      else{this.size=this.options.length;this.style.zIndex=1;}"
                onblur="this.size = 0;this.style.zIndex=0;" onchange="this.size=0;this.style.zIndex=0;">
          <option name="class1" value="-1" selected disabled>请选择产品类别</option>
          <option name="class1" v-for="(item,index) in show_class1" :key="index" :value="index">{{item.farmProductsName.productsName}}</option>
        </select>
      </div>
      <div class="choose-item" style="top:3rem">
        <div class="choose-item-title">产品</div>
        <select name="class2" class="choose-item-content" v-model="class2" onmousedown="if(this.options.length > 5){this.size = 5;this.style.zIndex=1;}
      else{this.size=this.options.length;this.style.zIndex=1;}"
                onblur="this.size = 0;this.style.zIndex=0;" onchange="this.size=0;this.style.zIndex=0;">
          <option name="class2" value="-1" selected disabled>请选择产品</option>
          <option name="class2" v-for="(item,index) in show_class2.childs" :key="index" :value="index">{{item.farmProductsName.productsName}}</option>
        </select>
      </div>
      <div v-if="isMarket" class="choose-item" style="top:6rem">
        <div class="choose-item-title">区域</div>
        <select name="class3" class="choose-item-content" v-model="location1" onmousedown="if(this.options.length > 5){this.size = 5;this.style.zIndex=1;}
      else{this.size=this.options.length;this.style.zIndex=1;}"
                onblur="this.size = 0;this.style.zIndex=0;" onchange="this.size=0;this.style.zIndex=0;">
          <option name="class3" value="-1" selected disabled>请选择区域</option>
          <option name="class3" v-for="(item,index) in show_location1" :key="index" :value="index">{{item.farmProductsPlaceDB.marketName}}</option>
        </select>
      </div>
    </div>
    <div style="display:flex;justify-content: space-around;margin:5px 0;">
      <input style="width:140px" type="date" v-model="startTime"/>
      <div>&nbsp;至&nbsp;</div>
      <input style="width:140px" type="date" v-model="endTime"/>
    </div>
    <div style="width:100%;display:flex;justify-content: space-around;padding:10px 0;">
      <div><input name="area" v-model="area" value="province" type="radio">省份比较</div>
      <div><input name="area" v-model="area" value="market" type="radio">市场比较</div>
    </div>
    <div style="display:flex;justify-content: center">
      <button style="margin:0.5rem 1rem" @click="searchPieChart">查询结果</button>
    </div>
    <div v-if="resultFlag===1" style="margin-top:3rem;display: flex;justify-content: center;align-items: center">
      <div class="spinner-border spinner-border-sm" role="status"></div>
      <div style="margin:0 0.5rem">正在查询，请稍后</div>
    </div>
    <div v-if="resultFlag === 2" style="margin-top:3rem;display: flex;justify-content: center;align-items: center">
      <span style="margin:0 0.5rem">未找到结果</span>
    </div>
    <div style="position:absolute;top:50%;width:100%;overflow-x: scroll">
      <pie-chart ref="piechart"></pie-chart>
    </div>
  </div>
</template>

<script>
import pieChart from '../components/pieChart'
export default {
  name: 'searchPieChart',
  components: {
    pieChart
  },
  data: function () {
    return {
      class1: -1,
      class2: -1,
      location1: -1,
      // location2: -1,
      show_class1: null,
      show_location1: null,
      area: 'province',
      startTime: '2016-12-01',
      endTime: '2016-12-20',
      resultFlag: 0 // 0:默认；1：正在查询；2：未找到结果；
    }
  },
  computed: {
    dynamicHeight: function () {
      console.log(this.area)
      return this.area === 'market' ? '9rem' : '6rem'
    },
    isMarket: function () {
      return this.area === 'market'
    },
    show_class2: function () {
      console.log(this.class1)
      return this.class1 > -1 ? this.show_class1[this.class1] : []
    }
    // show_location2: function () {
    //   return this.location1 > -1 ? this.show_location1[this.location1] : []
    // }
  },
  created () {
    this.$axios({
      method: 'get',
      url: 'http://106.15.192.168/gadget/farmProductsPrice/classify',
      headers: {
        'content-type': 'application/json',
        'token': this.$store.state.token
      }
    }).then((response) => {
      this.show_class1 = response.data.data
      console.log(response)
      this.$axios({
        method: 'get',
        url: 'http://106.15.192.168/gadget/farmProductsPrice/place',
        headers: {
          'content-type': 'application/json',
          'token': this.$store.state.token
        }
      }).then((response) => {
        this.show_location1 = response.data.data
        console.log(response)
      })
    })
  },
  methods: {
    searchPieChart: function () {
      this.resultFlag = 1
      var data = {}
      data.productName = this.show_class1[this.class1].childs[this.class2].farmProductsName.productsName
      data.startTime = this.startTime
      data.endTime = this.endTime
      console.log(data)
      this.$axios({
        method: 'post',
        url: 'http://106.15.192.168/gadget/farmProductsPrice/find/average/marketPlace',
        headers: { 'content-type': 'application/json',
          'token': this.$store.state.token
        },
        data: data
      }).then((response) => {
        console.log(response)
        if (response.data.status !== -1) {
          this.resultFlag = 0
        } else {
          this.resultFlag = 2
        }
      })
      // this.$refs.piechart.drawPieChart()
    }
  }
}
</script>

<style scoped>
  .choose-item{
    width:85%;
    position:absolute;
    display: flex;
    justify-content: center;
    font-size:1.1rem;
    margin:10px 0;
  }
  .choose-item-title{
    width:20%;
  }
  .choose-item-content{
    width:70%;
    background-color: white;
  }
</style>
