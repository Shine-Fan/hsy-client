import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import 'font-awesome/css/font-awesome.min.css'
import store from './store'


Vue.prototype.$ajax = axios;

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(ElementUI)

router.afterEach(() => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');


//106.15.192.168
