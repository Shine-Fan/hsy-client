import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sign_status:false,  //登录状态（未登录：false，登录：）
    user_name:null,  //用户姓名
    token:null,
    menu:null,
    level:0

  },
  mutations: {
<<<<<<< HEAD
    add(state){
      state.level=state.level+1;
      console.log(state.level);
    },
=======
>>>>>>> 5913a70ecdf1fb964ef7ecfaeefa768e4f0c41e6
  },
  actions: {

  }
})
