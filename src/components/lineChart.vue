<template>
  <canvas id="line_chart"></canvas>
</template>

<script>
export default {
  name: 'lineChart',
  props: {
    chartInfo: Object
  },
  methods: {
    clearChart () {
      var can = document.getElementById('line_chart')
      var ctx = can.getContext('2d')
      ctx.clearRect(0, 0, can.width, can.height)
    },
    drawLineChart (info) {
      var can = document.getElementById('line_chart')
      var ctx = can.getContext('2d')
      initChart(info)
      function initChart (info) {
        var width// 总宽
        var height // 总高
        var cMargin = 20 // 轴侧宽度
        var cSpace = 30 // 旁侧宽度
        if (info.totalDay > 20) {
          width = info.totalDay * 25 + cMargin * 2 + cSpace
          height = innerHeight * 0.45
        } else if (info.totalDay > 10) {
          width = info.totalDay * 28 + cMargin * 2 + cSpace
          height = innerHeight * 0.45
        } else {
          width = info.totalDay * 40 + cMargin * 2 + cSpace
          height = innerHeight * 0.45
        }
        can.width = width
        can.height = height
        var xWidth = width - cMargin * 2 - cSpace // x轴宽度
        var yHeight = height - cMargin * 2 - cSpace // y轴高度
        var originX = cMargin + cSpace // 坐标轴起始x
        var originY = cMargin + yHeight // 坐标轴起始y
        drawLine(originX, originY, originX, cMargin) // 画y轴
        drawLine(originX, originY, originX + xWidth, originY) // 画x轴
        drawChart(cMargin, originX, originY, xWidth, yHeight, info)
      }
      function drawChart (cMargin, originX, originY, xWidth, yHeight, info) {
        // 画x轴坐标点
        var xUnit = xWidth / info.totalDay
        var xDot = new Array(info.totalDay)
        var yDot = new Array(info.totalDay)
        var start = xUnit / 2
        var startTime = info.timeNode[0]
        for (var i = 0; i < info.totalDay; i++) {
          xDot[i] = originX + start + xUnit * i - 5
          yDot[i] = originY + 20 // 20为偏移x轴的长度
          ctx.fillText(startTime < 10 ? '0' + startTime : startTime, xDot[i], yDot[i])
          startTime++
          drawDivisionX(originX + xUnit * (i + 1), originY)
        }
        // 画y轴坐标点
        var ymin = (info.minPrice / 5 - 1) * 5 < 0 ? 0 : (info.minPrice / 5 - 1) * 5
        var ymax = (parseInt(info.maxPrice / 5) + 2) * 5
        var yUnit = yHeight / ((ymax - ymin) / 5)
        for (var j = 0; j < (ymax - ymin) / 5 + 1; j++) {
          ctx.fillText('￥' + (ymin + j * 5), cMargin, originY - j * yUnit + 3)
          drawDivisionY(originX, originY - j * yUnit)
        }
        // 画价格坐标点
        var dayIndex = info.timeNode[0]
        var index = 0
        var infoDotX = []
        var infoDotY = []
        for (var k = 0; k < info.totalDay; k++) {
          if (info.timeNode[index] === dayIndex) {
            infoDotX.push(xDot[dayIndex] + 5)
            infoDotY.push(originY - (info.priceNode[index] - ymin) / (ymax - ymin) * yHeight)
            drawArc(xDot[dayIndex] + 5, originY - (info.priceNode[index] - ymin) / (ymax - ymin) * yHeight)
            ctx.fillText(info.priceNode[index], infoDotX[index] - 3, infoDotY[index] - 5)
            index = index + 1
            dayIndex = dayIndex + 1
          } else {
            dayIndex = dayIndex + 1
          }
        }
        // 用于画动态折线图
        // var n = 0
        // var nmax = infoDotX.length
        // function drawLineWrap () {
        //   if (n < nmax) {
        //     drawLine(infoDotX[n], infoDotY[n], infoDotX[n + 1], infoDotY[n + 1])
        //     n++
        //   }
        // }
        for (var m = 0; m < infoDotX.length - 1; m++) {
          drawLine(infoDotX[m], infoDotY[m], infoDotX[m + 1], infoDotY[m + 1])
          // setTimeout(function () { drawLineWrap() }, 300 * m) // 在function中可以按所在位置的作用域正常调用函数，函数运行的作用域是其所在位置的作用域
        }
      }
      function drawLine (x, y, X, Y) {
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(X, Y)
        ctx.stroke()
        ctx.closePath()
      }
      function drawDivisionX (x, y) {
        ctx.beginPath()
        ctx.moveTo(x, y - 2)
        ctx.lineTo(x, y + 2)
        ctx.stroke()
        ctx.closePath()
      }
      function drawDivisionY (x, y) {
        ctx.beginPath()
        ctx.moveTo(x - 2, y)
        ctx.lineTo(x + 2, y)
        ctx.stroke()
        ctx.closePath()
      }
      function drawArc (x, y) {
        ctx.beginPath()
        ctx.arc(x, y, 2, 0, Math.PI * 2)
        ctx.fill()
        ctx.closePath()
      }
    }
  }
}
</script>

<style scoped>

</style>
