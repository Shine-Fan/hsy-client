<template>
  <div class="main" style="width:100%;height:100%;display: flex;flex-direction: column;align-items: center;position:absolute;top:0;">
    <div style="position:relative;height:100%;top:0;width:90%;margin-bottom:2.6rem">
      <div class="main-area" style="position:absolute;height:100%;width:100%;overflow:scroll;top:0">
        <div class="title">
          <h4>{{article.title}}</h4>
        </div>
        <div class="from" style="width:95%;display: flex;align-items: center;margin:auto">
          <div style="margin-right:auto;font-size:0.9rem;color:gray">作者 {{article.authorName}}</div>
          <div style="font-size: 0.9rem;color:gray;margin-left:auto">发表时间 {{article.createTime|formatDate}}</div>
          <!--注释了作者导航条-->
          <!--          <router-link to="/community_detail" style="width:100%">-->
          <!--            <div style="width:100%;display: flex;">-->
          <!--              <div style="width:3rem;height:3.5rem;display: flex;align-items: center;justify-content: center">-->
          <!--                <img :src="news.imgSrc" style="width:2.5rem;height:2.5rem;border-radius:50%;">-->
          <!--              </div>-->
          <!--              <div style="width:100%;height:3.5rem;display:flex;flex-direction: column;justify-content: center;margin:0 10px">-->
          <!--                <div style="font-weight: bold;color:black">{{news.author}}</div>-->
          <!--                <div style="font-size:0.8rem;color:gray;">{{news.createTime|formatDate}}</div>-->
          <!--              </div>-->
          <!--            </div>-->
          <!--          </router-link>-->
          <!--          <div style="width:3.5rem;height:3.5rem;display: flex;align-items: center;justify-content: center">-->
          <!--            <div style="width:3.5rem;height:1.8rem;line-height:1.8rem;background-color: red;color:white;text-align: center;border-radius:0.2rem">+关注</div>-->
          <!--          </div>-->
        </div>
        <div class="content" v-html="article.content">
          {{article.content}}
        </div>
        <div style="font-size:0.8rem;color:gray;margin:8px 0;">1000阅读</div>
        <div class="comment-area">
          <div style="width:100%;padding:3px 0;"><span style="padding-left:3px;border-left:3px solid blue">评论区</span></div>
          <div v-for="index in commentList.length" :key="index">
            <comment-bar :comment="commentList[index-1].comment"
                         @response = 'response(index-1)'
            ></comment-bar>
            <div v-if="commentList[index-1].childs" style="width:90%;margin-left:auto">
              <comment-bar v-for="(item1,index1) in commentList[index-1].childs"
                           :key="index1"
                           :comment = "item1.comment"
              ></comment-bar>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="comment_bar" v-if="!isComment" style="position:fixed;bottom:0;width:100%;height:2.4rem;background-color:white;display: flex;align-items: center;;border-top:1px solid lightgray">
      <div style="width:30%;height:1.5rem;margin:0 5%;background-color:#eeeeee;display: flex;align-items: center;justify-content: center;border-radius:1rem;" @click="comment">
        <i class="fa fa-pencil-square-o" style="margin:0 6px 0 0;"></i>
        <span>写评论...</span>
      </div>
      <div style="width:60%;display: flex;justify-content: center;align-items: center;margin-right:auto">
        <div style="width:25%;display: flex;justify-content: center;font-size:1.3rem;">
          <i class="fa fa-comment-o"></i>
        </div>
        <div style="width:25%;display: flex;justify-content: center;font-size:1.4rem;">
          <i class="fa fa-star-o"></i>
        </div>
        <div style="width:25%;display: flex;justify-content: center;font-size:1.3rem;">
          <i class="fa fa-thumbs-o-up"></i>
        </div>
        <div style="width:25%;display: flex;justify-content: center;font-size:1.3rem;">
          <i class="fa fa-share-square-o"></i>
        </div>
      </div>
    </div>
    <div class="write_comment" v-if="isComment" style="position:fixed;bottom:0;width:100%;height:6rem;background-color: white;border-top:1px solid lightgray">
      <div style="width:95%;text-align: right;;margin:auto;"><span style="font-weight: bold;padding:0 0.5rem" @click="exit_comment">X</span></div>
      <div style="width:100%;height:5rem;display: flex;align-items: center;margin-top:-0.3rem">
        <div style="width:85%;display: flex;justify-content:center;">
          <textarea id="write" style="width:90%;height:3.5rem;background-color:#eeeeee;resize:none" v-model="comments" @input="writing"></textarea>
        </div>
        <div class="send-btn" :class="{writing:isWriting === true}" style="width:15%;height:4rem;line-height: 4rem;font-size:1.1rem;color:gray;font-weight:bold;" @click="send_comment">发布</div>
      </div>
    </div>
  </div>
</template>

