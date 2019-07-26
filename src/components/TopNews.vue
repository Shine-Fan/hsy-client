<template>
  <div>
    <div>
      {{this.msg}}
    </div>
    <input v-model="message">
    <button @click="add()">添加</button>
  </div>
</template>

<script>
  // import test from './TopNews.vue'
  // import Vue from 'vue'
export default {
  name: 'test',
  props: {
    msg: String
  },
  // install:function(Vue){
  //   Vue.component('test',test);
  // },
  data:function(){
    return{
      message:null,
    }
  },
  methods:{
    add:function(){
      this.$emit('addnew',this.message);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
