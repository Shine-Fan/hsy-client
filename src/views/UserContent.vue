<template>
<div class="content" style="backgroundColor:Bisque ">
	<keep-alive>
      <router-view></router-view>
    </keep-alive>
</div>
</template>

<script>
export default {
  name: 'UserContent'
}
</script>

<style scoped>
.content{position:relative;right:0px;bottom:935px;background-color: #fff;/* vertical-align: top; */ display: inline-block; width: 1090px; height: 935px; margin-left: 20px; overflow-y: auto;overflow: hidden;}
.content-main{margin: 20px; text-align: left;}
</style>
