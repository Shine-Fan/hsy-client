<template>
  <div class="container">
      {{info}}
  </div>
</template>

<script>
// @ is an alias to /src
import Vue from "vue";
import axios from "axios";
Vue.use(axios);
export default {
  name: 'home',
  data() {
      return {
          info: null
      }
  },
  mounted() {
      this.$ajax
          .get('https://api.coindesk.com/v1/bpi/currentprice.json')
          .then(response => (this.info = response))
  }
}
</script>

<style>
</style>
