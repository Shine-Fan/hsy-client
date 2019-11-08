<template>
  <div style="position:absolute;top:0;height:100%;background-color:#ececec;overflow:scroll;">
    <div class="title">
      <div class="title-img">
        <img src="../assets/news7.jpg" >
      </div>
      <div class="title-text">
        <div style="font-size:1.1rem">社群名称</div>
        <div style="font-size:0.9rem;color:gray">社群种类</div>
      </div>
    </div>
    <div class="member">
      <div class="member-title">
        <div style="width:60%;padding-left:1.5rem;">
          社群成员
        </div>
        <div style="position:absolute;right:1rem;">
          <router-link to="/member_page" style="color:#9c9c9c">
            <span>共549人&nbsp;&nbsp;&nbsp;</span>
            <i class="fa fa-angle-right" style="font-size:1.2rem"></i>
          </router-link>
        </div>
      </div>
      <div class="member-content">
        <communityIcon v-for="index in 10" :key="index" :imgSrc="member[index-1].src" :name="member[index-1].name"></communityIcon>
      </div>
    </div>
    <div class="introduction">
      <div class="introduction-title">
        社群简介
      </div>
      <div class="introduction-content">
        此处为社群简介内容！
      </div>
    </div>
    <div v-if="!isMember" class="intoChat">
      <div class="intoChatBtn">
        申请加入群聊
      </div>
    </div>
    <div v-if="isMember" class="intoChat">
      <div class="intoChatBtn">
        进入社群聊条
      </div>
    </div>
  </div>
</template>

<script>
import communityIcon from '../components/communityIcon'
export default {
  name: 'communityInfo.vue',
  components: {
    communityIcon
  },
  data: function () {
    return {
      isMember: false,
      member: [
        {
          src: require('../assets/tomato.jpg'),
          name: '阳光农民'
        },
        {
          src: require('../assets/tomato.jpg'),
          name: '阳光农民'
        },
        {
          src: require('../assets/tomato.jpg'),
          name: '阳光农民'
        },
        {
          src: require('../assets/tomato.jpg'),
          name: '阳光农民'
        },
        {
          src: require('../assets/tomato.jpg'),
          name: '阳光农民'
        }, {
          src: require('../assets/tomato.jpg'),
          name: '阳光农民'
        }, {
          src: require('../assets/tomato.jpg'),
          name: '阳光农民'
        },
        {
          src: require('../assets/tomato.jpg'),
          name: '阳光农民'
        },
        {
          src: require('../assets/tomato.jpg'),
          name: '阳光农民'
        }, {
          src: require('../assets/tomato.jpg'),
          name: '阳光农民'
        }
      ]
    }
  },
  created () {
    var id = this.$route.query.id
  }
}
</script>

<style scoped>
  .title{
    width:100%;
    height:6.5rem;
    display:flex;
    border-top:7px solid #ececec;
    border-bottom:7px solid #ececec;
    background-color:white;
  }
  .title-img{
    width:30%;
    height:100%;
    display:flex;
    align-items:center;
    padding-left:1.5rem
  }
  .title-img img{
    height:4.3rem;
    width:4.3rem;
    border-radius: 0.1rem;
  }
  .title-text{
    width:70%;
    height:100%;
    padding:0.8rem 0.5rem;
    display:flex;
    flex-direction:column;
    justify-content: space-around;
  }
  .member{
    width:100%;
    border-bottom:7px solid #ececec;
    background-color:white;
  }
  .member-title{
    height:3rem;
    display:flex;
    align-items: center;
    border:1px solid #ececec;
  }
  .member-content{
    display:flex;
    width:95%;
    margin:auto;
    flex-wrap:wrap; /*自动换行*/
    padding:1rem 0;
  }
  .introduction{
    background-color:white;
    border-bottom:1px solid #ececec
  }
  .introduction-title{
    height:3rem;
    display:flex;
    align-items: center;
    border:1px solid #ececec;
    padding-left:1.5rem;
  }
  .introduction-content{
    width:100%;
    padding:1.5rem;
    line-height:1.5rem;
    color:rgb(156, 156, 156);
    word-break:break-all;
  }
  .intoChat{
    width:100%;
    height:7rem;
    display:flex;
    justify-content: center;
    padding:2rem 0;
    background-color:transparent;
  }
  .intoChatBtn{
    width:80%;
    height:80%;
    background-color:#28a745;
    font-size:1.1rem;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color:white;
    border-radius:0.2rem;
    display:flex;
    justify-content: center;
    align-items: center;
    -moz-box-shadow: 2px 2px 5px #28a745;
    -webkit-box-shadow: 2px 2px 5px #28a745;
    box-shadow:2px 2px 5px #28a745;
  }
</style>
