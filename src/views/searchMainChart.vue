<template>
  <div>
    <div class="choose1-wrapper" style="display:flex;justify-content: space-around">
      <div class="choose1" :class="{'choose1-active':choose1_active}" @click="showLineChart">对比折现图</div>
      <div class="choose1" :class="{'choose1-active':!choose1_active}" @click="showPieChart">对比饼状图</div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
// 解决Uncaught (in promise) NavigationDuplicated问题，还可以通过安装vue-router@3.1.1解决
// import router from 'vue-router'

export default {
  name: 'SearchMainChart',
  data: function () {
    return {
      choose1_active: true,
      to_name: null,
      from_name: null
    }
  },
  watch: {
    $route (to, from) {
      this.to_name = to.name
      this.from_name = from.name
      // console.log(to.name)
      // console.log(from.name)
    }
  },
  methods: {
    showLineChart: function () {
      console.log('0')
      this.choose1_active = true
      if (this.to_name === 'searchPieChart') {
        console.log(this.to_name)
        this.$router.go(-1)
      }
      // this.$router.push('/search_main_chart/search_multi_line_chart')
    },
    showPieChart: function () {
      console.log('1')
      this.choose1_active = false
      if (this.to_name === 'searchMultiLineChart') {
        this.$router.push('/search_main_chart/search_pie_chart')
      }
      // this.$router.push('/search_main_chart/search_pie_chart')
    }
  },
  mounted () {
    this.$router.push('/search_main_chart/search_multi_line_chart')
  }
}
</script>

<style scoped>
.choose1-wrapper{
  border-bottom:1px solid gray;
}
.choose1{
  padding:5px 0;
}
.choose1-active{
  border-bottom:2px solid #28a745;
}
</style>
