<template>
  <div class="nongyao_item">
    <div style="width:100%;display: flex;">
      <div class="title">农药名称</div>
      <div class="content">{{item.commonNM}}</div>
    </div>
    <div style="width:100%;display:flex;">
      <div class="title">公司名称</div>
      <div class="content">{{item.companyNM}}</div>
    </div>
    <div style="width:100%;display:flex">
      <div class="title">登记证号</div>
      <div class="content">{{item.registrationNo}}</div>
    </div>
    <div style="width:100%;display:flex">
      <div class="title">有效期至</div>
      <div class="content">{{item.expireDate|formatDate}}</div>
    </div>
    <div style="width:85%;display: flex;justify-content: flex-end;margin:5px 0 0;">
      <button>详情</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'nongyaoBar',
  props: {
    item: Object
  },
  filters: {
    formatDate: function () {
      var value = 1563174571000
      var date = new Date(value)
      var y = date.getFullYear()
      var MM = date.getMonth() + 1
      MM = MM < 10 ? ('0' + MM) : MM
      var d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      // var h = date.getHours()
      // h = h < 10 ? ('0' + h) : h
      // var m = date.getMinutes()
      // m = m < 10 ? ('0' + m) : m
      // var s = date.getSeconds()
      // s = s < 10 ? ('0' + s) : s
      return y + '-' + MM + '-' + d
    }
  }
}
</script>

<style scoped>
  .nongyao_item{
    width:100%;
    display:flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    background-color: lightgoldenrodyellow;
    padding:8px 0;
    box-shadow: 0 3px 5px lightgrey;
    margin-bottom:15px;
  }
  .title{
    width:25%;
    padding-left: 5px;
    font-weight:bold;
  }
  .content{
    width:70%;
    color:dimgrey;
  }

</style>
