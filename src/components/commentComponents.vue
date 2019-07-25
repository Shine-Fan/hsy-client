<template>
    <div>
        <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
                <h6 class="mb-1" v-if="Boolean(pid)">
                    {{authorName}}@{{replyUserName}}
                </h6>
                <h6 class="mb-1" v-if="!Boolean(pid)">
                    {{authorName}}
                </h6>
                <small class="text-muted">
                    {{commentDate}}
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
                                      :placeholder="replyauthorId"
                                      aria-label="Recipient's username"
                                      aria-describedby="basic-addon2"
                                      v-model="ReplyMsg">
                            </textarea>
                        </div>
                        <span class="replybtn" @click="addreply()">发表</span>
                    </div>
                </div>
                <button class="replybtn" type="button" v-if="!inputDisplay" @click="reply()">回复</button>
            </div>
        </div>
    </div>
</template>
<script>
    import store from '@/store'
    export default {
        name: "commentComponents",
        store,
        props:{
            Id:Number,
            authorId:Number,
            authorName:String,
            date:Number,
            commentmsg:String,
            replyUserName:String,
            pid:Number,
            content:String,
            postId:Number,
            index:Number,
        },
        mounted: function () {
                this.$nextTick(function () {
                let ctimeTo=new Date(this.date);
                var year = ctimeTo.getFullYear();
                var month= ctimeTo.getMonth()+1;
                var strDate = ctimeTo.getDate();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
               this.commentDate= year + "-" + month + "-" + strDate;

        })
        },
        data(){
            return{
                commentDate:'',
                ReplyMsg: '',
                inputDisplay:false,
                myName: store.state.userName,
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
                    var message=[{comment:
                            {
                                Id: this.Id,
                                postId: this.postId,
                                authorId: 500,
                                authorName:this.myName,
                                time: this.replycurrentdate,
                                content:this.ReplyMsg,
                                pid: this.authorId,
                                replyUserName: this.authorName,//zhangsan的authorid是500
                            }},{data:this.index}]
                    this.$emit("replymessage",message)
                    this.$ajax({
                        method: 'post',
                        url:'http://106.15.192.168/news/comment/add',
                        header:{"content-type":"application/json"},
                        data:{
                            postId:this.postId,
                            authorId:500,
                            authorName:this.myName,
                            time:this.currentdate,
                            content:this.ReplyMsg,
                            pid: this.Id,
                            replyUserName: this.authorName,
                        }
                    }).then(function (response) {
                        if(response.data.status==0)
                        {
                            alert("回复成功");
                        }
                        else if(response.data.status==-1)
                        {
                            alert("回复失败"+response.data.msg);
                        }
                        else{
                            alert("错误")
                        }
                    }).catch(err=>{
                        console.log(`error catched:${err}`);
                    })

                }
                else{
                    alert("请输入你的评论！")
                }
                this.inputDisplay=!this.inputDisplay;
            }
        },
        computed:{
            replyauthorId:function () {
                return "回复"+this.authorName+":";
            }
        }
    }
</script>
<style scoped>
    .replybtn {
        display: block;
        -webkit-box-sizing: content-box;
        -moz-box-sizing: content-box;
        box-sizing: content-box;
        float: right;
        z-index: auto;
        width: 25px;
        height: 10px;
        position: relative;
        cursor: pointer;
        opacity: 1;
        left: 934px;
        margin-top: 10px;
        margin-left: -10px;
        padding: 5px 20px 10px;
        overflow: visible;
        border: 1px solid #6699CC;
        -webkit-border-radius: 3px;
        border-radius: 3px;
        font: normal 12px/normal Arial, Helvetica, sans-serif;
        color: rgba(255,255,255,0.9);
        -o-text-overflow: clip;
        text-overflow: clip;
        background: #6699CC;
        -webkit-box-shadow: 2px 2px 2px 0 rgba(0,0,0,0.2) ;
        box-shadow: 2px 2px 2px 0 rgba(0,0,0,0.2) ;
        text-shadow: -1px -1px 0 #6699CC ;
        -webkit-transition: all 300ms cubic-bezier(0.42, 0, 0.58, 1);
        -moz-transition: all 300ms cubic-bezier(0.42, 0, 0.58, 1);
        -o-transition: all 300ms cubic-bezier(0.42, 0, 0.58, 1);
        transition: all 300ms cubic-bezier(0.42, 0, 0.58, 1);
        -webkit-transform: none;
        transform: none;
        -webkit-transform-origin: 50% 50% 0;
        transform-origin: 50% 50% 0;
        border-radius: 28px;
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
