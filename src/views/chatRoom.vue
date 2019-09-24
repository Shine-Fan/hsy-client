<!--没有完成滑倒顶部查看历史消息的功能-->
<template>
    <div style="position:absolute;top:0;height:100%;width:100%;display:flex;flex-direction: column;">
      <div class="chat-area">
        <div class="chat-content" style="position:absolute;top:0;overflow:scroll;height:100%;width:95%;">
          <div v-for="(item,index) in com_info" :key="index" style="width:100%;display:flex;flex-direction: column;align-items: center ">
            <div style="width:40%;height:1.3rem;background-color:darkgray;font-size:0.9rem;color:white;text-align: center;margin:1.5rem 0;">{{item.date}}</div>
            <div v-for="(chat_item,num) in item.chat" :key="num" style="width:100%;">
              <div v-if="chat_item.user_name !== 'Shine'" style="width:100%;display: flex;margin-bottom:1.5rem;">
                <div style="width:4rem;">
                  <img style="width:3rem;height:3rem;border-radius: 50%;" :src="chat_item.user_img">
                </div>
                <div style="width:100%;display:flex;flex-direction: column">
                  <div style="margin-right:auto;padding-left:8px;">{{chat_item.user_name}}</div>
                  <div class="com-info-left">{{chat_item.content}}</div>
                </div>
              </div>
              <div v-else style="width:100%;display:flex;margin-bottom:1.5rem">
                <div style="width:100%;display:flex;flex-direction: column">
                  <div style="margin-left:auto;padding-right:8px;">{{chat_item.user_name}}</div>
                  <div class="com-info-right">{{chat_item.content}}</div>
                </div>
                <div style="width:4rem;margin-left:auto;display: flex;">
                  <img style="margin-left:auto;width:3rem;height:3rem;border-radius: 50%;" :src="chat_item.user_img">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--下方消息、工具栏-->
      <div style="position:fixed;bottom:0;width:100%;background-color:white">
        <div class="tool-area">
          <div style="width:3rem;height:3rem;display: flex;justify-content: center;align-items: center" @click="change_speak_way">
            <div style="width:2rem;height:2rem;display:flex;justify-content:center;align-items:center;font-size:1.2rem;border-radius: 50%;border:1px solid black">
              <i v-if="!speak_way" class="fa fa-keyboard-o" ></i>
              <i v-if="speak_way" class="fa fa-microphone" ></i>
            </div>
          </div>
          <div style="width:100%;height:3rem;display:flex;justify-content: center;align-items: center;">
            <input v-if="speak_way" type="text" class="text-area" style="width:85%;border:none;border-bottom:1px solid gray;outline:none;" v-model="info" @focus="focus" @blur="lost_focus">
            <div v-if="!speak_way" class="speak-bar" style="width:80%;height:2rem;border:1px solid gray;display:flex;align-items: center;justify-content: center;letter-spacing:3px;">请按住说话</div>
          </div>
          <div style="width:3rem;height:3rem;display:flex;justify-content:center;align-items:center;">
            <div v-if="action" style="width:2rem;height:2rem;display:flex;justify-content:center;align-items:center;font-size:1.2rem;border-radius: 50%;border:1px solid black" @click="more_tool">
              <i class="fa fa-plus"></i>
            </div>
            <div v-if="!action" style="width:2.8rem;height:1.6rem;background-color:#28a745;text-align:center;color:white;letter-spacing:2px;border-radius: 0.4rem;" @click="send">发送</div>
          </div>
        </div>
        <div v-if="more_tool_flag" style="height:10rem;width:100%;display:flex;align-items: center">
          <div style="display:flex;flex-direction:column;align-items: center;margin:0 0.6rem 0 1.2rem;color:gray ">
            <div style="width:3rem;height:3rem;border:1px solid lightgray;border-radius: 0.5rem;font-size:1.8rem;display: flex;justify-content: center;align-items: center"><i class="fa fa-camera"></i></div>
            <div>拍照</div>
          </div>
          <div style="display:flex;flex-direction:column;align-items: center;margin:0 0.6rem;color:gray;">
            <div style="width:3rem;height:3rem;border:1px solid lightgray;border-radius: 0.5rem;font-size:1.8rem;display: flex;justify-content: center;align-items: center"><i class="fa fa-image"></i></div>
            <div>相册</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
