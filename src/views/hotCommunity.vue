<template>
    <div style="display:flex;flex-direction:column;align-items: center;">
        <div class="row" style="width:1000px;margin-top:20px;">
            <div class="col-9" style="display: flex;flex-direction: column;align-items: center;">
                <div class="row" style="width:100%;padding-left:15px;padding-right:15px;height:100px;margin-bottom: 15px;">
                    <div style="display:flex;align-items: center;justify-content: center;padding-right:0px;" class="col-2">
                        <img style="width:80px;height:80px" src="https://picsum.photos/1024/480/?image=20">
                    </div>
                    <div style="display:flex;flex-direction:column;align-items: flex-start;justify-content: center;" class="col-6">
                        <div style="font-size:24px;font-weight: bold;margin-bottom:10px;">专家网红社群</div>
                        <p style="font-size: 14px;color:#969696;">收录了122篇帖子  1033人关注</p>
                    </div>
                    <div class="col-4" style="display:flex;align-items: center;justify-content: center;">
                        <div class="add_article" style="display:flex;justify-content:center;border:1px solid #10afef;border-radius: 40px;width:70px;margin-left:10px;margin-right:10px">
                            <b-link :to="{name:'editarticle'}" style="display:flex;font-size: 16px;padding:3px;color:#10afef">投贴</b-link>
                        </div>
                        <div class="addattention" style="display:flex;justify-content:center;background-color:#10afef;border:1px solid #10afef;border-radius: 40px;width:70px;margin-left:10px;margin-right:10px">
                            <b-link  style="display:flex;font-size: 16px;padding:3px;color:#ffffff;">+关注</b-link>
                        </div>
                    </div>
                </div>
                <div style="display:flex;width:100%;padding-left: 40px;padding-right: 15px;">
                    <el-tabs v-model="activeName" style="width:100%;" >
                        <el-tab-pane name="first">
                            <span slot="label" style="font-size:15px;"><i class="fa fa-book" style="margin-right: 5px"></i>全部</span>
                            <div style="width:100%">
                                <b-form-group>
                                    <b-form-radio-group
                                            v-model="selected1"
                                            :options="options"
                                            name="radio-inline1"
                                    ></b-form-radio-group>
                                </b-form-group>
                                <articleListMedia :articleList="articleList1"></articleListMedia>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane name="second">
                            <span slot="label" style="font-size:15px;"><i class="fa fa-gift" style="margin-right: 5px"></i>免费</span>
                            <div style="width:100%">
                                <b-form-group>
                                    <b-form-radio-group
                                            v-model="selected2"
                                            :options="options"
                                            name="radio-inline2"
                                    ></b-form-radio-group>
                                </b-form-group>
                                <articleListMedia :articleList="articleList1"></articleListMedia>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane name="third">
                            <span slot="label" style="font-size:15px;"><i class="fa fa-diamond" style="margin-right: 5px"></i>付费</span>
                            <div style="width:100%">
                                <b-form-group>
                                    <b-form-radio-group
                                            v-model="selected3"
                                            :options="options"
                                            name="radio-inline3"
                                    ></b-form-radio-group>
                                </b-form-group>
                                <articleListMedia :articleList="articleList2"></articleListMedia>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
            <div class="col-3" style="display: flex;flex-direction: column;align-items:flex-start;">
                <div style="border-bottom: 1px solid #c6c6c6;width:100%;padding-bottom: 20px;">
                    <div style="font-size:16px;color:#939393;margin-bottom: 10px;">社群公告</div>
                    <div style="font-size:14px;line-height: 20px;">区块链研习社专栏，专门探讨区块链技术与应用，相互协作，创造价值。感兴趣的添加助手微信进群：chainclub88</div>
                </div>
                <div style="display:flex;align-items: center;justify-items:flex-start;width:100%;border-bottom: 1px solid #c6c6c6;margin-top:20px;padding-bottom:20px;">
                    <div style="font-size: 16px;color:#939393;margin-right:10px;" >分享到</div>
                    <i class="fa fa-wechat " style="font-size:16px;margin-right:5px;"></i>
                    <i class="fa fa-weibo " style="font-size:16px;margin-right:5px;"></i>
                    <i class="fa fa-qq " style="font-size:16px;margin-right:5px;"></i>
                </div>

            </div>

        </div>

    </div>
</template>

