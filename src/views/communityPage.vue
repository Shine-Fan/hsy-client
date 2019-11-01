<template>
  <div>
    <div v-if="isOption1" class="option1">
      <div style="width:30%;height:100%" @click="confirmOption1"></div>
      <div class="option1-content">
        <div style="width:90%">
          <div>
            <div style="font-size:1.1rem;font-weight:bold;margin:0.25rem 0;">社群大类</div>
            <div style="display:flex;justify-content: space-between;margin:0.8rem 0;color:slategray;">
              <div :class="{'option1-active':category === 1}" style="padding:0.4rem 0.5rem;background-color:rgb(240, 240, 240);border-radius:0.4rem;overflow: hidden;white-space: nowrap;text-overflow:ellipsis;" @click="changeCategory(1)">官方交流群</div>
              <div :class="{'option1-active':category ===2}" style="padding:0.4rem 0.5rem;background-color:rgb(240, 240, 240);border-radius:0.4rem;overflow: hidden;white-space: nowrap;text-overflow:ellipsis;" @click="changeCategory(2)">专家网红群</div>
            </div>
          </div>
          <div>
            <div style="font-size:1.1rem;font-weight:bold;margin:0.25rem 0;">社群级别</div>
            <div style="display:flex;justify-content: space-around;margin:0.8rem 0;color:slategray;">
              <div :class="{'option1-active':payment === 1}" style="padding:0.4rem 0.5rem;background-color:rgb(240, 240, 240);border-radius:0.4rem;" @click="changePayment(1)">付费精品</div>
              <div :class="{'option1-active':payment ===2}" style="padding:0.4rem 0.5rem;background-color:rgb(240, 240, 240);border-radius:0.4rem;" @click="changePayment(2)">免费大众</div>
            </div>
          </div>
        </div>
        <div style="position:absolute;bottom:0;width:100%;height:2.5rem;line-height:2.5rem;text-align:center;font-weight:bold;letter-spacing:0.2rem">
          <div class="clear" style="display:inline-block;width:35%;border:1px solid lightgray;" @click="clearOption1">清空</div>
          <div class="confirm" style="display:inline-block;width:65%;border:1px solid lightgray;background-color:#28a745;color:white;" @click="confirmOption1">完成选择</div>
        </div>
      </div>
    </div>
    <div class="main-content" style="position:absolute;top:0;width:100%;height:100%;overflow:scroll">
      <div style="position:fixed;top:0;width:100%;background-color:white;z-index:1;padding-bottom:0.25rem;border-bottom:0.2rem solid lightgray">
        <div class="layer1">
          <div style="width:88%">
            <div class="layer1-left">
              <div class="layer1-item" v-for="(item,index) in chooseBarContent"
                   :key="index"
                   :class="{'active1':isActive1==index}"
                   @click="changeStatus(index,item.section.id,1)"
              >{{item.section.name}}</div>
            </div>
          </div>
          <div style="width:1px;height:2rem;background-color:gray"></div>
          <div class="layer1-right" @click="option1">
            <i class="fa fa-bars"></i>
          </div>
        </div>
        <div class="layer2">
          <div style="width:90%">
            <div class="layer2-left">
              <div class="layer2-item" v-for="(item,index) in chooseBarContent[isActive1].childs"
                   :key="index"
                   :class="{'active2':isActive2 == index}"
                   @click="changeStatus(index,item.section.id,2)"
              >{{item.section.name}}
              </div>
            </div>
          </div>
          <div style="width:10%;display: flex;align-items: center">
            <div  :class="(isActive2 !== -1 &&chooseBarContent[isActive1].childs[isActive2].childs.length !== 0) ? 'option2-active':'option2-no-active'" class="layer2-right" @click="option2($event)">
              <i v-if="!isOption2" class="fa fa-angle-down"></i>
              <i v-if="isOption2" class="fa fa-angle-up"></i>
            </div>
          </div>
        </div>
        <div v-if="isOption2" class="layer3">
          <div v-for="(item,index) in chooseBarContent[isActive1].childs[isActive2].childs"
               :key="index"
               style="margin:0.25rem 1rem;padding:0.1rem 0.5rem;white-space: nowrap;border:1px solid #bfbfbf;border-radius: 1rem;"
               @click="changeStatus(index,item.section.id,3)"
          >{{item.section.name}}</div>
        </div>
      </div>
      <div style="width:100%;height:6.8rem"></div>
      <div class="layer4">
        <div class="layer4-content">
          <communityBar v-for="(item, index) in communityBarContent"
                        :key="index"
                        :item="item"
                        @toCertainCommuntiy="toCertainCommunity"
          ></communityBar>  <!--要接收从子组件传来的值，函数名后面就不要加括号-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import communityBar from '../components/communityBar'
