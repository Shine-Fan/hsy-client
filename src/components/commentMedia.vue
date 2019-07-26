<template>
    <div>
        <div class="list-group-item list-group-item-action flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
                <h6 v-if="pid">
                    {{msg}}@{{pid}}
                </h6>
                <h6 v-if="!pid">
                    {{msg}}
                </h6>
                <small>
                    {{date}}
                </small>
            </div>
            <p>
                {{commentmsg}}
            </p>
        </div>
        <div v-if="!inputDisplay" style="display:flex;justify-content: flex-end;">
            <button class="replybtn" type="button" @click="reply()">回复</button>
        </div>
        <div v-if="inputDisplay">
            <div style="display:flex;flex-direction:column;align-items: flex-start;">
                <textarea class="commentactive"
                          :placeholder="replyauthorId"
                          aria-label="Recipient's username"
                          aria-describedby="basic-addon2"
                          v-model="ReplyMsg">
                </textarea>
                <div style="display:flex;justify-content: flex-end;width:90%" >
                    <button class="replybtn" @click="addreply()">发表</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "commentMedia.vue",
        props: {
            Id: Number,
            authorId: Number,
            msg: String,
            date: String,
            commentmsg: String,
            replyUserId: String,
            pid: Number,
            content: String,
            postId: Number,
            index: Number,
        },
        data() {
            return {
                ReplyMsg: '',
                inputDisplay: false,
                commentDate:'',
                myName: this.$store.state.user_name,
            }
        },
        methods: {
            reply() {
                this.inputDisplay = true;
            },
            addreply() {
                if (this.current === '') {
                    return;
                }
                if (this.ReplyMsg !== '') {
                    var date = new Date();
                    var replycurrentdate = date.getFullYear()+'-'+(date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'+date.getDate();
                    var message = [{
                        comment:
                            {
                                Id: this.Id,
                                postId: this.postId,
                                authorId: 500,
                                time: replycurrentdate,
                                content: this.ReplyMsg,
                                pid: this.authorId,
                                replyUserId:this.authorName,//小明的authorid是300
                            }
                    }, {data: this.index}]
                    this.$emit("replymessage", message)
                    this.$ajax({
                        method: 'post',
                        url:'http://106.15.192.168/news/comment/add',
                        header:{"content-type":"application/json"},
                        data:{
                            postId:this.postId,
                            authorId:500,
                            authorName:this.myName,
                            time:replycurrentdate,
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
                } else {
                    alert("请输入你的评论！")
                }
                this.inputDisplay = !this.inputDisplay;
            }
        },
        computed: {
            replyauthorId: function () {
                return "回复" + this.authorId + ":";
            }
        }
    }
</script>

<style scoped>
    .replybtn {
        outline: none;
        font-size: 13px;
        width: 60px;
        height: 30px;
        padding: 3px 10px;
        border: 1px solid #6699CC;
        color: rgba(255, 255, 255, 0.9);
        background: #6699CC;
        border-radius: 28px;
        margin-right:20px;
        margin-top:15px;
    }

    .commentactive {
        margin-top: 30px;
        padding: 10px 15px;
        width:90%;
        height: 120px;
        font-size: 14px;
        border: 1px solid #dcdcdc;
        border-radius: 4px;
        resize:none;
        background-color: transparent;
    }
</style>
