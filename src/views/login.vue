<template>
  <div style="position:absolute;top:0;width:100%;height:100%;display: flex;flex-direction: column;align-items: center;">
    <div class="cancel-btn" style="width:90%;height:15%;display: flex;align-items: center;">
     <div style="width:2.2rem;height:2.2rem;border:1px solid gray;border-radius: 50%;display: flex;align-items: center;justify-content: center" @click="toMainPage">
       <i class="fa fa-close" style="font-size: 1.8rem;font-weight:lighter;color:gray"></i>
     </div>
    </div>
    <div class="form" style="width:90%;height:70%;display: flex;flex-direction:column;align-items: center;justify-content: center">
      <div style="width:100%;text-align: center;margin:1rem 0">
        <input style="width:90%;height:2.5rem;outline: none;border:none;border-bottom: 1px solid gray;" placeholder="请输入手机号">
      </div>
      <div style="display:flex;align-items:center;width:90%;margin:1rem 0">
        <input style="width:60%;height:2.5rem;outline: none;border:none;border-bottom: 1px solid gray;margin-right:1rem;" placeholder="请输入验证码">
        <div style="width:40%;text-align:center;padding:0.2rem 0;border:1px solid limegreen;border-radius: 0.2rem">获取验证码</div>
      </div>
      <div style="width:50%;height:2rem;line-height: 2rem;text-align: center;background-color:#33d033;color:white;letter-spacing:0.2rem;border-radius: 0.2rem;margin-top:3rem" @click="login">登录</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  methods: {
    toMainPage: function () {
      this.$router.push({ path: '/' })
    },
    login: function () {
      console.log('login..')
      this.$axios({
        method: 'post',
        url: 'http://106.15.192.168/login',
        header: { 'content-type': 'application/json' }, // ;jwt-token:
        data: {
          username: 'zhangsan',
          password: '123456'
        }
      }).then((response) => {
        console.log(response)
      })
    }
  }
}
</script>

<style scoped>

</style>
