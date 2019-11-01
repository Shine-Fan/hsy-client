<template>
  <div class="community-bar row" @click="clickItem(newsId)">
    <div class="col-3" style="display:flex;justify-content:flex-start;align-items:center;padding:0;">
      <img :src="imgSrc" style="width:4.5rem;height:3.5rem">
    </div>
    <div class="col-9" style="display:flex;flex-direction:column;justify-content:space-around;padding-left:0.75rem;">
      <div style="font-size:1rem;overflow: hidden;white-space: nowrap;text-overflow:ellipsis;">{{newsName}}</div>
      <div style="width:100%;font-size:0.8rem;color:#888">作者 {{newsAuthor}}<span style="position:absolute;right:0;font-size:0.8rem;color:#888">{{newsDate | formatDate}}</span></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'newsBar.vue',
  props: {
    imgSrc: String,
    newsName: String,
    newsDate: Number,
    newsAuthor: String,
    newsId: Number
  },
  methods: {
    clickItem: function (id) {
      console.log(id)
      this.$emit('toCertainNews', id)
    }
  },
  filters: {
    formatDate: function () {
      var value = 1563174571000
      var date = new Date(value)
      var y = date.getFullYear()
      var MM = date.getMonth() + 1
      MM = MM < 10 ? ('0' + MM) : MM
      var d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      // var h = date.getHours()
      // h = h < 10 ? ('0' + h) : h
      // var m = date.getMinutes()
      // m = m < 10 ? ('0' + m) : m
      // var s = date.getSeconds()
      // s = s < 10 ? ('0' + s) : s
      return y + '-' + MM + '-' + d
    }
  }
}
</script>

<style scoped>
.community-bar{
  margin:0 0 0.25rem 0;
  padding: 0.5rem 0;
  border-bottom: 1px solid #ddd;
}

</style>
