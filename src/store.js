import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: sessionStorage.getItem('token'), // 初始化
    id: sessionStorage.getItem('id'),
    user: {
      name: sessionStorage.getItem('username'), // 初始化
      id: sessionStorage.getItem('userId'),
      isVip: sessionStorage.getItem('isVip')
    }
  },
  getters: {
    loginStatus (state) {
      return (state.token !== null)
    }
  },
  mutations: {
    update_token (state, token) {
      state.token = token
    },
    update_id (state, id) {
      state.id = id
    },
    update_user_name (state, username) {
      state.user.name = username
    },
    update_user_id (state, userid) {
      state.user.id = userid
    },
    update_user_isVip (state, isVip) {
      state.user.isVip = isVip
    }
  },
  actions: {
  }
})
