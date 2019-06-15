<template>
  <div class="home">
    <img alt="Vue logo" v-bind:src = "headNews" >
<!--    <img alt="Vue logo" src = "@/assets/logo.png" >-->
    <TopNews msg="Welcome to Your Vue.js App"/>
    <router-link to="/home/news" class="nav-link">详细的某一篇链接<span class="sr-only">(current)</span></router-link>
    <h2>头条新闻</h2>
    <div class="swiper_container">
      <ul>
<!--        <TopNews title="" img="" content="">-->
        <li><a href="#" target="_blank" rel="noopener">babel</a></li>
        <li><a href="#" target="_blank" rel="noopener">eslint</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Vue from "vue";
import axios from "axios";
import TopNews from "../components/TopNews";

Vue.use(axios);

export default {
  name: 'home',
  components: {
    TopNews,
  },
  // computed:{
  //   headNews:function(){
  //       return "@/assets/logo.png"
  //     }
  // },
  data(){
    return {
      headNews:require('@/assets/logo.png')
    }
  }
  // props:{
  //   headNews:Object
  // }
}
</script>
