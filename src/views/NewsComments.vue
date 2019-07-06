<template>
    <div class="row" style="display:flex;justify-content: center">
        <h3 class="mt-3 pb-3 mb-4 font-italic border-bottom">
            新闻评论
        </h3>

        <div class="input-group mb-3">
            <input type="text"
                   class="form-control"
                   placeholder="请写下你的评论"
                   aria-label="Recipient's username"
                   aria-describedby="basic-addon2"
                   v-model="CommentMsg">
            <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" @click="add()">评论</button>
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
                            <h5 class="mb-1">姓名</h5>
                            <small class="text-muted">发布时间</small>
                        </div>
                        <p class="mb-1">{{item}}</p>

                    </a>
                </li>

            </ul>
        </div>
    </div>



</template>

<script>
    export default {
        name: "NewsComments",
     data(){
            return{
                CommentMsg:'',
                lists:[]
            }
     },
     methods:{
            add(){
                if(this.current===''){return}
                this.lists.push(this.CommentMsg)
                this.CommentMsg=''

            }
     }
    }
</script>

<style scoped>
li.active{
    width: 30cm;
    font-size: 10pt;
}
</style>
