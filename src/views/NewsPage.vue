<template>
  <div class="home">
    <img alt="Vue logo" v-bind:src = "headNews" >

<!--    <img alt="Vue logo" src = "@/assets/logo.png" >-->
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Vue from "vue";
import axios from "axios";

Vue.use(axios);

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  // computed:{
  //   headNews:function(){
  //       return "@/assets/logo.png"
  //     }
  // },
  data(){
    return {
      headNews:"@/assets/logo.png"
    }
  }
  // props:{
  //   headNews:Object
  // }
}
</script>
