<template>
    <div style="display:flex;align-content:center;justify-content:center;flex-direction: column;">
        <div class="row" style="display:flex;justify-content: center">
            <h3 class="mt-3 pb-3 mb-4 font-italic border-bottom">
                新闻头条
            </h3>
        </div>
        <div style="display:flex;align-content:center;justify-content: center;">
            <b-tabs pills card vertical content-class="mt-3" style="width:1000px;">
                <b-tab  class="news_dis_style" :active="!index" v-for="(item,index) in news_type_names" :title="item" :key="index">
                    <div>
                        <ul class="list-unstyled">
                            <b-media tag="li" v-for="(item,index) in text_model" :key="index" class="my-3"
                                     @click="jump()">
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
        </div>
    </div>

</template>

<script>
// @ is an alias to /src
import Vue from "vue";
import axios from "axios";
Vue.use(axios);
export default {
  name: 'news',
  data: function() {
      return {
          news_type_names:["热点资讯","三农快讯","政策法规","农资趣事","打假专区","人物周刊","展会信息","农资企业"],
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
      jump(){
          this.$router.push({path:'/comments'})



      }
    }
  // mounted() {
  //     this.$ajax
  //         .get('https://api.coindesk.com/v1/bpi/currentprice.json')
  //         .then(response => (this.info = response))
  // }
}
</script>

<style lang="scss">
    @import "../../node_modules/bootstrap/scss/bootstrap";
    .tab-content{
        margin-left:1rem;
    }

    .news_dis_style{
        margin-top:-2rem;
        padding:0 !important;
    }
</style>