function formatDateTime (value) {
  var date = new Date(value)
  var M = date.getMonth() + 1
  M = M < 10 ? '0' + M : M
  var d = date.getDate()
  d = d < 10 ? '0' + d : d
  var h = date.getHours()
  h = h < 10 ? '0' + h : h
  var m = date.getMinutes()
  m = m < 10 ? '0' + m : m
  return M + '月' + d + '日' + ' ' + h + ':' + m
}
function compareDate (date1, date2) {
  var temp1 = date1.split('')
  var temp2 = date2.split('')
  for (var i = 0; i < temp1.length; i++) {
    if (temp1[i] !== temp2[i]) {
      break
    }
  }
  if (i === temp1.length) {
    return true
  } else {
    return false
  }
}
export default {
  name: 'chatRoom.vue',
  data: function () {
    return {
      speak_way: true, // true:文字，false:语音
      action: true, // true：更多， false：发送
      info: '',
      isToBottom: false,
      more_tool_flag: false,
      date: '',
      com_info: [
        {
          date: '09月01日 13:14',
          chat: [
            {
              user_name: '小明',
              user_img: require('../assets/carrot.jpg'),
              type: 0, // type:0表示文字消息，type:1表示语音消息
              content: '大家好！'
            },
            {
              user_name: 'Shine',
              user_img: require('../assets/eggplant.png'),
              type: 0,
              content: '大家好！'
            },
            {
              user_name: '小王',
              user_img: require('../assets/tomato.jpg'),
              type: 0,
              content: '请问一下.........'
            },
            {
              user_name: '小李',
              user_img: require('../assets/corn.jpg'),
              type: 0,
              content: '种植XX有什么好的方法'
            },
            {
              user_name: '小明',
              user_img: require('../assets/carrot.jpg'),
              type: 0, // type:0表示文字消息，type:1表示语音消息
              content: '大家好！'
            }
          ]
        }

      ]
    }
  },
  methods: {
    change_speak_way: function () {
      this.speak_way = !this.speak_way
      if (!this.speak_way) { // 若为发语音状态，则隐藏发送按钮
        this.action = true
      } else { // 若为变为发文字状态，则监测输入框中是否有文本，有则显示发送按钮，无则显示更多按钮
        if (this.info !== '') {
          this.action = false
        }
      }
      this.more_tool_flag = false
      console.log(this.speak_way)
    },
    change_action: function () {
      this.action = !this.action
    },
    focus: function () {
      this.action = false
      this.more_tool_flag = false
    },
    lost_focus: function () {
      if (this.info === '') {
        this.action = !this.action
      }
    },
    send: function () {
      if (this.info) {
        var temp = {}
        temp.user_name = 'Shine'
        temp.user_img = require('../assets/eggplant.png')
        temp.type = 0
        temp.content = ' ' + this.info + ' '
        var len = this.com_info.length
        this.isToBottom = true // 有新消息添加，激活isToBottom
        if (compareDate(this.com_info[len - 1].date, this.date)) { // bug:没有考虑年份！！！
          this.com_info[len - 1].chat.push(temp)
          console.log(temp)
        } else {
          var comTemp = {}
          comTemp.date = this.date
          comTemp.chat = []
          comTemp.chat.push(temp)
          this.com_info.push(comTemp)
          console.log(comTemp)
        }
      }
      this.info = ''
      this.action = true
      this.more_tool_flag = false
    },
    more_tool: function () {
      this.more_tool_flag = !this.more_tool_flag
    }
  },
  created () {
    this.date = formatDateTime(new Date())
    console.log(this.date)
  },
  updated () {
    if (this.isToBottom) {
      var chatContent = document.getElementsByClassName('chat-content')
      chatContent[0].scrollTop = chatContent[0].scrollHeight
      console.log(chatContent[0].scrollTop)
      this.isToBottom = !this.isToBottom
    }
  },
  mounted () {
    var chatContent = document.getElementsByClassName('chat-content')
    chatContent[0].scrollTop = chatContent[0].scrollHeight // 让滚动条初始定位到底部
    var that = this
    this.timer = setInterval(() => {
      that.date = formatDateTime(new Date()) // 定时，每格10分钟更新一次聊天记录时间时间
      console.log(that.date)
    }, 600000)
  },
  beforeDestroy () {
    if (this.timer) {
      clearInterval(this.timer) // 清除定时器
    }
  }
}
</script>

<style scoped>
  .chat-area{
    position:relative;
    top:0;
    margin-bottom:3.5rem;
    height:100%;
    width:100%;
    background-color:#f1f1f1;
    display:flex;
    flex-direction:column;
    align-items: center;
  }
  .chat-content::-webkit-scrollbar{
    display: none;
  }
  .tool-area{
    height:3.5rem;
    width:100%;
    display: flex;
    padding: 0 10px 0.5rem;
    border-bottom:1px solid lightgray
  }
  .speak-bar:active{
    background-color:lightgray;
  }
  .com-info-left{
    margin-right:auto;
    margin-left:0.45rem;
    margin-top:7px;
    background-color: white;
    padding:5px 8px;
    width:auto;
    max-width:80%;
    border-radius:0.4rem;
    overflow:hidden;
    word-break:break-word;
  }
  .com-info-left:before{
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-top: 8px solid transparent;
    border-right:8px solid white;  /*微信绿：#9EEA6A*/
    border-bottom:8px solid transparent;
    border-left:8px solid transparent;
    position: absolute;
    left:2.9rem;
  }
  .com-info-right{
    margin-left:auto;
    margin-right:0.45rem;
    margin-top:7px;
    background-color: white;
    padding:5px 8px;
    width:auto;
    max-width: 80%;
    border-radius:0.4rem;
    overflow:hidden;
    word-break:break-word;
  }
  .com-info-right:before{
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-top: 8px solid transparent;
    border-right:8px solid transparent;  /*微信绿：#9EEA6A*/
    border-bottom:8px solid transparent;
    border-left:8px solid white;
    position: absolute;
    right:2.9rem;
  }

</style>
