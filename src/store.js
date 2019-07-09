import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    userName:"zhangsan"
      },
  mutations:{
    transmit(){
      this.state.userName
    }

  },
  actions:{

  }
})


