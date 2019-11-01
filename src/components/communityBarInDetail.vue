<template>
    <div>
      <div style="width:95%;margin:15px auto 0">
        <div class="title" style="display:flex;width:100%;height:3rem;margin-bottom:10px">
          <div style="width:3rem;height:2.8rem;text-align: center;">
            <img :src="item.usr_img" style="width:2.8rem;height:2.8rem;border-radius: 50%;">
          </div>
          <div style="margin:0 10px;">
            <div style="font-weight: bold;letter-spacing: 1px;font-size:0.95rem">{{item.usr_name}}</div>
            <div style="font-size:0.8rem;color:gray;">{{item.time}}</div>
          </div>
        </div>
        <div class="main-content" style="display:flex;width:100%;height:5.5rem;color:black;margin-bottom:10px" @click="toCertainArticle(item.id)">
          <div style="width:65%;height:4.7rem;padding:0 6px;letter-spacing:1px;font-weight: bold;overflow: hidden">{{item.news_title}}</div>
          <div style="width:35%;height:5.5rem;">
            <img style="height:5.5rem;width:100%;" :src="item.news_img">
          </div>
        </div>
        <div class="foot-bar" style="display:flex;align-items: center;justify-content: space-around;padding:8px 0;border-top:1px solid #efefef;">
          <div><i class="fa fa-thumbs-o-up"></i>点赞</div>
          <div @click="toCommentArea"><i class="fa fa-comment-o"></i>评论</div>
          <div><i class="fa fa-share-square-o"></i>分享</div>
        </div>
      </div>
      <div style="width:100%;height:6px;background-color:#efefef"></div>
    </div>
</template>

<script>
export default {
  name: 'communityBarInDetail',
  props: {
    item: Object
  },
  methods: {
    toCommentArea: function () {
      this.$router.push({ path: '/news_detail?location=comment-area' })
    },
    toCertainArticle: function(id){
        this.$emit('toCertainArticle',id)
    }
  }
}
</script>

<style scoped>

</style>
