<template>
  <div>
    <nav id="header" class="navbar navbar-expand-sm navbar-light bg-light" style="width:100%">
      <span class="h2" style="display:flex;justify-content:center;width:7%">HSY</span>
      <div id="header-content" style="margin-left:60px;width:53%">
        <ul class="navbar-nav" style="align-items: center;">
          <li class="nav-item ">
            <router-link :to="{name:'main'}" style="font-size:large;padding-right:16px">首页</router-link>
          </li>
          <li class="nav-item">
            <b-dropdown id="dropdown-community" text="社群" variant="link" style="">
              <b-dropdown-item ><b-link :to="{name:'offiCommunity'}">官方交流社群</b-link></b-dropdown-item>
              <b-dropdown-item><b-link :to="{name:'hotCommunity'}">专家网红社群</b-link></b-dropdown-item>
              <b-dropdown-item>平台交流社群</b-dropdown-item>
            </b-dropdown>
            <!--            <router-link :to="{name:'community'}" style="font-size:large;padding-right:1rem">社群</router-link>-->
          </li>
          <li class="nav-item">
            <router-link :to="{name:'news'}" style="font-size:large;padding-right:1rem">新闻</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{name:'info'}" style="font-size:large;padding-right:1rem">行情</router-link>
          </li>
        </ul>
      </div>
      <form class="form-inline" style="width:28%">
        <input class="form-control col-5" style="margin-right:0.5rem" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-primary" type="submit" >搜索</button>
      </form>
      <div style="">
        <div v-if="!this.$store.state.sign_status" id="login-area" >
          <ul class="navbar-nav">
            <li class="nav-item" style="color:#007bff">
              <a href="#" @click="signin()">登录</a>
              /
              <a href="#" @click="signup()">注册</a>
            </li>
          </ul>
        </div>
        <div v-else>
          <b-dropdown id="dropdown-divider" :text="this.$store.state.user_name+'，您好'" class="m-2" style="z-index:3;outline: none">
            <b-dropdown-item-button>个人中心</b-dropdown-item-button>
            <b-dropdown-item-button>消息中心</b-dropdown-item-button>
            <b-dropdown-item-button>VIP管理</b-dropdown-item-button>
            <b-dropdown-item-button>个人足迹</b-dropdown-item-button>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item-button @click="logout">退出登录</b-dropdown-item-button>
          </b-dropdown>
        </div>
      </div>

    </nav>
    <div v-if="show_sign">
      <sign></sign>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import sign from './components/Sign.vue'
  export default{
    components:{
      sign,
    },
    data:function(){
      return{
        sign_flag : 0,//0:登录，1:注册
        show_sign: false,
      }
    },
    methods:{
      signin(){
        this.sign_flag = 0;
        this.show_sign = true;
      },
      signup(){
        this.sign_flag = 1;
        this.show_sign = true;
      },
      logout:function(){   //退出登录，注销store中的用户信息
        this.$store.state.sign_status = false ;
        this.$store.state.user_name = null;
        this.$store.state.token = null;
        console.log("退出登录成功")
      }
    }
  }
</script>

<style lang="scss">
  #dropdown-divider__BV_toggle_{
    font-weight:bold;
    background-color: #b0d9ef;
    border:none;
    border-radius:5px;
  }
  #dropdown-divider__BV_toggle_.btn-secondary:focus, .btn-secondary.focus{
    box-shadow: none;
  }
  #dropdown-community{
    .btn-link{
      font-size:18px;
      color: #007bff;
      background-color: #f8f9fa;
      border-color: #f8f9fa;
      padding:0 16px 0 0 ;
      border:none;
    }

  }
</style>
