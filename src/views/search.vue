<template>
  <div>
    <div class="search-bar" style="width:100%;height:3rem;display: flex;align-items: center;">
      <div style="width:85%;height:3rem;display:flex;align-items: center;justify-content: center">
        <div style="width:90%;height:2rem;background-color: #efefef;display:flex;align-items: center;padding:0 0.5rem;border-radius:1rem;">
          <span style="width:2rem;height:2rem;line-height: 2rem;text-align: center;font-size:1.1rem;color:gray"><i class="fa fa-search"></i></span>
          <input style="width:100%;border:none;background-color: #efefef;outline: none;margin:0 2px;" placeholder="社群、新闻">
          <span style="width:2rem;height:2rem;line-height: 2rem;text-align: center;"><i class="fa fa-times-circle" style="font-size:1.1rem;color:gray"></i></span>
        </div>
      </div>
      <div style="width:12%;height:3rem;line-height: 3rem;" @click="toMainPage">取消</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'search',
  methods: {
    toMainPage: function () {
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style scoped>
input::-webkit-input-placeholder{
  color:darkgray;
}
</style>
