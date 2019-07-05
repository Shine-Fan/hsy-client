<template>
    <div style="display:flex;flex-direction:column;justify-content:center;flex-wrap: nowrap;" >
        <div style="display:flex;justify-content:center;flex-wrap: nowrap">
            <div style="display:flex;flex-wrap:nowrap;width:1000px">
                <b-carousel
                        id="carousel-fade"
                        style="text-shadow: 0px 0px 2px #000;display: flex"
                        fade
                        indicators
                >
                    <b-carousel-slide style="display:flex" v-for="(item,index) in slides_info" :key="index"
                            :caption="item.caption"
                            :img-src="item.img_src"
                    ></b-carousel-slide>
                </b-carousel>
            </div>
<!--            <div style="display:flex;" class="overflow-auto">-->
<!--                <b-list-group>-->
<!--                    <b-list-group-item href="#" @click="to_news_type(2,index)" class="list-group-item" v-for="(item,index) in info_type_names1" :key="index">{{item}}</b-list-group-item>-->
<!--                </b-list-group>-->
<!--            </div>-->
        </div>
        <div style="display:flex;justify-content: center;flex-direction: column">
            <div style="display:flex;justify-content: center;flex-direction: column;flex-wrap: nowrap;margin-top:3rem">
                <div class="row" style="display:flex;justify-content: center">
                    <h3 class="pb-3 mb-4 font-italic border-bottom">
                        交流社群
                    </h3>
                </div>
                <div style="display:flex;justify-content:center;flex-wrap: nowrap">
                    <b-tabs content-class="mt-3" align="left" style="width:1000px;">
                        <b-tab v-for="(item,index) in community_names" :key="index" :title="item">
                            <div>
                                <b-card-group deck>
                                    <b-card v-for="(item,index) in community_info" :title="item.title" :img-src="item.img_src" img-alt="Image" img-top>
                                        <b-card-text>
                                            {{item.text}}
                                        </b-card-text>
                                        <div slot="footer" style="display:flex;justify-content: flex-end"><button class="btn-primary">详情>></button></div>
                                    </b-card>
                                </b-card-group>
                            </div>
                        </b-tab>
                    </b-tabs>
                    <a href="#" style="height:40px;margin:0.5rem 0 0 -4rem">更多>></a>
                </div>
            </div>
            <div style="display:flex;justify-content: center;flex-direction: column;flex-wrap: nowrap;margin-top:3rem">
                <div class="row" style="display:flex;justify-content: center;">
                    <h3 class="pb-3 mb-4 font-italic border-bottom">
                        新闻头条
                    </h3>
                </div>
                <div style="display:flex;justify-content:center;">
                    <b-tabs content-class="mt-3" align="left" style="width:1000px">
                        <b-tab v-for="(item,index) in news_type_names" :key="index" :title="item">
                            <div>
                                <ul class="list-unstyled">
                                    <b-media tag="li" v-for="(item,index) in text_model" :key="index" class="my-3">
                                        <b-img slot="aside" blank blank-color="#abc" width="64" alt="placeholder" src="https://picsum.photos/300/150/?image=41"></b-img>
                                        <h5 class="mt-0 mb-1">{{item.title}}</h5>
                                        <p class="mb-0">
                                            {{item.text}}
                                        </p>
                                    </b-media>
                                </ul>
                            </div>
                        </b-tab>
                    </b-tabs>
                    <a href="#" style="height:40px;margin:0.5rem 0 0 -4rem">更多>></a>
                </div>
            </div>
            <div style="display:flex;justify-content: center;flex-direction: column;flex-wrap: nowrap;margin-top:3rem">
                <div class="row" style="display:flex;justify-content: center">
                    <h3 class="pb-3 mb-4 font-italic border-bottom">
                        行情数据
                    </h3>
                </div>
                <div style="display:flex;justify-content:center;">
                    <b-tabs content-class="mt-3" align="left" style="width:1000px">
                        <b-tab v-for="(item,index) in info_type_names" :key="index" :title="item">
                            <div>
                                <ul class="list-unstyled">
                                    <b-media tag="li" v-for="(item,index) in text_model" :key="index" class="my-3">
                                        <b-img slot="aside" blank blank-color="#abc" width="64" alt="placeholder" src="https://picsum.photos/300/150/?image=41"></b-img>
                                        <h5 class="mt-0 mb-1">{{item.title}}</h5>
                                        <p class="mb-0">
                                            {{item.text}}
                                        </p>
                                    </b-media>
                                </ul>
                            </div>
                        </b-tab>
                    </b-tabs>
                    <a href="#" style="height:40px;margin:0.5rem 0 0 -4rem">更多>></a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MainPage.vue",
        data: function(){
          return{
              news_type:0,
              info_type:0,
              news_type_names1:["热点资讯","三农快讯","政策法规","农资趣事","打假专区","人物周刊","展会信息"],
              info_type_names1:["每日行情","价格走势","趋势预测","价格预测","价格地图","产量价格","农资企业"],
              news_type_names:["热点资讯","三农快讯","政策法规","农资趣事","打假专区","人物周刊","展会信息","农资企业"],
              info_type_names:["每日行情","价格走势","趋势预测","价格预测","价格地图","产量价格"],
              community_names:["农技交流","行情交流","农资产品"],
              slides_info:[
                  {
                      caption:"First slide",
                      img_src:"https://picsum.photos/1024/480/?image=10",
                  },
                  {
                      caption:"Second Slide",
                      img_src:"https://picsum.photos/1024/480/?image=12",
                  },
                  {
                      caption:"Third Slide",
                      img_src:"https://picsum.photos/1024/480/?image=22",
                  }

              ],
              community_info:[
                  {
                      title:"Title",
                      img_src:"https://picsum.photos/300/300/?image=41",
                      text:"This is a wider card with supporting text below as a natural lead-in to additional content.\n" +
                          "                                            This content is a little bit longer."
                  },
                  {
                      title:"Title",
                      img_src:"https://picsum.photos/300/300/?image=41",
                      text:"This is a wider card with supporting text below as a natural lead-in to additional content.\n" +
                          "                                            This content is a little bit longer."
                  },
                  {
                      title:"Title",
                      img_src:"https://picsum.photos/300/300/?image=41",
                      text:"This is a wider card with supporting text below as a natural lead-in to additional content.\n" +
                          "                                            This content is a little bit longer."
                  },

              ],
              text_model:[
                  {
                      title:"List-based media object",
                      text:"Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.\n" +
                          "                                        Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc\n" +
                          "                                        ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.",
                  },
                  {
                      title:"List-based media object",
                      text:"Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.\n" +
                          "                                        Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc\n" +
                          "                                        ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.",
                  },
                  {
                      title:"List-based media object",
                      text:"Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.\n" +
                          "                                        Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc\n" +
                          "                                        ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.",
                  },
                  {
                      title:"List-based media object",
                      text:"Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.\n" +
                          "                                        Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc\n" +
                          "                                        ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.",
                  },
              ]
          }
        },
        methods:{
            to_news_type(flag,index){
                if (flag == 1){
                    this.news_type = index + 1;
                }
                else{
                    this.news_type = index +8;
                }
                console.log(this.news_type)
                // this.$ajax({
                //     method:'post',
                //     url:'',
                //     header:"accept-content:json;jwt-token:",
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
    }
</script>

<style scoped lang="scss">
    @import "../../node_modules/bootstrap/scss/bootstrap";
    .carousel-inner{
        display:flex;
        justify-content:flex-start;
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
