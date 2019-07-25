<template>
<div class="menu">
	<ul class="menu-ul">
		<router-link to="/PIM" class="menu-link" tag="li">个人信息管理</router-link>
		<router-link to="/VIPM" class="menu-link" tag="li">VIP管理</router-link>
		<router-link to="/Message" class="menu-link" tag="li">消息</router-link>
        <router-link to="/UserFootprint" class="menu-link" tag="li">个人足迹</router-link>
	</ul>
    <!-- <router-view/> -->
</div>
</template>

<script>
// import PIM from './PIM.vue'
// import VIPM from './VIPM.vue'
// import Message from './Message.vue'
// import UserFootprint from './UserFootprint.vue'

export default {
  name: 'UserMenu'
}
</script>

<style scoped>
.menu{background: #fff; width: 300px; height: 740px; margin-top: 15px; text-align: left; color: #737373}
.menu-ul{padding: 0; margin: 0;}
.router-link-active{font-weight: bold; color: #353535; background: #DCF9F5;}
.menu-link{list-style-type: none; height: 60px; cursor: pointer; line-height: 60px; padding: 0 0 0 25px; transition: all .4s;}
</style>