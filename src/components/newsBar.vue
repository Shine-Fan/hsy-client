<template>
  <router-link to="/news_detail">
    <div class="community-bar row" style="margin:0 0 0.25rem 0;padding: 0.5rem 0;border-bottom: 1px solid #ddd;color:black">
      <div class="col-3" style="display:flex;justify-content:flex-start;align-items:center;padding:0;">
        <img :src="imgSrc" style="width:4.5rem;height:3.5rem">
      </div>
      <div class="col-9" style="display:flex;flex-direction:column;justify-content:space-around;padding-left:0.75rem;">
        <div style="font-size:1rem;overflow: hidden;white-space: nowrap;text-overflow:ellipsis;">{{newsName}}</div>
        <div style="width:100%;font-size:0.8rem;color:#888">阅读量 {{readerNum}}<span style="position:absolute;right:0;font-size:0.8rem;color:#888">{{newsDate}}</span></div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'newsBar.vue',
  props: {
    imgSrc: String,
    newsName: String,
    newsDate: String,
    readerNum: Number
  }
}
</script>

<style scoped>

</style>
