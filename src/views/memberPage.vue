<template>
  <div class="member-area">
    <member-bar v-for="(item,index) in memberList" :key="index" :img-src="item.src" :member-name="item.name"></member-bar>
  </div>
</template>

<script>
import memberBar from '../components/memberBar'
export default {
  name: 'memberPage.vue',
  components: { memberBar },
  data: function () {
    return {
      memberList: [
        {
          src: require('../assets/carrot.jpg'),
          name: '社群成员xxx'
        },
        {
          src: require('../assets/eggplant.png'),
          name: '社群成员xxx'
        },
        {
          src: require('../assets/tomato.jpg'),
          name: '社群成员xxx'
        },
        {
          src: require('../assets/carrot.jpg'),
          name: '社群成员xxx'
        },
        {
          src: require('../assets/eggplant.png'),
          name: '社群成员xxx'
        },
        {
          src: require('../assets/tomato.jpg'),
          name: '社群成员xxx'
        },
        {
          src: require('../assets/carrot.jpg'),
          name: '社群成员xxx'
        },
        {
          src: require('../assets/eggplant.png'),
          name: '社群成员xxx'
        },
        {
          src: require('../assets/tomato.jpg'),
          name: '社群成员xxx'
        },
        {
          src: require('../assets/carrot.jpg'),
          name: '社群成员xxx'
        },
        {
          src: require('../assets/eggplant.png'),
          name: '社群成员xxx'
        },
        {
          src: require('../assets/tomato.jpg'),
          name: '社群成员xxx'
        }
      ]
    }
  }
}
</script>

<style scoped>
  .member-area{
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    overflow: scroll;
  }
  .member-area::-webkit-scrollbar{
    display: none;
  }

</style>
