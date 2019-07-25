<template>
<div class="UserFootprint">
<el-menu
  :default-active="activeIndex2"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">
  <el-menu-item index="1"><router-link to="/Comment" class="foot-link">评论 </router-link></el-menu-item>
  <el-menu-item index="2"><router-link to="/Collection" class="foot-link">收藏 </router-link></el-menu-item>
  <el-menu-item index="3"><router-link to="/Like" class="foot-link">点赞 </router-link></el-menu-item>
  <el-menu-item index="4"><router-link to="/Follow" class="foot-link">关注 </router-link></el-menu-item>
  <el-menu-item index="5"><router-link to="/Fans" class="foot-link">粉丝 </router-link></el-menu-item>
  <el-menu-item index="6"><router-link to="/Article" class="foot-link">帖子 </router-link></el-menu-item>
</el-menu>
<router-view></router-view>
</div>
</template>

<script>
  
</script>
<style scoped>
a {
  text-decoration: none;
}
 
.router-link-active {
  text-decoration: none;
}
</style>