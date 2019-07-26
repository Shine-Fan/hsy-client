<template>
    <ul style="list-style: none;padding:0px;width:100%;">
        <li v-for="(item,index) in articleList" :key="index" style="margin-top:20px;">
            <div class="row" style="display:flex;align-items:center;width:100%;margin:0px;margin-bottom:20px;">
                <div class="col-3" style="padding:0px;">
                    <b-link :to="{name:'newsdetail',params:{id:item.id}}"><img style="width:80%;height:105px;padding-left:0px" :src="item.com_img"></b-link>
                </div>
                <div class="col-9" style="display:flex;flex-direction:column;align-content:center;justify-items:center;padding:0px;">
                    <b-link :to="{name:'newsdetail',params:{id:item.id}}" style="color:black"><h5 style="">{{item.title}}</h5></b-link>
                    <div style="margin-bottom:8px;word-break: break-all;font-size:16px;color:#707070;line-height:20px;">{{item.com_intro}}</div>
                    <div style="">
                        <span style="font-size: 12px;color:#707070;margin-right:15px;">{{item.author}}</span>
                        <span>
                            <i class=" fa fa-user" style="color:#979797;font-size: 12px;"></i>
                            <span style="font-size: 12px;color:#707070;margin-right:10px;">{{item.mem_num}}+</span>
                        </span>
                        <b-link>
                            <i class=" fa fa-comment" style="color:#979797;font-size: 12px;"></i>
                            <span style="font-size: 12px;color:#707070;margin-right:10px;">评论</span>
                        </b-link>
                        <b-link>
                            <i class=" fa fa-heart" style="color:#979797;font-size: 12px;"></i>
                            <span style="font-size: 12px;color:#707070;margin-right:10px;">点赞</span>
                        </b-link>
                    </div>
                </div>
            </div>
            <div style="height:1px;width:100%;background-color:#abb1b9;"></div>
        </li>
    </ul>
</template>

<script>
    export default {
        name: "articleList.vue",
        props:{
            articleList:Array,
        }
    }
</script>

<style scoped>

</style>
