<template>
  <div class="home">
    <img alt="Vue logo" v-bind:src = "headNews" >
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Vue from "vue";

new Vue({
  // el:'.home',
  data:{
    headNews:"../assets/logo.png"
  }
});

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  computed:{
    headNews:function(){
        return "@/assets/logo.png"
      }
  },
  // props:{
  //   headNews:Object
  // }
}
</script>
