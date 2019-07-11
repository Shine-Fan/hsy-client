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
                <button :class="{focus:true}" type="button">+关注</button>
            </p>

            <p :class="{modificationtime:true}">2019.01.23 13:51  字数 3739 阅读 4147评论 57喜欢 58</p>
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
            <button :class="{likenumber:true}" type="button" @click="count()">喜欢|{{num}}</button>
        </div>

        <div class="input-group mb-3" >
            <a :class="avatar">
                <img src="//upload.jianshu.io/users/upload_avatars/11046569/5360dd6b-626e-43d4-86eb-d0ea93639cda?imageMogr2/auto-orient/strip|imageView2/1/w/114/h/114/format/webp">
            </a>
            <textarea :class="{commentactive:true}"
                   placeholder="写下你的评论…"
                   aria-label="Recipient's username"
                   aria-describedby="basic-addon2"
                      v-model="CommentMsg"></textarea>
            <div class="input-group-append">
                <button :class="{submitactive:true}" type="button" @click="add()">评论</button>
            </div>
        </div>
        <div>
            <ul>
                <li class="list-group"
                    :class="{active:true}"
                    v-for="item in lists"
                    :key="item">
                        <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                            <div class="d-flex w-100 justify-content-between">
                                <h6 class="mb-1" id="on">{{msg}}</h6>
                                <small class="text-muted">
                                    {{item.date}}
                                </small>
                            </div>
                            <p class="mb-1">
                                {{item.comment}}
                            </p>
                        </a>


                </li>

            </ul>
        </div>
    </div>
</template>
<script>
    import store from '@/store'
    let comment=[];
    let date=[];
    let lists=[];
    let counters=0;
    let num=0;
    function init() {
        if(localStorage.hasOwnProperty("num"))
        {
            num=localStorage.getItem("num");
        }
        else{
            num=0;
        }
        if (localStorage.hasOwnProperty("counter")) {
            counters = localStorage.getItem("counter");
            for (let i = 0; i < counters; i++) {
                comment[i] = localStorage.getItem("key" + i);
                date[i]=localStorage.getItem("currentdate" + (i+1));
                lists[i]={
                    date:date[i],
                    comment:comment[i]
                }
            }
            console.log(lists)
        }
        else{
            counters=0
        }
    }
    init();
    export default {

        name: "NewsComments",
        // inject:['reload'],
        store,
        data() {
            return {
                CommentMsg: '',
                lists:lists,
                counter: counters,
                key: 'key',
                msg: store.state.userName,
                num:num
            }
        },
        methods: {
            add() {
                if (this.current === '') {
                    return
                }
                else {
                    comment[this.counter]=this.CommentMsg
                    this.key = this.key + this.counter
                    this.counter++
                    localStorage.setItem('counter',this.counter)
                    localStorage.setItem(this.key, this.CommentMsg)
                    this.CommentMsg = ''
                    this.key = 'key'
                    // var Currentdate = new Date();
                    // date[this.counter-1]= Currentdate.toDateString();
                    // localStorage.setItem('currentdate'+this.counter, Currentdate.toDateString());
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
                    date[this.counter-1]=this.currentdate
                    localStorage.setItem('currentdate'+this.counter, this.currentdate);
                    location.reload()
                    // this.reload();
                }

            },
            // GetTime() {
            //     var date = new Date();
            //     var seperator1 = "-";
            //     var year = date.getFullYear();
            //     var month = date.getMonth() + 1;
            //     var strDate = date.getDate();
            //     if (month >= 1 && month <= 9) {
            //         month = "0" + month;
            //     }
            //     if (strDate >= 0 && strDate <= 9) {
            //         strDate = "0" + strDate;
            //     }
            //     this.currentdate = year + seperator1 + month + seperator1 + strDate;
            //     date[this.counter-1]=this.currentdate
            //     localStorage.setItem('currentdate'+this.counter, this.currentdate);
            // },
            count(){
                this.num++;
                localStorage.setItem('num',this.num);
            }}
    }

</script>

<style scoped>
li.active{
    width: 30cm;
    font-size: 8pt;
}
button.submitactive{
    background-color: #3db922;
    float: right;
    width: 78px;
    margin: 10px 0;
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
button.focus{
    border-radius: 40px;
    color: #fff;
    background-color: #42c02e;
    display: inline-block;
    margin-bottom: 0;
    text-align: center;
    vertical-align: middle;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    border: 1px solid transparent;
    white-space: nowrap;
    user-select: none;
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
    button.likenumber{


    }
    a.avatar{
        position: absolute;
        left: -48px;
        margin-right: 5px;
        vertical-align: middle;
        cursor: pointer;    width: 24px;
        height: 24px;
        display: block;
        cursor: pointer;
    }
    textarea.commentactive{
        padding: 10px 15px;
        width: 100%;
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
        margin: 0;
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
        border-image: initial;
    }
</style>
