<template>
  <div class="main" style="position:absolute;width:100%;height:100%;overflow: scroll">
    <div style="position:fixed;width:100%;padding:10px 5%;background-color:white;display:flex;flex-direction:column;padding-bottom:10px;border-bottom:2px solid gray">
      <div style="display:flex;justify-content:space-around;align-items: center;margin:10px 0">
        <label style="width:25%;letter-spacing: 1px;font-weight: bold">关键词：</label>
        <input style="width:75%;height:1.8rem;background-color:rgba(230,230,230,0.5);border:none;outline: none;padding:5px 10px;border-radius:0.2rem;" v-model="keyWord">
      </div>
      <div style="display:flex;justify-content:space-around;align-items: center;margin:10px 0">
        <span style="width:25%;letter-spacing: 1px;font-weight: bold">类别：</span>
        <div style="width:55%;display: flex;align-items: center">
          <div style="display: flex;align-items: center;margin:0 10px">
            <input type="radio" id="huafei" name="type" v-model="type" value="huafei">  <!--v-model控制数据绑定，value传递选中的数据，type控制同一按钮组-->
            <label for="huafei" style="margin:auto 3px">化肥</label>
          </div>
          <div style="display: flex;align-items: center;margin:0 10px">
            <input type="radio" id="nongyao" name="type" v-model="type" value="nongyao">
            <label for="nongyao" style="margin:auto 3px">农药</label>
          </div>
        </div>
        <div style="width:20%">
          <button @click="search">查询</button>
        </div>
      </div>
    </div>
    <div class="scroll-content" style="height:100%;width:95%;margin:8.5rem auto 0;">
      <div v-if="show_kind === 0">
        <huafeiBar v-for="(item,index) in huafeiList"
                   :key="index"
                   :item="item">
        </huafeiBar>
      </div>
      <div v-else-if="show_kind === 1">
        <nongyaoBar v-for="(item,index) in nongyaoList"
                   :key="index"
                   :item="item">
        </nongyaoBar>
      </div>
      <div v-else-if="show_kind === 2" style="margin:1rem 0;display: flex;justify-content: center">
        您查找的对象不存在，请完善关键词继续查找！
      </div>
    </div>
  </div>
</template>

<script>
import huafeiBar from '../components/huafeiBar'
import nongyaoBar from '../components/nongyaoBar'
export default {
  name: 'certificateSearch',
  components: {
    huafeiBar,
    nongyaoBar
  },
  data: function () {
    return {
      type: 'huafei',
      show_kind: -1, // -1:不显示，0:化肥，1:农药
      keyWord: '',
      huafeiList: [
        {
          id: 1,
          companyNM: '河南德华新陆作物保护有限公司',
          commonNM: '含腐植酸水溶肥料',
          registrationNo: '农肥（2019）准字14761号',
          forCrop: '小麦'
        },
        {
          id: 2,
          companyNM: '河南德华新陆作物保护有限公司',
          commonNM: '含腐植酸水溶肥料',
          registrationNo: '农肥（2019）准字14761号',
          forCrop: '小麦'
        },
        {
          id: 3,
          companyNM: '河南德华新陆作物保护有限公司',
          commonNM: '含腐植酸水溶肥料',
          registrationNo: '农肥（2019）准字14761号',
          forCrop: '小麦'
        },
        {
          id: 4,
          companyNM: '河南德华新陆作物保护有限公司',
          commonNM: '含腐植酸水溶肥料',
          registrationNo: '农肥（2019）准字14761号',
          forCrop: '小麦'
        },
        {
          id: 5,
          companyNM: '河南德华新陆作物保护有限公司',
          commonNM: '含腐植酸水溶肥料',
          registrationNo: '农肥（2019）准字14761号',
          forCrop: '小麦'
        }
      ],
      huafei: [],
      nongyao: [],
      nongyaoList: [
        {
          id: 1,
          commonNM: '杀虫剂雾剂',
          companyNM: '广东省陆丰裕达企业发展公司',
          registrationNo: 'WPN33-2000',
          expireDate: 1563174571000
        },
        {
          id: 2,
          commonNM: '杀虫剂雾剂',
          companyNM: '广东省陆丰裕达企业发展公司',
          registrationNo: 'WPN33-2000',
          expireDate: 1563174571000
        },
        {
          id: 3,
          commonNM: '杀虫剂雾剂',
          companyNM: '广东省陆丰裕达企业发展公司',
          registrationNo: 'WPN33-2000',
          expireDate: 1563174571000
        },
        {
          id: 4,
          commonNM: '杀虫剂雾剂',
          companyNM: '广东省陆丰裕达企业发展公司',
          registrationNo: 'WPN33-2000',
          expireDate: 1563174571000
        },
        {
          id: 5,
          commonNM: '杀虫剂雾剂',
          companyNM: '广东省陆丰裕达企业发展公司',
          registrationNo: 'WPN33-2000',
          expireDate: 1563174571000
        }
      ]
    }
  },
  methods: {
    search: function () {
      this.show_kind = -1
      if (this.type === 'huafei') {
        this.$axios({
          method: 'post',
          url: 'http://106.15.192.168/gadget/fertilizer/find',
          headers: { 'content-type': 'application/json',
            'token': this.$store.state.token
          },
          data: {
            keyword: this.keyWord
          }
        }).then((response) => {
          if (response.data.status === 0) {
            this.huafei = response.data.data
            this.huafeiList = []
            for (var i = 0; i < 10; i++) {
              this.huafeiList.push(this.huafei[i])
            }
            // console.log(response)
            // console.log(this.huafeiList)
            this.show_kind = 0
          } else {
            this.show_kind = 2
          }
        })
      } else {
        this.$axios({
          method: 'post',
          url: 'http://106.15.192.168/gadget/pesticide/find',
          headers: { 'content-type': 'application/json',
            'token': this.$store.state.token
          },
          data: {
            keyWord: this.keyWord
          }
        }).then((response) => {
          console.log(response)
          this.show_kind = 1
          // if (response.data.status === 0) {
          //   // this.nongyao = response.data.data
          //   // this.nongyaoList = []
          //   // for (var i = 0; i < 10; i++) {
          //   //   this.nongyaoList.push(this.nongyao[i])
          //   // }
          //   console.log(response)
          //   // console.log(this.nongyaoList)
          //   this.show_kind = 1
          // } else {
          //   this.show_kind = 2
          // }
        })
      }
    }
  }
}
</script>

<style scoped>
.main::-webkit-scrollbar{
  display: none;
}
</style>
