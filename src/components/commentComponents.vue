<template>
    <div>
        <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
                <h6 class="mb-1" id="on">{{msg}}</h6>
                <small class="text-muted">
                    {{date}}
                </small>
            </div>
            <p class="mb-1">
                {{commentmsg}}
            </p>
        </a>
        <div class="input-group mb-3" >
            <div class="input-group-append">
                <div v-if="inputDisplay">
                    <div class="input-group mb-3" >
                        <div class="input-group-append">
                            <textarea class="commentactive"
                                      placeholder="说点什么吧…"
                                      aria-label="Recipient's username"
                                      aria-describedby="basic-addon2"
                                      v-model="ReplyMsg">
                            </textarea>
                        </div>
                        <span class="replySubmit" @click="addreply()">发表</span>
                    </div>
                </div>
                <button :class="{submitactive:true}" type="button" v-if="!inputDisplay" @click="reply()">回复</button>
            </div>
        </div>
    </div>
</template>
<script>
    import store from '@/store'
    import commentComponents from '@/components/commentComponents.vue'
    let replyList=[];
    let replyCounters=0;
    let replyNum=0;
    let msg=store.state.userName;
    export default {
        components:{
            "commentComponents":commentComponents,
        },
        name: "commentComponents",
        props:{
            Id:Number,
            authorId:Number,
            msg:String,
            date:String,
            commentmsg:String,
        },
        data(){
            return{
                comment:{
                    comment: {
                        Id: 100,
                        postId: 200,
                        authorId: 300,
                        time: '2019-07-17',
                        content: '这应该是第一条评论',
                        pid: '',
                        replyUserId: ''
                    },
                    childs:
                        [{comment:{
                            id: 100,
                                postId: 200,
                            authorId: 500,
                            time: '2019-07-18',
                            content: '第一条评论的第一个回复',
                            pid: 400,
                            replyUserId: '小明'}},//小明的authorid是300
                        {comment:{
                    id: 100,
                    postId: 200,
                    authorId: 5000,
                    time: '2019-07-18',
                    content: '第一个评论的第二个回复',
                    pid: 400,
                    replyUserId: '小明'//小明的authorid是300
            }},
                        {comment:{
                id: 100,
                    postId: 200,
                    authorId: 50000,
                    time: '2019-07-18',
                    content: '第一个评论的第三个回复',
                    pid: 400,
                    replyUserId: '小明'//小明的authorid是300
            }},]
                },
                ReplyMsg: '',
                inputDisplay:false,
            }
        },
        methods:{
            reply(){
                this.inputDisplay=true;
            },
            addreply(){
                if (this.current === '') {
                    return;
                }
                if(this.ReplyMsg!=='')
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
                    this.replycurrentdate = year + seperator1 + month + seperator1 + strDate;
                    var tem=[];
                    tem={
                        comment:
                            {   content:this.ReplyMsg,
                                time:this.replycurrentdate,
                                authorId:987654321,},
                    }
                    // var item=document.createElement("commentComponents",{
                    //                                                         date:this.replycurrentdate,
                    //                                                         commentmsg:this.content,
                    //                                                         msg:987654321,
                    //                                                         Id:this.Id,
                    //                                                         authorId:987654321});
                    var item=document.createElement("div")
                    // item.date=this.replycurrentdate;
                    // item.commentmsg=this.content;
                    // item.msg="987654321";
                    // item.Id=this.Id;
                    // item.authorId=987654321;
                    // item.append("123");
                    // console.log(item);
                    var pitem=document.getElementById(this.Id);
                    // pitem.appendChild(item);
                    console.log(this.Id);
                }
                else{
                    alert("请输入你的评论！")
                }
                this.inputDisplay=!this.inputDisplay;
            }
        },
    }
</script>
<style scoped>
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
    .replySubmit{
        color: #fff;
        width: 70px;
        padding: 0;
        display: inline-block;
        text-align: center;
        border: none;
        position: relative;
        height: 28px;
        line-height: 28px;
        font-size: 14px;
        border-radius: 2px;
        vertical-align: middle;
        text-decoration: none;
        cursor: pointer;
        background-color: #1995e4;
        margin: 0;
        list-style: none;
        font-family: punctuation,"PingFangSC-Regular","Microsoft Yahei","sans-serif";
        -webkit-font-smoothing: subpixel-antialiased;

    }
</style>
