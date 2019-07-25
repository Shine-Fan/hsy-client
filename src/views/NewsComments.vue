<template>
    <div class="row" style="display:flex;justify-content: center">
        <div  style="max-width: 97%;">
            <div
                 style="text-align: center"
                :class="{active:true}">
                {{title}}
            </div>
            <p>
                <span :class="{writeractive:true}">{{author}}</span>
                <b-link class="focus">+关注</b-link>
            </p>
            <p class="modificationtime">{{createTime}}</p>
            <div>
                <p
                   :class="{active:true}"
                   style="text-indent:2em;">
                  {{newsContent}}
                </p>
            </div>
        </div>
        <div class="input-group mb-3" >
            <textarea class="commentactive"
                   placeholder="写下你的评论…"
                   aria-label="Recipient's username"
                   aria-describedby="basic-addon2"
                      v-model="CommentMsg"></textarea>
            <div class="input-group-append" >
                <button :class="{submitactive:true}" type="button" @click="add()" >评论</button>
            </div>
        </div>
        <div style="float: right">
            <p class="goodComments" >精彩评论({{commentnumber}})</p>
            <ul class="commentlist" style="list-style: none;width: 1080px;margin-left: -60px" >
                <li
                    v-for="(first,index) in comment"
                    :key="index"
                    id="index">
                    <commentComponents
                             :date=first.comment.createTime
                             :commentmsg = first.comment.content
                             :authorName=first.comment.authorName
                             :pid="first.comment.pid"
                             :authorId=first.comment.authorId
                             :postId=first.comment.postId
                             :Id=first.comment.id
                             :replyUserName=first.comment.replyUserName
                             :index="index"
                             @replymessage="replymessage"
                             class="huifu">
                    </commentComponents>
                            <ul class="replylist" style="list-style: none">
                                <li
                                    v-for="(firstreply,replyindex) in first.childs"
                                    :key="replyindex" :id="first.comment.Id">
                                    <commentComponents
                                            :date=firstreply.comment.createTime
                                            :commentmsg = firstreply.comment.content
                                            :authorName=firstreply.comment.authorName
                                            :authorId=firstreply.comment.authorId
                                            :Id=firstreply.comment.id
                                            :pid=firstreply.comment.pid
                                            :postId=firstreply.comment.postId
                                            :replyUserName=firstreply.comment.replyUserName
                                            @replymessage="replymessage"
                                            :index="index">
                                    </commentComponents>
                                </li>
                            </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import store from '@/store'
    import commentComponents from '@/components/commentComponents.vue'
    let comment=[];
    var commentList=[];
    let counters=0;
    let num=0;
    export default {
        name: "NewsComments",
        store,
        computed:{
            commentnumber:function () {
                return Number(this.comment.length)
            }
        },

        created:function(){
            // 获取新闻详情页面
            this.$ajax({
                method: 'post',
                url:'http://106.15.192.168/news/find_one',
                header:{"content-type":"application/json"},
                data:{
                    id:this.id
                }
            }).then((response)=> {
                if(response.data.status==0){
                    let data=response.data.data;
                    this.title=data.title;
                    this.newsContent=data.content;
                    this.author=data.author;
                    this.sectionId=data.sectionId;
                    let timeTo=new Date(data.createTime);
                    timeTo=timeTo.toLocaleString()
                    this.createTime= timeTo;
                    this.id=data.id;
                }else{
                    alert("获取新闻失败"+response.data.msg);
                }
            }).catch(err=>{
                    console.log(`error catched:${err}`);
                }
            )
            // 获取评论详情页面
            this.$ajax({
                method: 'post',
                url:'http://106.15.192.168/news/comment/find',
                header:{"content-type":"application/json"},
                data:{
                    postId:this.id,
                }
            }).then((response)=> {
                let data=response.data.data;
                if(response.data.status==0){
                    this.comment=data;
                }
                else{
                    alert("获取评论列表失败"+response.data.msg);
                }
            }).catch(err=>{
                console.log(`error catched:${err}`);
            })
        },

        data() {
            return {
                title:"",//新闻名称
                id:1,//新闻表ID
                newsContent:"",//新闻内容
                author:"",//作者名称
                sectionId:753421,//所属板块ID
                createTime:'',//新闻创建时间
                CommentMsg: '',
                commentList:commentList,
                counter: counters,
                key: 'key',
                replykey: 'replykey',
                myName: store.state.userName,
                num:num,
                inputDisplay:false,
                // replyCounters:replycomment.length,
                comment:comment,
                replyUserName:'',
                pid:0,
                authorId:1,
            }
        },

        methods: {
            add() {
                if (this.current === '') {
                    return;
                }
                    if(this.CommentMsg!='')
                    {
                        var date = new Date();
                        this.currentdate=date.getTime();
                        var tem=[];
                       tem={
                           comment:
                                   {
                                       postId:this.id,
                                       authorId:987654321,
                                       authorName:this.myName,
                                       time:this.currentdate,
                                       content:this.CommentMsg,
                                       pid:'',
                                       replyUserName:''
                                    },
                           childs:[]
                        }
                        this.comment.push(tem);
                    }
                    else{
                        alert("请输入你的评论！")
                    }
                    //给新闻添加评论
                this.$ajax({
                    method: 'post',
                    url:'http://106.15.192.168/news/comment/add',
                    header:{"content-type":"application/json"},
                    data:{
                        postId:this.id,
                        authorId:this.authorId,
                        authorName:this.myName,
                        time:this.currentdate,
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
            count(){
                this.num++;
                localStorage.setItem('num',this.num);
            },
            replymessage:function (message) {
                var index=message[1].data;
                this.comment[index].childs.push(message[0])

            }
        },
        components:{
                "commentComponents":commentComponents,
        }
}
</script>

<style scoped>
    .row{
    width: 1000px;
    margin: 0 auto;
    }
    .list-group{
        width: 1000px;
        font-size: 8pt;
        margin-left: -5px;
    }
    button.submitactive{
        background:#99CCFF;
        background-image: -webkit-linear-gradient(top, #6699CC, #7fc8f0);
        background-image: -moz-linear-gradient(top,#6699CC, #7fc8f0);
        background-image: -ms-linear-gradient(top, #6699CC, #7fc8f0);
        background-image: -o-linear-gradient(top, #6699CC, #7fc8f0);
        background-image: linear-gradient(to bottom, #6699CC, #7fc8f0);
        border-radius: 28px;
        font-family: Georgia;
        color: #ffffff;
        font-size: 12px;
        padding: 7px 25px 7px 25px;
        border: solid #8ecef5 0px;
        text-decoration: none;
        outline:0;
        float: right;
        margin-left: 927px;
        margin-top: 1px}
    button.submitactive:hover {
        background: #4a8eb8;
        background-image: -webkit-linear-gradient(top, #4a8eb8, #73bbeb);
        background-image: -moz-linear-gradient(top, #4a8eb8, #73bbeb);
        background-image: -ms-linear-gradient(top, #4a8eb8, #73bbeb);
        background-image: -o-linear-gradient(top, #4a8eb8, #73bbeb);
        background-image: linear-gradient(to bottom, #4a8eb8, #73bbeb);
        text-decoration: none;
    }
    span.writeractive{
        cursor: pointer;
        color: #333;
        text-decoration: none;
        background-color: transparent;
        box-sizing: border-box;
        font-size: 16px;
    }
    .modificationtime{
        margin-top: 5px;
        font-size: 12px;
        color: #969696
    }
    .focus{
        padding: 1px 7px 2px 5px;
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
        font-family: -apple-system,SF UI Text,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;
        -webkit-tap-highlight-color: transparent;
    }
    .goodComments{
        width: 1000px;
        margin-left:20px;
        padding-bottom: 20px;
        font-size: 17px;
        font-weight: 700;
        border-bottom: 2px solid #f0f0f0;
        border-bottom-width: 2px;
        border-bottom-style: solid;
        border-bottom-color: rgb(240, 240, 240);
        box-sizing: border-box;
    }
    div.active{
        word-break: break-word!important;
        word-break: break-all;
        margin: 20px 0 0;
        font-family: -apple-system,SF UI Display,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;
        font-size: 34px;
        font-weight: 700;
        line-height: 1.3

    }
    p.active{
        word-break: break-word!important;
        margin: 0 0 25px;
        box-sizing: border-box;
        display: block;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        color: #2f2f2f;
        font-size: 16px;
        font-weight: 400;
        line-height: 1.7;
        font-family: -apple-system,SF UI Text,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;
    }
    .likenumber{
        position: relative;
        padding: 9px 15px 12px 20px;
        color:  rgba(30,114,204,1);
        cursor: pointer;
        text-decoration: none;
        text-decoration-line: none;
        text-decoration-style: initial;
        text-decoration-color: initial;
        background-color: transparent;
        box-sizing: border-box;
        font-size: 15px;
        font-weight: 400;
        text-align: center;
        white-space: nowrap;
        line-height: 1.42857;
        user-select: none;
        border: 2px solid rgba(67,156,216,1);
        border-radius: 40px;
    }
   .commentactive{
        margin-top:30px;
        margin-left: 9px;
        padding: 10px 15px;
        width: 1000px;
        height: 80px;
        font-size: 13px;
        border: 1px solid #dcdcdc;
        border-radius: 4px;
        background-color: hsla(0,0%,71%,.1);
        resize: none;
        display: inline-block;
        vertical-align: top;
        outline-style: none;
        font-family: -apple-system,SF UI Text,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;
        line-height: inherit;
        overflow: auto;
        color: inherit;
        box-sizing: border-box;
        -webkit-writing-mode: horizontal-tb !important;
        text-rendering: auto;
        letter-spacing: normal;
        word-spacing: normal;
        text-transform: none;
        text-indent: 0px;
        text-shadow: none;
        text-align: start;
        -webkit-appearance: textarea;
        background-color: white;
        -webkit-rtl-ordering: logical;
        flex-direction: column;
        cursor: text;
        white-space: pre-wrap;
        overflow-wrap: break-word;
    }
    .huifu{
        margin-left: 40px;

    }
</style>
