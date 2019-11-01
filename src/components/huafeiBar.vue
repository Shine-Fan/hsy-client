<template>
  <div class="huafei_item">
    <div style="width:100%;display: flex;">
      <div class="title">化肥名称</div>
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
      <div class="title">适宜作物</div>
      <div class="content">{{item.forCrop}}</div>
    </div>
    <div style="width:85%;display: flex;justify-content: flex-end;margin:5px 0 0;">
      <button>详情</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hafeiBar',
  props: {
    item: Object
  }
}
</script>

<style scoped>
  .huafei_item{
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