export default {
  name: 'community.vue',
  components: {
    communityBar
  },
  data: function () {
    return {
      category: -1,
      payment: -1,
      isActive1: 0, // 第一选择
      isActive2: -1, // 第二选择
      chooseBarContent: [
        {
          section: {
            id: 1,
            name: '农技交流',
            ownerId: 1, // 群主id
            rank: 1,
            parent: 0,
            icon: '',
            whoRead: 0,
            accessRoles: 0,
            accessPermissionCode: '',
            status: 0
          },
          childs: [
            {
              section: {
                id: 11,
                name: '病害',
                ownerId: 1, // 群主id
                rank: 1,
                parent: 1,
                icon: '',
                whoRead: 0,
                accessRoles: 0,
                accessPermissionCode: '',
                status: 0
              },
              childs: [
                {
                  section: {
                    id: 111,
                    name: '蔬菜',
                    ownerId: 1, // 群主id
                    rank: 1,
                    parent: 11,
                    icon: '',
                    whoRead: 0,
                    accessRoles: 0,
                    accessPermissionCode: '',
                    status: 0
                  },
                  childs: []
                },
                {
                  section: {
                    id: 112,
                    name: '果树',
                    ownerId: 1, // 群主id
                    rank: 1,
                    parent: 11,
                    icon: '',
                    whoRead: 0,
                    accessRoles: 0,
                    accessPermissionCode: '',
                    status: 0
                  },
                  childs: []
                },
                {
                  section: {
                    id: 113,
                    name: '大田作物',
                    ownerId: 1, // 群主id
                    rank: 1,
                    parent: 11,
                    icon: '',
                    whoRead: 0,
                    accessRoles: 0,
                    accessPermissionCode: '',
                    status: 0
                  },
                  childs: []
                },
                {
                  section: {
                    id: 114,
                    name: '药用植物',
                    ownerId: 1, // 群主id
                    rank: 1,
                    parent: 11,
                    icon: '',
                    whoRead: 0,
                    accessRoles: 0,
                    accessPermissionCode: '',
                    status: 0
                  },
                  childs: []
                },
                {
                  section: {
                    id: 115,
                    name: '林木及草坪',
                    ownerId: 1, // 群主id
                    rank: 1,
                    parent: 11,
                    icon: '',
                    whoRead: 0,
                    accessRoles: 0,
                    accessPermissionCode: '',
                    status: 0
                  },
                  childs: []
                }
              ]
            },
            {
              section: {
                id: 12,
                name: '虫害',
                ownerId: 1, // 群主id
                rank: 1,
                parent: 1,
                icon: '',
                whoRead: 0,
                accessRoles: 0,
                accessPermissionCode: '',
                status: 0
              },
              childs: []
            },
            {
              section: {
                id: 13,
                name: '草害',
                ownerId: 1, // 群主id
                rank: 1,
                parent: 1,
                icon: '',
                whoRead: 0,
                accessRoles: 0,
                accessPermissionCode: '',
                status: 0
              },
              childs: []
            }
          ]
        },
        {
          section: {
            id: 2,
            name: '行情交流',
            ownerId: 1, // 群主id
            rank: 1,
            parent: 0,
            icon: '',
            whoRead: 0,
            accessRoles: 0,
            accessPermissionCode: '',
            status: 0
          },
          childs: [
            {
              section: {
                id: 21,
                name: '粮食',
                ownerId: 1, // 群主id
                rank: 1,
                parent: 2,
                icon: '',
                whoRead: 0,
                accessRoles: 0,
                accessPermissionCode: '',
                status: 0
              },
              childs: []
            },
            {
              section: {
                id: 22,
                name: '经济作物',
                ownerId: 1, // 群主id
                rank: 1,
                parent: 2,
                icon: '',
                whoRead: 0,
                accessRoles: 0,
                accessPermissionCode: '',
                status: 0
              },
              childs: []
            },
            {
              section: {
                id: 23,
                name: '其他作物',
                ownerId: 1, // 群主id
                rank: 1,
                parent: 2,
                icon: '',
                whoRead: 0,
                accessRoles: 0,
                accessPermissionCode: '',
                status: 0
              },
              childs: []
            }
          ]
        },
        {
          section: {
            id: 3,
            name: '农资产品',
            ownerId: 1, // 群主id
            rank: 1,
            parent: 0,
            icon: '',
            whoRead: 0,
            accessRoles: 0,
            accessPermissionCode: '',
            status: 0
          },
          childs: [
            {
              section: {
                id: 31,
                name: '机械',
                ownerId: 1, // 群主id
                rank: 1,
                parent: 3,
                icon: '',
                whoRead: 0,
                accessRoles: 0,
                accessPermissionCode: '',
                status: 0
              },
              childs: []
            },
            {
              section: {
                id: 32,
                name: '农药',
                ownerId: 1, // 群主id
                rank: 1,
                parent: 3,
                icon: '',
                whoRead: 0,
                accessRoles: 0,
                accessPermissionCode: '',
                status: 0
              },
              childs: []
            },
            {
              section: {
                id: 33,
                name: '化肥',
                ownerId: 1, // 群主id
                rank: 1,
                parent: 3,
                icon: '',
                whoRead: 0,
                accessRoles: 0,
                accessPermissionCode: '',
                status: 0
              },
              childs: []
            },
            {
              section: {
                id: 34,
                name: '种子',
                ownerId: 1, // 群主id
                rank: 1,
                parent: 3,
                icon: '',
                whoRead: 0,
                accessRoles: 0,
                accessPermissionCode: '',
                status: 0
              },
              childs: []
            },
            {
              section: {
                id: 35,
                name: '真假辨识',
                ownerId: 1, // 群主id
                rank: 1,
                parent: 3,
                icon: '',
                whoRead: 0,
                accessRoles: 0,
                accessPermissionCode: '',
                status: 0
              },
              childs: []
            }
          ]
        }
      ],
      communityBarContent: [
        {
          sectionId: 1,
          groupName: '番茄群',
          src: require('../assets/tomato.jpg'), // 图片存放于assets中需要require,存放于static中则不需要
          summary: '多C多漂亮',
          likes: 999
        },
        {
          sectionId: 2,
          groupName: '玉米群',
          src: require('../assets/corn.jpg'),
          summary: '种子不选好，满地长稗草',
          likes: 499
        },
        {
          sectionId: 3,
          groupName: '茄子群',
          src: require('../assets/eggplant.png'),
          summary: '一要质，而要量，田间选种不上当一要质，而要量，田间选种不上当一要质，而要量，田间选种不上当',
          likes: 874
        },
        {
          sectionId: 4,
          groupName: '胡萝卜群',
          src: require('../assets/carrot.jpg'), // 图片存放于assets中需要require,存放于static中则不需要
          summary: '多C多漂亮',
          likes: 999
        },
        {
          sectionId: 5,
          groupName: '玉米群',
          src: require('../assets/corn.jpg'),
          summary: '种子不选好，满地长稗草',
          likes: 499
        },
        {
          sectionId: 6,
          groupName: '茄子群',
          src: require('../assets/eggplant.png'),
          summary: '一要质，而要量，田间选种不上当一要质，而要量，田间选种不上当一要质，而要量，田间选种不上当',
          likes: 874
        },
        {
          sectionId: 7,
          groupName: '番茄群',
          src: require('../assets/tomato.jpg'), // 图片存放于assets中需要require,存放于static中则不需要
          summary: '多C多漂亮',
          likes: 999
        },
        {
          sectionId: 8,
          groupName: '玉米群',
          src: require('../assets/corn.jpg'),
          summary: '种子不选好，满地长稗草',
          likes: 499
        },
        {
          sectionId: 9,
          groupName: '茄子群',
          src: require('../assets/eggplant.png'),
          summary: '一要质，而要量，田间选种不上当一要质，而要量，田间选种不上当一要质，而要量，田间选种不上当',
          likes: 874
        }
      ],
      isOption2: false, // 第三类选择
      isOption1: false // 细分选择

    }
  },
  methods: {
    changeStatus: function (index, id, num) {
      if (num === 1) {
        this.isActive1 = index
        this.isActive2 = -1
        this.isActive3 = -1
        this.requestCommunityItem(id)
      } else if (num === 2) {
        if (this.isActive2 !== index || this.isActive2 === -1) {
          this.isActive2 = index
          this.isActive3 = -1
          this.requestCommunityItem(id)
        } else {
          this.isActive2 = -1
          this.isActive3 = -1
          this.requestCommunityItem(this.chooseBarContent[this.isActive1].section.id) // 取消子节点点击，则获取父id
        }
      } else if (num === 3) {
        this.isActive3 = index
        this.isOption2 = false
        this.requestCommunityItem(id)
      }
    },
    requestCommunityItem: function (id) { // 根据id,返回属于该id的社群列表
      console.log(id)
      this.$axios({ // 待改：请求属于某id的所有社群接口有问题！！！
        method: 'post',
        url: 'http://106.15.192.168/group/findBySectionRootId',
        headers: { 'content-type': 'application/json',
          'token': this.$store.state.token
        },
        data: {
          sectionId: id
        }
      }).then((response) => {
        // this.communityBarContent = response.data.data
        console.log(response)
      })
    },
    option1: function () {
      this.isOption1 = !this.isActive1
    },
    option2: function (e) {
      if (this.isActive2 !== -1 && this.chooseBarContent[this.isActive1].childs[this.isActive2].childs.length !== 0 && this.isOption2 === false) {
        this.isOption2 = true
      } else {
        this.isOption2 = false
      }
    },
    changeCategory: function (index) {
      if (this.category === index) {
        this.category = -1
      } else {
        this.category = index
      }
    },
    changePayment: function (index) {
      if (this.payment === index) {
        this.payment = -1
      } else {
        this.payment = index
      }
    },
    clearOption1: function () {
      this.category = -1
      this.payment = -1
    },
    confirmOption1: function () {
      this.isOption1 = !this.isOption1
    },
    toCertainCommunity: function (id) {
      // console.log(id)
      this.$router.push({ path: '/community_detail', query: { id: id } })
    }
  },
  created () {
    this.$axios({
      method: 'get',
      url: 'http://106.15.192.168/section/tree',
      headers: { 'content-type': 'application/json',
        'token': this.$store.state.token
      }
    }).then((response) => {
      this.chooseBarContent = response.data.data
      // console.log(response)
      console.log('获取板块树成功')
      this.$axios({ // 待改：请求属于某id的所有社群接口有问题！！！
        method: 'post',
        url: 'http://106.15.192.168/group/findBySectionRootId',
        headers: { 'content-type': 'application/json',
          'token': this.$store.state.token
        },
        data: {
          sectionId: 5
        }
      }).then((response) => {
        // this.communityBarContent = response.data.data
        console.log(response)
      })
    })
  }
}
</script>

