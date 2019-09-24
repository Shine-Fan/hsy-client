<!---组件递归---->
<template>
  <div class="choose-bar">
    <ul class="layer">
      <li v-for="(item,index) in list"
          :key="index"
          class="layer-item"
          :class="{'active':isActive == index}"
          @click = "changeStatus(index)"
      >{{item.class}}</li>
    </ul>
    <newsMenu v-if="isActive !== -1 && list[isActive].children" :list="list[isActive].children" :isActiveval="-1"></newsMenu>
  </div>
</template>

<script>
export default {
  name: 'newsMenu',
  props: {
    list: Array,
    isActiveval: Number
  },
  data: function () {
    return {
      isActive: this.isActiveval
    }
  },
  watch: { // 使每次点击了父级菜单选项后,子菜单栏变为默认选项（即无选择）
    list: function () {
      this.isActive = -1
    }
  },
  methods: {
    changeStatus: function (index) {
      if (this.isActive === index) {
        this.isActive = -1
      } else {
        this.isActive = -1
        this.isActive = index
      }
    }
  }
}
</script>

<style scoped>
  .layer{
    font-size:1.1rem;
    white-space: nowrap;   /*只在一行显示*/
    overflow-x: auto;      /*超出范围,则使用滚动条*/
    display: flex;
    align-items: center;
    padding:0;
    margin:0 0.5rem;
    list-style:none;
    border-bottom:1px solid #bfbfbf;
  }
  .layer::-webkit-scrollbar{  /*去掉滚动条效果*/
    display:none;
  }
  .layer-item{
    line-height: 2.8rem;
    height:2.8rem;
    margin:0 0.5rem;
  }
  .active{
    color:royalblue;
  }

</style>
