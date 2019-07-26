<template>
    <div style="display:flex;flex-direction:column;justify-items:center;align-items:center;flex-wrap: nowrap;" >
        <div style="display:flex;flex-wrap: nowrap;width:1000px;margin-top:10px;margin-bottom:25px">
            <div style="display:flex;flex-wrap:nowrap;width:600px;">
                <b-link style="display:flex;flex-wrap:nowrap;width:600px;" @click="click_img()" >
                    <b-carousel
                            id="carousel-fade"
                            style="text-shadow: 0px 0px 2px #000;display: flex"
                            v-model="slide"
                            fade
                            indicators
                    >
                        <b-carousel-slide style="display:flex;height:350px;" v-for="(item,index) in slides_info" :key="index"
                                          :img_id="item.id"
                                          :caption="item.caption"
                                          :img-src="item.img_src"
                        >
                        </b-carousel-slide>
                    </b-carousel>
                </b-link>
            </div>
            <div  style="display:flex;margin-left:10px;width:400px">
                <el-tabs class="news_region" v-model="activeName">
                    <el-tab-pane label="新闻头条" name="news" >
                        <div style="display:flex;flex-direction:column;justify-content: center;">
                            <div v-for="(item,index) in newsList" :key="index" style="display:flex;flex-direction:column;justify-content:center;align-items:flex-end;height:60px;">
                                <div style="display:flex;align-items:center;width: 390px;margin-bottom:5px;">
                                    <span style="display:flex;margin-right:8px"><img style="height:48px;width:48px" :src="item.news_img"></span>
                                    <div style="height:48px">
                                        <b-link style="color:black;" :to="{name:'newsdetail',params:{id:item.id}}">
                                            <h5 style="margin:3px;">{{item.title}}</h5>
                                        </b-link>
                                        <div style="font-size: 13px;">{{item.text}}</div>
                                    </div>
                                </div>
                                <div style="display:flex;height:1px;width:330px;background-color: #abb1b9;"></div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="行情数据" name="info">
                        <div style="display:flex;flex-direction:column;justify-content: center;">
                            <div v-for="(item,index) in infoList" :key="index" style="display:flex;flex-direction:column;justify-content:center;align-items:flex-end;height:60px;">
                                <div style="display:flex;align-items:center;width: 390px;margin-bottom:5px;">
                                    <span style="display:flex;margin-right:8px"><img style="height:48px;width:48px" :src="item.news_img"></span>
                                    <div style="height:48px">
                                        <b-link style="color:black;" :to="{name:'newsdetail',params:{id:item.id}}">
                                            <h5 style="margin:3px;">{{item.title}}</h5>
                                        </b-link>
                                        <div style="font-size: 13px;">{{item.text}}</div>
                                    </div>
                                </div>
                                <div style="display:flex;height:1px;width:330px;background-color: #abb1b9;"></div>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
                <b-link :to="{name:activeName}" style="font-size:13px;width:50px;height:20px;margin-left:-50px;margin-top:12px;z-index:2">
                    更多>>
                </b-link>
            </div>
        </div>
        <div style="display:flex;justify-content: center;flex-direction: column;align-items:center;width:1000px;margin-bottom: 20px;">
            <div style="display:flex;align-items:center;background-color: #f8f9fa;border-left:5px solid #10afef;height:44px">
                <h4 style="margin-left:10px;margin-right:770px">官方交流社群</h4>
                <b-link style="font-size:15px;" :to="{name:'offiCommunity'}" >
                    更多>>
                </b-link>
            </div>
            <div style="display:flex;width:860px;">
<!--                <com-media :communityList="communityList"></com-media>-->
                <articleListMedia :articleList="articleList1"></articleListMedia>
            </div>
        </div>
        <div style="display:flex;justify-content: center;flex-direction: column;align-items:center;width:1000px;margin-bottom: 20px;">
            <div style="display:flex;align-items:center;background-color: #f8f9fa;border-left:5px solid #10afef;height:44px">
                <h4 style="margin-left:10px;margin-right:770px">专家网红社群</h4>
                <b-link style="font-size:15px;" :to="{name:'hotCommunity'}" >
                    更多>>
                </b-link>
            </div>
            <div style="display:flex;justify-items: center;width:860px;">
