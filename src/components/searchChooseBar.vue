<!--循环的时候key特别关键，key值不改变，视图可能不会按照理想的方式改变-->
<template>
  <div style="width:90%;display: flex;justify-content: center;margin: 0 1rem;">
<!--    <div style="width:10%;display: flex;justify-content: center" @click="exchange">-->
<!--      <i v-if="showFlag" class="fa fa-plus" style="width:1.2rem;height:1.2rem;color:gray;border:2px solid gray;border-radius:50%;text-align: center;margin:1rem"></i>-->
<!--      <i v-else class="fa fa-minus" style="width:1.2rem;height:1.2rem;color:gray;border:2px solid gray;border-radius:50%;text-align: center;margin:1rem"></i>-->
<!--    </div>-->
    <div style="width:100%">
      <div v-if="showFlag" style="margin-top:1rem;padding-top:10px;width:100%;display:flex;flex-direction: column;margin-bottom:5px;padding-bottom:1rem;box-shadow: 1px 2px 3px grey;">
        <div class="result-item">
          <div class="result-title">类别</div>
          <div>{{this.showKind1}}</div>
        </div>
        <div class="result-item">
          <div class="result-title">产品</div>
          <div>{{showKind2}}</div>
        </div>
        <div class="result-item">
          <div class="result-title">地名</div>
          <div>{{showLocation1}}</div>
        </div>
        <div class="result-item">
          <div class="result-title">市场</div>
          <div>{{showLocation2}}</div>
        </div>
        <button style="margin:0 3rem 0 15px;width:3rem;align-self: flex-end" @click="cancel">删除</button>
      </div>
      <div v-else id="choose_area" style="position:relative;top:0rem;width:100%;height:15rem;display:flex;flex-direction:column;align-items: center">
        <div class="choose-item" style="top:0rem;">
          <div style="width:20%;">类别</div>
          <select style="width:70%;background-color:white" name="product" v-model="kind1_temp" onmousedown="if(this.options.length > 5){this.size = 5;this.style.zIndex=1;}
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
          <select style="width:70%;background-color:white" name="product" v-model="kind2_temp" onmousedown="if(this.options.length > 8){this.size = 8;this.style.zIndex=1;}
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
          <select style="width:70%;background-color:white" name="product" v-model="location1_temp" onmousedown="if(this.options.length > 8){this.size = 8;this.style.zIndex=1;}
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
          <select style="width:70%;background-color:white" name="product" v-model="location2_temp" onmousedown="if(this.options.length > 8){this.size = 8;this.style.zIndex=1;}
      else{this.size=this.options.length;this.style.zIndex=1;}"
                  onblur="this.size = 0;this.style.zIndex=0;" onchange="this.size=0;this.style.zIndex=0;">
            <option value="-1" selected disabled>请选择市场</option>
            <option v-for="(item,index) in show_location2.childs" :key="index" :value="index">
              {{item.farmProductsPlaceDB.marketName}}
            </option>
          </select>
        </div>
        <div style="display:flex;justify-content: center;position:absolute;top:12.5rem">
          <button style="margin:0 15px 0 15px;width:3rem;" @click="confirm">确定</button>
          <button style="margin:0 15px 0 15px;width:3rem;" @click="cancel">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'searchChooseBar',
  props: {
    show_kind1: Array,
    show_location1: Array,
    index: Number,
    id: Number,
    kind1: Number,
    kind2: Number,
    location1: Number,
    location2: Number,
    // startTime: String,
    // endTime: String,
    determined: Boolean
  },
  data: function () {
    return {
      index_temp: this.index,
      id_temp: this.id,
      kind1_temp: this.kind1,
      kind2_temp: this.kind2,
      location1_temp: this.location1,
      location2_temp: this.location2,
      // startTime_temp: this.startTime,
      // endTime_temp: this.endTime,
      showFlag: this.determined
    }
  },
  computed: {
    show_kind2: function () {
      return this.kind1_temp > -1 ? this.show_kind1[this.kind1_temp] : []
    },
    show_location2: function () {
      return this.location1_temp > -1 ? this.show_location1[this.location1_temp] : []
    },
    showKind1: function () { // 用于列表收缩后显示摘要
      return this.kind1_temp > -1 ? this.show_kind1[this.kind1_temp].farmProductsName.productsName : null
    },
    showKind2: function () {
      return this.kind1_temp > -1 && this.kind2_temp > -1 ? this.show_kind2.childs[this.kind2_temp].farmProductsName.productsName : null
    },
    showLocation1: function () {
      return this.location1_temp > -1 ? this.show_location1[this.location1_temp].farmProductsPlaceDB.marketName : null
    },
    showLocation2: function () {
      return this.location1_temp > -1 && this.location2_temp > -1 ? this.show_location2.childs[this.location2_temp].farmProductsPlaceDB.marketName : null
    }
  },
  methods: {
    exchange () {
      this.showFlag = !this.showFlag
    },
    confirm () {
      if (this.kind1_temp !== -1 && this.kind2_temp !== -1 && this.location1_temp !== -1 && this.location2_temp !== -1 && this.startTime_temp !== '' && this.endTime_temp !== '') {
        console.log('confirm')
        this.showFlag = !this.showFlag
        // if (this.id_temp > -1 && this.kind1_temp > -1 && this.kind2_temp > -1 && this.location1_temp > -1 && this.location2_temp > -1)
        var lineTemp = {}
        lineTemp.index = this.index_temp
        lineTemp.data = {}
        lineTemp.data.id = this.id_temp
        lineTemp.data.determined = this.showFlag
        lineTemp.data.kind1 = this.kind1_temp
        lineTemp.data.kind2 = this.kind2_temp
        lineTemp.data.location1 = this.location1_temp
        lineTemp.data.location2 = this.location2_temp
        // lineTemp.data.startTime = this.startTime_temp
        // lineTemp.data.endTime = this.endTime_temp
        this.$emit('confirmChooseBar', lineTemp)
      } else {
        console.log('参数选择不全，请将参数选择完整！')
      }
    },
    reset () {
      this.kind1_temp = -1
      this.kind2_temp = -1
      this.location1_temp = -1
      this.location2_temp = -1
      // this.startTime_temp = ''
      // this.endTime_temp = ''
      this.$emit('resetChooseBar', this.id_temp)
    },
    cancel () {
      console.log(this.index_temp)
      this.$emit('cancelChooseBar', this.index_temp)
    }
  }
}
</script>

<style scoped>
  .result-title{
    width:20%;
    text-align: center;
  }
  .result-item{
    width:100%;
    display: flex;
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
