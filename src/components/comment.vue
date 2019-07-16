<template>
    <div>
    <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
        <div class="d-flex w-100 justify-content-between">
            <h6 class="mb-1" id="on">{{msg}}</h6>
            <!--                                登陆用户名-->
            <small class="text-muted">
                {{date}}
            </small>
        </div>
        <p class="mb-1">
            {{comment}}
        </p>
    </a>
        <div>
            <ul class="replylist">
                <li class="list-group"
                    v-for="reply in replyList"
                    :key="reply">
                    <ReplyComment
                            :replyDate=reply.replyDate
                            :replyComment = reply.replyComment
                            :replyUsername=reply.replyUsername>
                    </ReplyComment>
                </li>
            </ul>
        </div>
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
    import ReplyComment from '@/components/ReplyComment.vue'
    import store from '@/store'
    let replyList=[];
    let replyCounters=0;
    let replyNum=0;
    let msg=store.state.userName;
    function init() {
        if(localStorage.hasOwnProperty(" replyNum"))
        {
            replyNum=localStorage.getItem(" replyNum");
        }
        else{
            replyNum=0;
        }
        if (localStorage.hasOwnProperty("replyCounters")) {
            replyCounters = localStorage.getItem("replyCounters");
            for (let i = 0; i < replyCounters; i++) {
                let temp= {
                    replyComment:[],
                    replyDate:[],
                    replyUsername:[],
                }
                temp.replyComment = localStorage.getItem("replykey" + i);
                temp.replyDate=localStorage.getItem("replycurrentdate" + (i+1));
                temp.replyUsername="LiSi"+"@"+msg;
                    replyList.push(temp);

                // lists[i]={
                //     date:date[i],
                //     comment:comment[i],
                // }
            }

        }
        else{
            replyCounters=0
        }
    }
    init();
    export default {
        name: "comment",
        props:{
            msg:String,
            // item:Object,
            date:String,
            comment:String
        },
        data(){
            return{
                ReplyMsg: '',
                replyList:replyList,
                replyCounters:replyCounters,
                replykey: 'replykey',
                replyUsername: '',
                replyNum:replyNum,
                inputDisplay:false
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
                else {
                    if(this.ReplyMsg!=='')
                    {
                        this.replykey = this.replykey + this.replyCounters;
                        this.replyCounters++;
                        localStorage.setItem('replyCounters',this.replyCounters);
                        localStorage.setItem(this.replykey, this.ReplyMsg);
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
                            ReplyMsg:this.ReplyMsg,
                            replycurrentdate:this.replycurrentdate
                        }
                        // commentList[this.counter-1].date=this.currentdate
                        replyList.push(tem);
                        localStorage.setItem('replycurrentdate'+this.replyCounters, this.replycurrentdate);
                        this.ReplyMsg = '';
                        this.replykey = 'replykey';
                        location.reload();
                        console.log(replyList)
                        // this.reload();
                    }
                    else{
                        alert("请输入你的评论！")
                    }

                }

            }

        },
        components:{
            "ReplyComment":ReplyComment,
        }

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
