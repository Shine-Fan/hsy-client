<template>
    <div class="row" style="display:flex;justify-content: center">
        <div class="card border-dark mb-3" style="max-width: 97%;">
            <div class="card-header"
                 style="text-align: center"
                :class="{active:true}"><strong>
                何韵诗要联合国人权理事会将中国除名 外交部回应
                </strong></div>
            <div class="card-body text-dark">
                <p class="card-text"
                   :class="{active:true}"
                   style="text-indent:2em;">
                      在9日中国外交部例行记者会上，有记者提问称，香港艺人何韵诗昨日在联合国人权理事会上就香港特区政府修改《逃犯条例》发表言论，但被中方代表打断。北京是否不允许香港民间人士在国际场合发表不利于大陆立场的言论？
                    对此，中国外交部发言人耿爽表示：
                    第一，香港是中国的特别行政区，香港事务纯属中国内政，任何国家和组织无权干预。
                    第二，有关的非政府组织违反了联合国宪章和联合国人权理事会的相关规定，在发言中挑战一个中国原则，干涉中国内政和主权，污蔑中国的人权状况，中方对此表示坚决反对，并给予强烈谴责。
                    第三，香港回归以来，一国两制港人治港高度自治的方针得到切实贯彻和落实，香港居民享有的各项权利和自由依法得到充分保障，事实有目共睹。保持香港的繁荣和稳定不仅符合中国的利益，也符合世界各国的利益。
                    此外，针对有记者问及何韵诗在发言中要求联合国人权理事会将中国除名，耿爽表示，这是痴心妄想，不自量力。
                </p>
                <p class="text-right">作者：路人甲</p>
                <p class="text-right">2019年7月9日</p>
            </div>
        </div>

        <div class="input-group mb-3" >
            <input type="text"
                   class="form-control"
                   placeholder="请写下你的评论"
                   aria-label="Recipient's username"
                   aria-describedby="basic-addon2"
                   v-model="CommentMsg">
            <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" @click="add();GetTime()">评论</button>
            </div>
        </div>




        <div>
            <ul>
                <li
                        class="list-group"
                        v-for="item in lists"
                        :key="item"
                        :class="{active:true}">
                    <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                        <div class="d-flex w-100 justify-content-between">
                            <h6 class="mb-1" id="on">{{msg}}</h6>
                            <small class="text-muted">{{currentdate}}</small>
                        </div>
                        <p class="mb-1" >{{item}}</p>

                    </a>
                </li>

            </ul>
        </div>
    </div>
</template>
<script>
    import store from '@/store'
    let list=[];
    let counters=0;
    function init() {
        if (localStorage.hasOwnProperty("counter")) {
            counters = localStorage.getItem("counter");
            for (let i = 0; i < counters; i++) {
                list[i] = localStorage.getItem("key" + i);
            }
        }
        else{
            counters=0
        }
    }
    init();
    export default {
        name: "NewsComments",
        store,
        data() {
            return {
                CommentMsg: '',
                 lists: list,
                currentdate: '',
                counter: counters,
                key: 'key',
                msg: store.state.userName
            }
        },
        methods: {
            add() {
                if (this.current === '') {
                    return
                }
                else {
                    this.lists.push(this.CommentMsg)
                    this.key = this.key + this.counter
                    this.counter++
                    localStorage.setItem('counter',this.counter)
                    localStorage.setItem(this.key, this.CommentMsg)
                    this.CommentMsg = ''
                    this.key = 'key'
                }

            },
            GetTime() {
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
            },
            }
    }

</script>

<style scoped>
li.active{
    width: 30cm;
    font-size: 8pt;
}
    div.active{
        font-size: 20pt;
    }
    p.active{
        /*font-size: 12pt;*/
        width: 100%;
        height: auto;
        word-wrap:break-word;
        word-break:break-all;
        overflow: hidden;
        font-size: 12pt;
        color: #323232;
        font-family: "微软雅黑";
    }
</style>
