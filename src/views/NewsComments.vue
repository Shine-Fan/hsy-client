<template>
    <div class="row" style="display:flex;justify-content: center">
        <div  style="max-width: 97%;">
            <div
                 style="text-align: center"
                :class="{active:true}">
                何韵诗要联合国人权理事会将中国除名 外交部回应
            </div>
            <p>
                <span :class="{writeractive:true}">作者：路人甲</span>
                <b-link class="focus" >+关注</b-link>
            </p>

            <p :class="{modificationtime:true}">2019.01.23 13:51  阅读 4147评论{{counter}}喜欢 {{num}}</p>
            <div >
                <p
                   :class="{active:true}"
                   style="text-indent:2em;">
                      在9日中国外交部例行记者会上，有记者提问称，香港艺人何韵诗昨日在联合国人权理事会上就香港特区政府修改《逃犯条例》发表言论，但被中方代表打断。北京是否不允许香港民间人士在国际场合发表不利于大陆立场的言论？
                    对此，中国外交部发言人耿爽表示：
                    第一，香港是中国的特别行政区，香港事务纯属中国内政，任何国家和组织无权干预。
                    第二，有关的非政府组织违反了联合国宪章和联合国人权理事会的相关规定，在发言中挑战一个中国原则，干涉中国内政和主权，污蔑中国的人权状况，中方对此表示坚决反对，并给予强烈谴责。
                    第三，香港回归以来，一国两制港人治港高度自治的方针得到切实贯彻和落实，香港居民享有的各项权利和自由依法得到充分保障，事实有目共睹。保持香港的繁荣和稳定不仅符合中国的利益，也符合世界各国的利益。
                    此外，针对有记者问及何韵诗在发言中要求联合国人权理事会将中国除名，耿爽表示，这是痴心妄想，不自量力。
                </p>
            </div>
        </div>
        <div>
            <button class=likenumber type="button" @click="count()">喜欢 | {{num}}</button>
        </div>

        <div class="input-group mb-3" >
            <textarea class="commentactive"
                   placeholder="写下你的评论…"
                   aria-label="Recipient's username"
                   aria-describedby="basic-addon2"
                      v-model="CommentMsg"></textarea>
            <div class="input-group-append">
                <button :class="{submitactive:true}" type="button" @click="add()">评论</button>
            </div>
        </div>
        <div>
            <p class="goodComments">精彩评论({{commentnumber}})</p>
            <ul class="commentlist" >
                <li class="list-group"
                    v-for="(first,index) in comment"
                    :key="index">
                    <commentComponents :date=first.comment.time
                             :commentmsg = first.comment.content
                             :msg=first.comment.authorId>
                    </commentComponents>
                            <ul class="replylist">
                                <li class="list-group"
                                    v-for="(firstreply,replyindex) in first.childs"
                                    :key="replyindex" :id="first.comment.Id">
                                    <commentComponents
                                            :date=firstreply.comment.time
                                            :commentmsg = firstreply.comment.content
                                            :msg=firstreply.comment.authorId
                                            :Id=firstreply.comment.Id
                                            :authorId=firstreply.comment.authorId>
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

    var comment=[
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
                [{comment:
                        {
                            Id: 1,
                            postId: 200,
                            authorId: 500,
                            time: '2019-07-18',
                            content: '第一条评论的第一个回复',
                            pid: 400,
                            replyUserId: '小明'//小明的authorid是300
                        }},
                {comment:{
                            Id: 1,
                            postId: 200,
                            authorId: 5000,
                            time: '2019-07-18',
                            content: '第一个评论的第二个回复',
                            pid: 400,
                            replyUserId: '小明'//小明的authorid是300
                        }},
                {comment:{
                            Id: 100,
                            postId: 200,
                            authorId: 50000,
                            time: '2019-07-18',
                            content: '第一个评论的第三个回复',
                            pid: 400,
                            replyUserId: '小明'//小明的authorid是300
                        }},]
        },

    {
        comment: {
                Id: 2,
                postId: 200,
                authorId: 300,
                time: '2019-07-17',
                content: '这应该是第二条评论',
                pid: '',
                replyUserId: ''
        },
        childs:
            [{comment:
        {
            Id: 2,
            postId: 200,
            authorId: 500,
            time: '2019-07-18',
            content: '第二条评论的第一个回复',
            pid: 400,
            replyUserId: '小明'//小明的authorid是300
        }},
       { comment:{
                Id: 2,
                postId: 200,
                authorId: 5000,
                time: '2019-07-18',
                content: '第二个评论的第二个回复',
                pid: 400,
                replyUserId: '小明'//小明的authorid是300
        }},
        {comment:{
                Id: 2,
                postId: 200,
                authorId: 50000,
                time: '2019-07-18',
                content: '第二个评论的第三个回复',
                pid: 400,
                replyUserId: '小明'//小明的authorid是300
        }},]
    },

    ]
    var commentList=[];
    let counters=0;
    let num=0;
    export default {
        name: "NewsComments",
        store,
        computed:{
            // commentlist: function () {
            //     return this.firstcomment.filter(function (obj) {
            //         return obj.pid ==='';
            //     })
            // },

            commentnumber:function () {
                return Number(this.counter)+Number(this.comment.length)
            }
        },
        data() {
            return {
                CommentMsg: '',
                commentList:commentList,
                counter: counters,
                key: 'key',
                replykey: 'replykey',
                msg: store.state.userName,
                num:num,
                replycomment:replycomment,
                inputDisplay:false,
                replyCounters:replycomment.length,
                comment:comment,
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
                        var seperator1 = "-";
                        var year = date.getFullYear();
                        var month = date.getMonth() + 1;
                        var strDate = date.getDate();
                        if (month >= 1 && month <= 9) {
                            month = "0" + month;
                        }
                        if (strDate >= 0 && strDate <= 9) {
                            strDate = "0" + strDate;
                        }
                        this.currentdate = year + seperator1 + month + seperator1 + strDate;
                        var tem=[];
                       tem={
                           comment:
                                   { content:this.CommentMsg,
                                    time:this.currentdate,
                                    authorId:987654321,},
                           childs:[]
                        }
                        comment.push(tem);
                        this.CommentMsg = '';
                        // location.reload()
                        // this.reload();
                    }
                    else{
                        alert("请输入你的评论！")
                    }


            },
            count(){
                this.num++;
                localStorage.setItem('num',this.num);
            },
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
        margin-left: -20px;
    }
    .commentlist{
        margin-top:10px;
    }
    button.submitactive{
        background-color: #3db922;
        float: right;
        width: 78px;
        margin: 10px 900px;
        padding: 8px 18px;
        font-size: 16px;
        border: none;
        border-radius: 20px;
        color: #fff!important;
        cursor: pointer;
        outline: none;
        display: block;
    }
    span.writeractive{
        cursor: pointer;
        color: #333;
        text-decoration: none;
        background-color: transparent;
        box-sizing: border-box;
        font-size: 16px;
    }
    p.modificationtime{
        margin-top: 5px;
        font-size: 12px;
        color: #969696
    }
    .focus{
        padding: 1px 7px 2px 5px;
        font-size: 13px;
        border-color: #42c02e;
        font-weight: 400;
        line-height: normal;
        border-radius: 40px;
        color: #fff;
        background-color: #42c02e;
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
        color: #EA6F5A;
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
        border: 1px solid #EA6F5A;
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
</style>