<script>
// v-model:数据双向绑定,主要用于表单元素,其中之一变化,另一个随之改变;v-bind:数据动态绑定,监听数据变化
import commentBar from '../components/commentBar'
export default {
  name: 'communityArticle',
  components: {
    commentBar
  },
  data: function () {
    return {
      article: {
        id: 1,
        title: '灾害损失减少30%、整精米率提高8%——水稻新品种“中科发5号”选育成功',
        content: '<p style="text-indent: 2rem; margin:8px 0;">9月11日，国审稻新品种“中科发5号”及中科发系列新品种现场会在吉林省吉林市举行。在2000亩示范片中，“中科发5号”等新品种在产量、抗稻瘟病、抗倒伏等农艺性状中表现突出，外观品质优、食味佳，丰收在即。</p>\n' +
                        '          <img src="/img/corn.213685da.jpg" style="width:70%;height:auto;margin:8px 0;">\n' +
                        '          <p style="text-indent: 2rem; margin:8px 0;">中科发系列粳稻新品种，是中国科学院遗传与发育生物学研究所李家洋院士与合作者联合，针对东北地区最主要的优质米品种“稻花香”在生产中所遇到的问题，以优异稻米品质基因、抗倒伏和抗稻瘟病等基因为主线，结合高产及理想株型基因等，运用分子模块设计育种的理念和技术，经过精心设计，选育而成的具有优质、高产、抗稻瘟病和抗倒的中科发系列粳稻新品种。“中科804”于2017年通过国家审定（国审稻20170080），“中科发5号”（国审稻20180077）和中科发6号(国审稻20180071）于2018年通过国家审定。其中,“中科804”在黑龙江五常市稻花香主产区3000亩示范片中脱颖而出，示范推广工作当选中国科学院2018年第3季度和全年的科技创新亮点成果及科技成果转移转化亮点成果，并入选2018年中国十大科技进展新闻。2019年“中科804”推广应用面积已达20万亩以上。</p>\n' +
                        '          <p style="text-indent: 2rem; margin:8px 0;">目前，“中科发5号”等品种的大面积示范推广工作正在进行。2019年“中科发5号”共示范20000多亩，在黑龙江、吉林、辽宁、宁夏、内蒙共布置了40多个百亩以上示范片，其中在吉林省吉林市布置了2000亩连片示范片，目前所有示范片及生产上均长势优良，同稻花香相比，“中科发5号”和“中科804”预计增产100kg/亩以上，抗稻瘟病和抗倒伏等抗逆性强可减少灾害损失30%，品质优良，口感更佳，尤其是整精米率，比稻花香提高8%以上。随着这些品种的大面积推广种植，其优良性状所带来的经济和社会效益将日趋凸显。</p>\n',
        authorId: 0,
        authorName: '水稻专家',
        createTime: 1563174571000,
        imgSrc: require('../assets/corn.jpg')
      },
      isComment: false,
      comments: '',
      isWriting: false,
      commentList: [
        {
          comment: {
            id: 1,
            postId: 1,
            img: require('../assets/user.jpg'),
            authorName: '用户1993743',
            authorId: 1993743,
            content: '灾害损失减少30%，整精米率提高8%，祝贺成功！！！',
            thumbs: 99,
            pid: 0,
            riplayUserName: '',
            createTime: 1564047811000
          },
          childs: []
        },
        {
          comment: {
            id: 1,
            postId: 1,
            img: require('../assets/user.jpg'),
            authorName: '用户1993743',
            authorId: 1993743,
            content: '灾害损失减少30%，整精米率提高8%，祝贺成功！！！',
            thumbs: 99,
            pid: 0,
            riplayUserName: '',
            createTime: 1564047811000
          },
          childs: [
            {
              comment: {
                id: 11,
                postId: 1,
                img: require('../assets/user.jpg'),
                authorName: '用户1997326',
                authorId: 1997326,
                content: '灾害损失减少30%，整精米率提高8%，祝贺成功！！！',
                thumbs: 99,
                pid: 1,
                replayUserName: '用户1993743',
                createTime: 1564047812000
              },
              childs: []
            },
            {
              comment: {
                id: 12,
                postId: 1,
                img: require('../assets/user.jpg'),
                authorName: '用户1999836',
                authorId: 1999836,
                content: '灾害损失减少30%，整精米率提高8%，祝贺成功！！！',
                thumbs: 99,
                pid: 1,
                replayUserName: '用户1993743',
                createTime: 1564048812000
              },
              childs: []
            }
          ]
        },
        {
          comment: {
            id: 1,
            postId: 1,
            img: require('../assets/user.jpg'),
            authorName: '用户1993743',
            authorId: 1993743,
            content: '灾害损失减少30%，整精米率提高8%，祝贺成功！！！',
            thumbs: 99,
            pid: 0,
            riplayUserName: '',
            createTime: 1564047811000
          },
          childs: [
            {
              comment: {
                id: 11,
                postId: 1,
                img: require('../assets/user.jpg'),
                authorName: '用户1997326',
                authorId: 1997326,
                content: '灾害损失减少30%，整精米率提高8%，祝贺成功！！！',
                thumbs: 99,
                pid: 1,
                replayUserName: '用户1993743',
                createTime: 1564047812000
              },
              childs: []
            },
            {
              comment: {
                id: 12,
                postId: 1,
                img: require('../assets/user.jpg'),
                authorName: '用户1999836',
                authorId: 1999836,
                content: '灾害损失减少30%，整精米率提高8%，祝贺成功！！！',
                thumbs: 99,
                pid: 1,
                replayUserName: '用户1993743',
                createTime: 1564048812000
              },
              childs: []
            }
          ]
        }
      ],
      renew: false,
      responseNum: -1
    }
  },
  methods: {
    comment: function () {
      this.isComment = true
    },
    exit_comment: function () {
      if (this.isComment) {
        this.isComment = false
        this.responseNum = -1
      }
    },
    writing: function () { // 通过input来监听是否有文字输入
      if (!this.isWriting && this.comments !== '') {
        this.isWriting = true
      } else if (this.isWriting && this.comments === '') {
        this.isWriting = false
      }
    },
    send_comment: function () {
      if (this.isWriting) {
        var comment = {}
        comment.postId = this.news.id
        comment.img = require('../assets/user.jpg')
        comment.authorName = this.$store.state.user.name
        comment.authorId = this.$store.state.user.id
        comment.content = this.comments
        comment.thumbs = 0
        comment.createTime = new Date().getTime()
        if (this.responseNum !== -1) { // 判断是评论还是回复
          comment.pid = this.commentList[this.responseNum].id
          comment.replyUserName = this.commentList[this.responseNum].authorName
          this.commentList[this.responseNum].childs.push({ comment })
        } else {
          comment.pid = 0
          comment.replyUserName = ''
          var childs = []
          this.commentList.push({ comment, childs })
        }
        this.$axios({
          method: 'post',
          url: 'http://106.15.192.168/news/comment/add',
          data: {
            postId: comment.id,
            authorId: comment.authorId,
            authorName: comment.authorName,
            time: comment.createTime,
            content: comment.content,
            pid: comment.pid,
            replyUserName: comment.replyUserName
          },
          header: { 'content-type': 'application/json' }
        }).then((response) => {
          console.log(response)
        })
        this.isWriting = false
        this.isComment = false
        this.comments = ''
        this.renew = true
        this.responseNum = -1
      } else {
        alert('请写下评论')
        this.isComment = false
        this.responseNum = -1
      }
    },
    response: function (index) {
      this.responseNum = index
      this.isComment = true
    }
  },
  updated () {
    if (this.isComment) {
      var temp = document.getElementById('write')
      temp.focus() // 打开评论，文本框即获得焦点
    }
    if (this.renew) {
      var mainArea = document.getElementsByClassName('main-area')
      mainArea[0].scrollTop = mainArea[0].scrollHeight // ????父div为relative，子div为absolute，在子div设置scrollTop
      // console.log(mainArea[0].scrollTop)
      this.renew = false
    }
  },
  mounted () {
    var hash = this.$route.query
    if (hash.location) {
      var obj = document.getElementsByClassName(hash.location)[0]
      var par = document.getElementsByClassName('main-area')[0]
      // console.log(obj)
      par.scrollTop = obj.offsetTop - 100
    }
  },
  created () {
    var id = this.$route.query.id
    console.log(id)
    // 获取新闻内容
    this.$axios({
      method: 'post',
      url: 'http://106.15.192.168/article/find',
      data: {
        id: id
      },
      headers: { 'content-type': 'application/json',
        'token': this.$store.state.token }
    }).then((response) => {
      // this.article = response.data.data
      console.log(response)
      // 获取新闻评论
      // this.$axios({
      //   method: 'post',
      //   url: 'http://106.15.192.168/news/comment/find',
      //   data: {
      //     postId: id
      //   },
      //   header: { 'content-type': 'application/json' }
      // }).then((response) => {
      //   // this.commentList = response.data.data
      //   console.log('获取评论成功')
      // })
    })
  },
  filters: {
    formatDate: function (value) {
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

<style scoped>                      /*display:flex,上下两元素会发生边距重叠*/
.main-area::-webkit-scrollbar{
  display: none;
}
.title{
  margin:10px 0;
}
.from{
  margin:10px 0;
}
.content{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.content p{
  text-indent: 2rem; /*段首空两个字符*/
  margin:8px 0;
}
.content img{
  margin:8px 0;
}
.comment-area{
  margin-top:20px;
}
.writing{
  color:royalblue !important;
}
.send-btn:active{
  color:darkblue !important;
}

</style>
