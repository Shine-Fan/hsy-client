<template>
<div class="UserFootprint">
    <div class="title4">个人足迹 </div>
    <div class="foot-link">
    <router-link to="/Comment" class="foot-link">个人评论 </router-link>
    <router-link to="/Collection" class="foot-link">个人收藏 </router-link>
    <router-link to="/Like" class="foot-link">个人点赞 </router-link>
    <router-link to="/Follow" class="foot-link">个人关注 </router-link>
    <router-link to="/Fans" class="foot-link">个人粉丝 </router-link>
    <router-link to="/Article" class="foot-link">个人帖子 </router-link>
    </div>
    <router-view></router-view>
</div>
</template>
<script>
export default {
   name:'UserFootprint',
}
</script>
<style scoped>
.title4{
    font-size: 20px
}
.foot-link
.router-link-active{font-weight: bold; color: #353535; background: #DCF9F5;}
</style>