<script>
    import articleListMedia from "../components/articleListMedia"
    import comMedia from "../components/communityMedia.vue"
    export default {
        name: "hotCommunity",
        components:{
            articleListMedia,
            comMedia,
        },
        data: function(){
            return{
                title_data:Array,
                selected1: 'first',
                selected2:'first',
                selected3:'first',
                options: [
                    { text: '全部', value: 'first' },
                    { text: '文字', value: 'second' },
                    { text: '图片', value: 'third' },
                    { text: '语音', value: 'fourth' },
                    { text: '视频', value: 'fifth' },
                ],
                activeName:"first",
                articleList1:[
                    {
                        id:'1',
                        title:"First Article",
                        com_img:"https://picsum.photos/1024/480/?image=10",
                        com_intro:"This is a wider card with supporting text below as a natural lead-in to additional content.This content is a little bit longer.",
                        author:"Shine",
                        mem_num:'1000+',
                    },
                    {
                        id:'2',
                        title:"Second Article",
                        com_img:"https://picsum.photos/1024/480/?image=102",
                        com_intro:"This is a wider card with supporting text below as a natural lead-in to additional content.This content is a little bit longer.",
                        author:"Shine",
                        mem_num:'1000+',
                    },
                    {
                        id:'3',
                        title:"Third Article",
                        com_img:"https://picsum.photos/1024/480/?image=120",
                        com_intro:"This is a wider card with supporting text below as a natural lead-in to additional content.This content is a little bit longer.",
                        author:"Shine",
                        mem_num:'1000+',
                    },
                    {
                        id:'4',
                        title:"Fourth Community",
                        com_img:"https://picsum.photos/1024/480/?image=85",
                        com_intro:"This is a wider card with supporting text below as a natural lead-in to additional content.This content is a little bit longer.",
                        author:"Shine",
                        mem_num:'1000+',
                    }
                ],
                articleList2:[
                    {
                        id:'1',
                        title:"First Article",
                        com_img:"https://picsum.photos/1024/480/?image=15",
                        com_intro:"This is a wider card with supporting text below as a natural lead-in to additional content.This content is a little bit longer.",
                        author:"Shine",
                        mem_num:'1000+',
                    },
                    {
                        id:'2',
                        title:"Second Article",
                        com_img:"https://picsum.photos/1024/480/?image=166",
                        com_intro:"This is a wider card with supporting text below as a natural lead-in to additional content.This content is a little bit longer.",
                        author:"Shine",
                        mem_num:'1000+',
                    },
                    {
                        id:'3',
                        title:"Third Article",
                        com_img:"https://picsum.photos/1024/480/?image=129",
                        com_intro:"This is a wider card with supporting text below as a natural lead-in to additional content.This content is a little bit longer.",
                        author:"Shine",
                        mem_num:'1000+',
                    },
                    {
                        id:'4',
                        title:"Fourth Article",
                        com_img:"https://picsum.photos/1024/480/?image=85",
                        com_intro:"This is a wider card with supporting text below as a natural lead-in to additional content.This content is a little bit longer.",
                        author:"Shine",
                        mem_num:'1000+',
                    }
                ],
                articleList3:[
                    {
                        id:'1',
                        title:"First Article",
                        com_img:"https://picsum.photos/1024/480/?image=87",
                        com_intro:"This is a wider card with supporting text below as a natural lead-in to additional content.This content is a little bit longer.",
                        author:"Shine",
                        mem_num:'1000+',
                    },
                    {
                        id:'2',
                        title:"Second Article",
                        com_img:"https://picsum.photos/1024/480/?image=42",
                        com_intro:"This is a wider card with supporting text below as a natural lead-in to additional content.This content is a little bit longer.",
                        author:"Shine",
                        mem_num:'1000+',
                    },
                    {
                        id:'3',
                        title:"Third Article",
                        com_img:"https://picsum.photos/1024/480/?image=126",
                        com_intro:"This is a wider card with supporting text below as a natural lead-in to additional content.This content is a little bit longer.",
                        author:"Shine",
                        mem_num:'1000+',
                    },
                    {
                        id:'4',
                        title:"Fourth Article",
                        com_img:"https://picsum.photos/1024/480/?image=11",
                        com_intro:"This is a wider card with supporting text below as a natural lead-in to additional content.This content is a little bit longer.",
                        author:"Shine",
                        mem_num:'1000+',
                    }
                ],
                communityList:[
                    {
                        id:'1',
                        title:"First Community",
                        com_img:"https://picsum.photos/1024/480/?image=10",
                        com_intro:"This is a wider card with supporting text below as a natural lead-in to additional content.This content is a little bit longer.",
                        author:"Shine",
                        mem_num:'1000+',
                    },
                    {
                        id:'2',
                        title:"Second Community",
                        com_img:"https://picsum.photos/1024/480/?image=102",
                        com_intro:"This is a wider card with supporting text below as a natural lead-in to additional content.This content is a little bit longer.",
                        author:"Shine",
                        mem_num:'1000+',
                    },
                    {
                        id:'3',
                        title:"Third Community",
                        com_img:"https://picsum.photos/1024/480/?image=120",
                        com_intro:"This is a wider card with supporting text below as a natural lead-in to additional content.This content is a little bit longer.",
                        author:"Shine",
                        mem_num:'1000+',
                    },
                    {
                        id:'4',
                        title:"Fourth Community",
                        com_img:"https://picsum.photos/1024/480/?image=85",
                        com_intro:"This is a wider card with supporting text below as a natural lead-in to additional content.This content is a little bit longer.",
                        author:"Shine",
                        mem_num:'1000+',
                    }
                ],
            }
        },
    }
</script>

<style scoped>

</style>
