<template>
  <div class="comment">
    <div style="width:3rem;display: flex;justify-content: center">
      <!--通过||设置默认值-->
      <img :src="(comment.img || require('../assets/user.jpg'))" style="width:2.5rem;height:2.5rem;border-radius:50%;">
    </div>
    <div style="width:100%;display:flex;flex-direction: column;justify-content: center;margin:0 15px">
      <div style="display:flex;justify-content: space-between">
        <div style="font-size:0.9rem;color:royalblue">{{comment.authorName}}</div>
        <div><i class="fa fa-thumbs-o-up"></i><span style="margin-left:5px;font-size:0.9rem;">{{comment.thumbs}}</span></div>
      </div>
      <div style="margin:5px 0">
        <span v-if="comment.pid !== 0" style="color:gray;font-size:0.9rem">回复 {{comment.replayUserName}}</span>
        {{comment.content}}
      </div>
      <div style="font-size:0.8rem;">
        <span style="margin-right:0.8rem">{{comment.createTime|formatDate}}</span>
        <span v-if="comment.pid === 0" style="color:royalblue" @click="response">回复</span>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'commentBar',
  props: {
    comment: Object
  },
  methods: {
    response: function () {
      this.$emit('response')
    }
  },
  filters: {
    formatDate: function (value) {
      var date = new Date(value)
      var y = date.getFullYear()
      var MM = date.getMonth() + 1
      MM = MM < 10 ? ('0' + MM) : MM
      var d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      return y + '-' + MM + '-' + d
    }
  }
}
</script>

<style scoped>
  .comment{
    margin-top:10px;
    display: flex;
  }
</style>
