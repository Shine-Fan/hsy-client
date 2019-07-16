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

    <div class="input-group mb-3" >

        <div class="input-group-append">
            <div v-if="inputDisplay">
                <textarea class="commentactive"
                            placeholder="说点什么吧…"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            v-model="ReplyMsg">
                 </textarea>
                <span class="replySubmit">
                    发表
                </span>
            </div>
            <button :class="{submitactive:true}" type="button"  @click="reply()">回复</button>
        </div>
    </div>
    </div>
</template>

<script>
    export default {
        name: "comment",
        props:{
            msg:String,
            // item:Object,
            date:String,
            comment:String
        },
        data(){
            return{inputDisplay:false}

        },
        methods:{
            reply(){
                this.inputDisplay=true;
            },

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
        left: 940px;
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