<!--                <com-media :communityList="communityList"></com-media>-->
                <articleListMedia :articleList="articleList2"></articleListMedia>
            </div>
        </div>
        <div style="display:flex;justify-content: center;flex-direction: column;align-items:center;width:1000px;margin-bottom: 20px;">
            <div style="display:flex;align-items:center;background-color: #f8f9fa;border-left:5px solid #10afef;height:44px;width:1000px">
                <h4 style="margin-left:10px;margin-right:770px">平台事物</h4>
            </div>
            <div class="row" style="display:flex;align-items:center;height:100px;width:1000px;margin-top:30px;">
                <div class="col-4" style="display:flex;justify-content:center;height:100px;align-items:center;border-right:1px solid #bcbcbc">
                    <i class="fa fa-group" style="font-size:30px;margin-right:10px;color:#42b983;"></i>
                    <b-link :to="{name:'applycommunity'}" style="font-size:20px;color:black">社群申请</b-link>
                </div>
                <div class="col-4" style="display:flex;justify-content:center;height:100px;align-items:center;border-right:1px solid #bcbcbc">
                    <i class="fa fa-book" style="font-size:30px;margin-right:10px;color:#10afef"></i>
                    <b-link style="font-size:20px;color:black">说明帮助</b-link>
                </div>
                <div class="col-4" style="display:flex;justify-content:center;height:100px;align-items:center;">
                    <i class="fa fa-envelope" style="font-size:30px;margin-right:10px;color:#fcfe2b"></i>
                    <b-link style="font-size:20px;color:black">投诉建议</b-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import articleListMedia from "../components/articleListMedia"
    export default {
        name: "MainPage.vue",
        components:{
            articleListMedia,
        },
        data: function(){
          return{
              slide:0,
              news_type:0,
              info_type:0,
              activeName:'news',
              slides_info:[
                  {
                      id:'1',
                      caption:"First slide",
                      img_src:"https://picsum.photos/1024/480/?image=20",
                  },
                  {
                      id:'2',
                      caption:"Second Slide",
                      img_src:"https://picsum.photos/1024/480/?image=12",
                  },
                  {
                      id:'3',
                      caption:"Third Slide",
                      img_src:"https://picsum.photos/1024/480/?image=22",
                  }
              ],
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
              newsList:[
                  {
                      id:'1',
                      title:"List-based media object",
                      text:"Cras sit amet nibh libero, in gravida nulla. Nulla vel me ...",
                      news_img:"https://picsum.photos/1024/480/?image=85",
                  },
                  {
                      id:'2',
                      title:"List-based media object",
                      text:"Cras sit amet nibh libero, in gravida nulla. Nulla vel me ...",
                      news_img:"https://picsum.photos/1024/480/?image=24",
                  },
                  {
                      id:'3',
                      title:"List-based media object",
                      text:"Cras sit amet nibh libero, in gravida nulla. Nulla vel me ...",
                      news_img:"https://picsum.photos/1024/480/?image=74",
                  },
                  {
                      id:'4',
                      title:"List-based media object",
                      text:"Cras sit amet nibh libero, in gravida nulla. Nulla vel me ...",
                      news_img:"https://picsum.photos/1024/480/?image=102",
                  },
                  {
                      id:'5',
                      title:"List-based media object",
                      text:"Cras sit amet nibh libero, in gravida nulla. Nulla vel me ...",
                      news_img:"https://picsum.photos/1024/480/?image=39",
                  },
              ],
              infoList:[
                  {
                      id:'1',
                      title:"List-based media object",
                      text:"Cras sit amet nibh libero, in gravida nulla. Nulla vel me ...",
                      news_img:"https://picsum.photos/1024/480/?image=74",
                  },
                  {
                      id:'2',
                      title:"List-based media object",
                      text:"Cras sit amet nibh libero, in gravida nulla. Nulla vel me ...",
                      news_img:"https://picsum.photos/1024/480/?image=24",
                  },
                  {
                      id:'3',
                      title:"List-based media object",
                      text:"Cras sit amet nibh libero, in gravida nulla. Nulla vel me ...",
                      news_img:"https://picsum.photos/1024/480/?image=85",
                  },
                  {
                      id:'4',
                      title:"List-based media object",
                      text:"Cras sit amet nibh libero, in gravida nulla. Nulla vel me ...",
                      news_img:"https://picsum.photos/1024/480/?image=82",
                  },
                  {
                      id:'5',
                      title:"List-based media object",
                      text:"Cras sit amet nibh libero, in gravida nulla. Nulla vel me ...",
                      news_img:"https://picsum.photos/1024/480/?image=58",
                  },
              ]
          }
        },
        methods:{
            click_img(){
                this.$router.push({name:'newsdetail',params:{id:this.slides_info[this.slide].id}})
            },
            click_com(id){
                this.$router.push({name:'comdetail',params:{id:id}})
            },
            to_news_type(flag,index) {
                if (flag == 1) {
                    this.news_type = index + 1;
                } else {
                    this.news_type = index + 8;
                }
                console.log(this.news_type)
            },

                // this.$ajax({
                //     method:'post',
                //     url:'106.15.192.168',
                //     header:"accept-content:json",
                //     data:{
                //         news_type:this.news_type,
                //     }
                // })
                //     .then(function(response){
                //         console.log(response)
                //         this.$router.push('/news');
                //     })

        }
    }
</script>

<style lang="scss">
    /*@import "../../node_modules/bootstrap/scss/bootstrap";*/
    .carousel-inner{
        display:flex;
        justify-content:flex-start;
    }
    .el-tabs__item{
        font-size:16px;
    }
    .news_region{
        .el-tabs__header {
            margin: 0 0 10px;
        }
        .el-tabs__header{
            .el-tabs__nav-wrap{
                .el-tabs__nav-scroll{
                    .el-tabs__nav{
                        .el-tabs__item{
                            font-size:16px;
                        }
                    }
                }
            }
        }
    }
    .list-group-item{
        display:flex !important;
        flex-grow:1;
    }
    .part_border{
        width:500px;
        height:1px;
        background-color: rgba(120, 125, 130, 0.47);
    }
    .list-group-item{
        margin-bottom: 0 !important;
        border-top-left-radius: 0rem !important;
        border-top-right-radius: 0rem !important;
        border-bottom-left-radius: 0rem !important;
        border-bottom-right-radius: 0rem !important;
        padding:0.86rem 1.25rem !important;
    }
</style>