<style scoped>
  .clear:active {
    background-color:lightgray;
  }
  .confirm:active {  /*添加点击效果*/
    background-color: #227f3c !important;
    color:white !important;
  }
  .option1{
    position:absolute;
    top:0;
    width:100%;
    height:100%;
    background-color:rgba(0,0,0,0.5);  /*通过该方式,父元素设置为了透明,而子元素将不受影响*/
    z-index:10;
  }
  .option1-content{
    position:absolute;
    right:0;
    top:0;
    width:70%;
    height:100%;
    background-color:white;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding:1rem 0;
  }
  .option1-active{
    background-color:white !important;
    border:1px solid #28a745;
    color:#28a745;
  }
  .main-content::-webkit-scrollbar{ /*对整个页面设置position:absolute;(不设置则不起作用！！)top:0;width:100%;height:100%;overflow:scroll，则滚动条只在下层部分显示，也可以修改滚动条的可见性*/
    display: none;
  }
  .layer1{
    display:flex;
    align-items: center;
    border-bottom: 1px solid rgba(128,106,92,0.24)
  }
  .layer1-left{
    font-size:1.1rem;
    color:#63696fe3;
    height:3rem;
    display: flex;
    align-items: center;
    margin:0 0.5rem;
    white-space: nowrap;
    overflow-x: auto;
  }
  .layer1-left::-webkit-scrollbar{  /*去掉滚动条效果*/
    display:none;
  }
  .layer1-item{
    margin:0 0.6rem;
    padding:0.6rem 0;
  }
  .active1{
    color: #28a745;
    border-bottom: 2px solid #28a745;
  }
  .layer1-right{
    width:10%;
    font-size:1.5rem;
    color:#28a745;
    display: flex;
    justify-content: center;
    align-items: center
  }
  .layer2{
    display:flex;
    align-item:center;
  }
  .layer2-left{
    display:flex;
    align-items:center;
    font-size:1rem;
    height:3rem;
    white-space: nowrap;
    overflow-x: auto;
    margin:0 0.5rem;
  }
  .layer2-left::-webkit-scrollbar{
    display: none;
  }
  .layer2-item{
    border:1px solid #28a745;
    padding:0.1rem 0.75rem;
    border-radius:1rem;
    margin: 0 0.3rem;
    color:#28a745;
  }
  .active2{
    color:white;
    background-color:#28a745;
  }
  .layer2-right{
    display:flex;
    justify-content:center;
    align-items:center;
    width:1.2rem;
    height:1.2rem;
    border-radius:50%;
  }
  .option2-no-active{
    border:1px solid gray;
    color:gray;
  }
  .option2-active{
    border:2px solid #28a745;
    color:#28a745;
  }
  .layer3{
    padding:0.5rem 1rem 0;
    padding-top:0.5rem;
    display:flex;
    flex-wrap:wrap;
    border-top:1px solid rgba(128,106,92,0.24);
  }
  .layer4-content::-webkit-scrollbar{
    display:none
  }
  .layer4-content{
    width:100%;
    margin:0.25rem 0 1rem;
    padding: 0 1.25rem;
    overflow-y: auto;
  }

</style>
