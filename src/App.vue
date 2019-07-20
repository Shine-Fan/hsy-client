<template>
  <div>
<!--    <div class="wrap">-->
<!--      <router-view v-if="isRouterAlive"></router-view>-->
<!--    </div>-->
    <nav id="header" class="navbar navbar-expand-sm navbar-light bg-light">
      <span class="h2">HSY</span>
      <div class="collapse navbar-collapse" id="header-content" style="margin-left:2rem">
        <ul class="navbar-nav">
          <li class="nav-item ">
            <router-link :to="{name:'main'}" style="font-size:large;padding-right:1rem">首页</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{name:'community'}" style="font-size:large;padding-right:1rem">社群</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{name:'news'}" style="font-size:large;padding-right:1rem">新闻</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{name:'info'}" style="font-size:large;padding-right:1rem">行情</router-link>
          </li>
        </ul>
      </div>
      <form class="form-inline">
        <input class="form-control col-5" style="margin-right:0.5rem" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-primary" type="submit" >搜索</button>
      </form>
      <div id="login-area">
        <ul class="navbar-nav">
          <li class="nav-item" style="color:#007bff">
            <a href="#" @click="signin()">登录</a>
            /
            <a href="#" @click="signup()">注册</a>
          </li>
        </ul>
      </div>
    </nav>
    <div v-if="sign_status">
      <sign></sign>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import sign from './components/Sign2.vue'
  export default{
    name:'app',
    // provide(){
    //   return{
    //     reload:this.reload
    //   }
    // },
    components:{
      sign,
    },
    data:function(){
      return{
        sign_flag : 0,//0:登录，1:注册
        sign_status: false,
        // isRouterAlive:true
      }
    },
    methods:{
      // reload(){
      //   this.isRouterAlive=false;
      //   this.$nextTick(function () {
      //     this.isRouterAlive=true;
      //   })
      // },
      signin(){
        this.sign_flag = 0;
        this.sign_status = true;
      },
      signup(){
        this.sign_flag = 1;
        this.sign_status = true;
      }
    }
  }
</script>

<style>
</style>
