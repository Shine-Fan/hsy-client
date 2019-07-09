<template>
    <div class="row" style="display:flex;justify-content: center">
        <div class="News">
            <h3 class="mt-3 pb-3 mb-4 font-italic border-bottom">
                具体的新闻页面
            </h3>>
        </div>
        <h5 class="mt-3 pb-3 mb-4 font-italic border-bottom">
            新闻评论
        </h5>

        <div class="input-group mb-3">
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
                            <h5 class="mb-1" id="on">{{msg}}</h5>
                            <small class="text-muted">{{currentdate}}</small>
                        </div>
                        <p class="mb-1">{{item}}</p>

                    </a>
                </li>

            </ul>
        </div>
    </div>
</template>
<script>
    import store from '@/store'
    export default {
        name: "NewsComments",
        store,
        data() {
            return {
                CommentMsg: '',
                lists: [],
                currentdate: '',
                counter: 0,
                key: 'key',
                msg: store.state.userName
            }
        },
        methods: {
            add() {
                if (this.current === '') {
                    return
                }
                this.lists.push(this.CommentMsg)
                this.key = this.key + this.counter
                this.counter++
                localStorage.setItem('counter',this.counter)
                localStorage.setItem('key', this.CommentMsg)
                this.CommentMsg = ''
                this.key = 'key'
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
    font-size: 10pt;
}
</style>
