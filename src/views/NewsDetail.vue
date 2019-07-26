<template>
    <div style="display:flex;align-content:center;justify-content: center;margin-top:20px">
        <div style="width:70%">
            <div style="margin-bottom:20px;">
                <h3 style="text-align: center;font-weight: bold;">
                    {{title}}
                </h3>
                <div style="margin-top:30px;display:flex;justify-content: center;">
                    <span style="font-size:16px;margin-right:10px;">{{author}}</span>
                    <b-link class="focus" style="margin-right:20px;">+关注</b-link>
                    <span style="font-size:14px;margin-right:15px;">{{creatTime}}</span>
                    <span style="font-size:14px;margin-right:15px;">评论 {{commentnumber}}</span>
                    <span style="font-size:14px;margin-right:15px;">喜欢 {{num}}</span>
                </div>
                <div style="display:flex;justify-content:center;margin-top:40px;">
                    <div style="" v-html="newsContent">
                        {{newsContent}}
                    </div>
                </div>
            </div>
            <div style="display: flex;justify-content: center;margin-bottom:30px;">
                <button class="likenumber" style="" @click="count()">喜欢 | {{num}}</button>   <!---有bug!!!!!!!!!!-->
            </div>
            <div style="display:flex;flex-direction:column;align-items: center;margin-bottom:30px;">
                <textarea class="commentactive"
                          placeholder="  写下你的评论…"
                          v-model="CommentMsg"></textarea>
                <div style="width:90%;display:flex;justify-content: flex-end;margin-right:20px;margin-top:15px;" >
                    <button class="submitbtn" type="button" @click="add()">评论</button>
                </div>
            </div>
            <div style="display:flex;justify-content:center;">
                <div style="width:95%">
                    <p class="goodComments">精彩评论({{commentnumber}})</p>
                    <ul class="commentlist" style="list-style: none;padding-left:0px;">
                        <li
                                v-for="(first,index) in comment"
                                :key="index"
                                id="index">
                            <commentMedia :date=first.comment.time
                                          :commentmsg=first.comment.content
                                          :msg=first.comment.authorId
                                          :pid="first.comment.pid"
                                          :authorId=first.comment.authorId
                                          :postId=first.comment.postId
                                          :Id=first.comment.Id
                                          :replyUserId=first.comment.replyUserId
                                          :index="index"
                                          @replymessage="replymessage"
                                          class="huifu">
                            </commentMedia>
                            <ul class="replylist" style="list-style: none">
                                <li
                                        v-for="(firstreply,replyindex) in first.childs"
                                        :key="replyindex" :id="first.comment.Id">
                                    <commentMedia
                                            :date=firstreply.comment.time
                                            :commentmsg=firstreply.comment.content
                                            :msg=firstreply.comment.authorId
                                            :authorId=firstreply.comment.authorId
                                            :Id=firstreply.comment.Id
                                            :pid=firstreply.comment.pid
                                            :postId=firstreply.comment.postId
                                            @replymessage="replymessage"
                                            :index="index"
                                            class="huifu">
                                    </commentMedia>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import commentMedia from '../components/commentMedia.vue'

    var comment = [
        {
            comment: {
                Id: 1,
                postId: 200,
                authorId: 300,
                time: '2019-07-17',
                content: '这应该是第一条评论',
                pid: '',
                replyUserId: ''
            },
            childs:
                [{
                    comment:
                        {
                            Id: 1,
                            postId: 200,
                            authorId: 500,
                            time: '2019-07-18',
                            content: '第一条评论的第一个回复',
                            pid: 300,
                            replyUserId: '小明'//小明的authorid是300
                        }
                },
                    {
                        comment: {
                            Id: 1,
                            postId: 200,
                            authorId: 5000,
                            time: '2019-07-18',
                            content: '第一个评论的第二个回复',
                            pid: 300,
                            replyUserId: '小明'//小明的authorid是300
                        }
                    },
                    {
                        comment: {
                            Id: 100,
                            postId: 200,
                            authorId: 50000,
                            time: '2019-07-18',
                            content: '第一个评论的第三个回复',
                            pid: 300,
                            replyUserId: '小明'//小明的authorid是300
                        }
                    },]
        },

        {
            comment: {
                Id: 2,
                postId: 200,
                authorId: 400,
                time: '2019-07-17',
                content: '这应该是第二条评论',
                pid: '',
                replyUserId: ''
            },
            childs:
                [{
                    comment:
                        {
                            Id: 2,
                            postId: 200,
                            authorId: 500,
                            time: '2019-07-18',
                            content: '第二条评论的第一个回复',
                            pid: 400,
                            replyUserId: '小明'//小明的authorid是300
                        }
                },
                    {
                        comment: {
                            Id: 2,
                            postId: 200,
                            authorId: 5000,
                            time: '2019-07-18',
                            content: '第二个评论的第二个回复',
                            pid: 400,
                            replyUserId: '小明'//小明的authorid是300
                        }
                    },
                    {
                        comment: {
                            Id: 2,
                            postId: 200,
                            authorId: 50000,
                            time: '2019-07-18',
                            content: '第二个评论的第三个回复',
                            pid: 400,
                            replyUserId: '小明'//小明的authorid是300
                        }
                    },]
        },

    ]
    var commentList = [];
    let counters = 0;
    let num = 0;

    export default {
        name: "NewsDetail",
        components: {
            commentMedia
        },
        computed: {
            commentnumber: function () {
                return Number(this.comment.length)
            }
        },
        // created:function(){
        //     // 获取新闻详情页面
        //     this.$ajax({
        //         method: 'post',
        //         url:'http://106.15.192.168/news/find_one',
        //         header:{"content-type":"application/json"},
        //         data:{
        //             id:this.id
        //         }
        //     }).then((response)=> {
        //         if(response.data.status==0){
        //             let data=response.data.data;
        //             this.title=data.title;
        //             this.newsContent=data.content;
        //             this.author=data.author;
        //             this.sectionId=data.sectionId;
        //             let timeTo=new Date(data.createTime);
        //             timeTo=timeTo.toLocaleString()
        //             this.createTime= timeTo;
        //             this.id=data.id;
        //         }else{
        //             alert("获取新闻失败"+response.data.msg);
        //         }
        //     }).catch(err=>{
        //             console.log(`error catched:${err}`);
        //         }
        //     )
        //     // 获取评论详情页面
        //     this.$ajax({
        //         method: 'post',
        //         url:'http://106.15.192.168/news/comment/find',
        //         header:{"content-type":"application/json"},
        //         data:{
        //             postId:this.id,
        //         }
        //     }).then((response)=> {
        //         let data=response.data.data;
        //         if(response.data.status==0){
        //             this.comment=data;
        //         }
        //         else{
        //             alert("获取评论列表失败"+response.data.msg);
        //         }
        //     }).catch(err=>{
        //         console.log(`error catched:${err}`);
        //     })
        // },
        data:function(){
            return {
                title: "何韵诗要联合国人权理事会将中国除名 外交部回应",//新闻名称
                id: 11112222,//新闻表ID
                newsContent: "<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在9日中国外交部例行记者会上，有记者提问称，香港艺人何韵诗昨日在联合国人权理事会上就香港特区政府修改</p><p>《逃犯条例》发表言<span style=\"font-size: 1rem;\">论，但被中方代表打断。北京是否不允许香港民间人士在国际场合发表不利于大陆立场的言论？ 对</span></p><p><span style=\"font-size: 1rem;\">此，中国外交部发言人耿爽表示：&nbsp;</span></p><p><span style=\"font-size: 1rem;\">&nbsp; &nbsp;&nbsp;</span><span style=\"font-size: 1rem;\">&nbsp; &nbsp;&nbsp;</span><span style=\"font-size: 1rem;\">第一，香港是中国的特别行政区，香港事务纯属中国内政，任何国家和组织无权干预。&nbsp;</span></p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;第二，有关的非政府组织违反了联合国宪章和联合国人权理事会的相关规定，在发言中挑战一个中国原则，干涉中</p><p>国内政和主权，污<span style=\"font-size: 1rem;\">中国的人权状况，中方对此表示坚决反对，并给予强烈谴责。&nbsp;</span></p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;第三，香港回归以来，一国两制港人治港高度自治的方针得到切实贯彻和落实，香港居民享有的各项权利和自由依</p><p>法得到充分保障，<span style=\"font-size: 1rem;\">事实有目共睹。保持香港的繁荣和稳定不仅符合中国的利益，也符合世界各国的利益。&nbsp;</span></p><p><span style=\"font-size: 1rem;\">&nbsp; &nbsp;&nbsp;</span><span style=\"font-size: 1rem;\">&nbsp; &nbsp;&nbsp;</span><span style=\"font-size: 1rem;\">此外，针对有记者问及何韵诗在发言中要求联合国人权理事会将中国除名，耿爽表示，这是痴心妄想，不自量</span></p><p><span style=\"font-size: 1rem;\">力。&nbsp;&nbsp;</span></p>",//新闻内容
                author: "路人甲",//作者名称
                sectionId: 753421,//所属板块ID
                creatTime: "2019-07-22",//新闻创建时间
                CommentMsg: '',
                commentList: commentList,
                counter: counters,
                key: 'key',
                replykey: 'replykey',
                msg: this.$store.state.user_name,
                num: num,
                inputDisplay: false,
                comment: comment,
            }
        },
        methods: {
            add:function(){
                if (this.current === '') {
                    return;
                }
                if (this.CommentMsg != '') {
                    var date = new Date();
                    var currentdate=date.getFullYear()+'-'+(date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'+date.getDate();
                    var tem=[];
                    tem={
                        comment:
                            {
                                postId:this.id,
                                authorId:987654321,
                                authorName:this.myName,
                                time:currentdate,
                                content:this.CommentMsg,
                                pid:'',
                                replyUserName:''
                            },
                        childs:[]
                    }
                    this.comment.push(tem);
                } else {
                    alert("请输入你的评论！")
                }
                // 给新闻添加评论
                this.$ajax({
                    method: 'post',
                    url:'http://106.15.192.168/news/comment/add',
                    header:{"content-type":"application/json"},
                    data:{
                        postId:this.id,
                        authorId:this.authorId,
                        authorName:this.myName,
                        time:currentdate,
                        content:this.CommentMsg,
                    }
                }).then(function (response) {
                    console.log(response)
                    if(response.data.status==0)
                    {
                        alert("评论成功");
                    }
                    else if(response.data.status==-1)
                    {
                        alert("评论失败"+response.msg);
                    }
                    else{
                        alert("错误")
                    }
                }).catch(err=>{
                    console.log(`error catched:${err}`);
                })
                this.CommentMsg = '';
            },
            count:function(){
                this.num = this.num + 1;
            },
            replymessage: function (message) {
                var index = message[1].data;
                this.comment[index].childs.push(message[0])
            }
        },
    }
</script>

<style scoped>
    .focus {
        padding: 1px 7px 1px 7px;
        font-size: 13px;
        border-color: #99CCFF;
        font-weight: 400;
        line-height: normal;
        border-radius: 40px;
        color: #fff;
        background-color: #3399CC;
        display: inline-block;
        margin-bottom: 3px;
        text-align: center;
        vertical-align: middle;
        touch-action: manipulation;
        cursor: pointer;
        background-image: none;
        white-space: nowrap;
        user-select: none;
        text-decoration: none;
        box-sizing: border-box;
        font-family: -apple-system, SF UI Text, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
        -webkit-tap-highlight-color: transparent;
    }

    .goodComments {
        margin-bottom:30px;
        padding-bottom: 10px;
        font-size: 17px;
        font-weight: 700;
        border-bottom: 2px solid rgb(214, 214, 214);
    }

    .likenumber {
        outline: none;
        padding: 5px 10px 5px 10px;
        color: rgba(30, 114, 204, 1);
        background-color: transparent;
        font-size: 15px;
        border: 2px solid rgba(67, 156, 216, 1);
        border-radius: 40px;
    }

    .submitbtn{
        outline: none;
        font-size: 13px;
        width: 60px;
        height: 30px;
        padding: 3px 10px;
        border: 1px solid #6699CC;
        color: rgba(255,255,255,0.9);
        background: #6699CC;
        border-radius: 28px;
    }

    .commentactive {
        padding:10px;
        width: 90%;
        height: 150px;
        font-size: 15px;
        border: 1px solid #dcdcdc;
        border-radius: 4px;
        background-color:transparent;
        resize:none;
    }

    .huifu {
        margin: 20px;

    }
</style>
