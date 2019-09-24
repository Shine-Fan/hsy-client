<template>
  <div class="comment">
    <div style="width:3rem;display: flex;justify-content: center">
      <img :src="img_src" style="width:2.5rem;height:2.5rem;border-radius:50%;">
    </div>
    <div style="width:100%;display:flex;flex-direction: column;justify-content: center;margin:0 15px">
      <div style="display:flex;justify-content: space-between">
        <div style="font-size:0.9rem;color:royalblue">{{user_name}}</div>
        <div><i class="fa fa-thumbs-o-up"></i><span style="margin-left:5px;font-size:0.9rem;">{{thumbs}}</span></div>
      </div>
      <div style="margin:5px 0">
        {{comment}}
      </div>
      <div style="font-size:0.8rem;">
        <span style="margin-right:0.8rem">{{time}}</span>
        <span style="color:royalblue" @click="response">回复</span>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'commentBar',
  props: {
    img_src: String,
    user_name: String,
    thumbs: Number,
    comment: String,
    time: String
  },
  methods: {
    response: function () {
      this.$emit('response')
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
