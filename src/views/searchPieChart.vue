<template>
  <div style="position:absolute;top:50%;width:100%;overflow-x: scroll">
    <canvas id="pieChart"></canvas>
  </div>
</template>

<script>
export default {
  name: 'searchpieChart',
  mounted () {
    var can = document.getElementById('pieChart')
    var ctx = can.getContext('2d')
    var width = innerWidth * 0.7
    var height = innerHeight * 0.5
    can.width = innerWidth
    can.height = height
    var cMargin = 0
    var radius = 0
    if (width < height) {
      cMargin = width * 0.15
      radius = width * 0.35
    } else {
      cMargin = height * 0.15
      radius = height * 0.35
    }
    var ox = width / 2
    var oy = height / 2
    CanvasRenderingContext2D.prototype.sector = function (x, y, r, start, end, color) {
      this.save()
      this.beginPath()
      this.moveTo(x, y)
      this.arc(x, y, r, start, end)
      this.closePath()
      this.restore()
      this.fillStyle = color
      this.fill()
      this.save()
      // this.translate(x, y)
      // this.rotate((start + end) / 2)
      // this.fillStyle = 'black'
      // this.font = '16px scans-serif'
      // this.fillText(num + '%', radius * 0.6, 0)
      this.restore()
      this.save()
    }
    CanvasRenderingContext2D.prototype.mark = function (x, y, radius, start, end, position) {
      var rad = (start + end) / 2
      var xDotRelative = Math.cos(rad) * radius / 2 + (Math.random() - 0.5) * 20
      var yDotRelative = Math.sin(rad) * radius / 2 + (Math.random() - 0.5) * 20
      var xDot = x + xDotRelative
      var yDot = y + yDotRelative
      this.beginPath()
      this.moveTo(xDot, yDot)
      this.lineTo(xDot, position[1])
      this.zIndex = 1
      this.stroke()
      this.moveTo(xDot, position[1])
      this.lineTo(position[0], position[1])
      this.stroke()
      this.closePath()
    }
    var colorSet = ['blue', 'yellow', 'red', 'green', 'orange']
    var rad = [0, Math.PI * 2 / 5 * 1, Math.PI * 2 / 5 * 3, Math.PI * 2 / 5 * 4, Math.PI * 2]
    var position
    for (var m = 0; m < rad.length - 1; m++) {
      ctx.sector(ox, oy, radius, rad[m], rad[m + 1], colorSet[m])
    }
    for (m = 0; m < rad.length - 1; m++) {
      position = [innerWidth * 0.75, height * 0.1 + height * 0.8 / rad.length * ((m + 1 + rad.length / 2) % rad.length)]
      ctx.mark(ox, oy, radius, rad[m], rad[m + 1], position)
    }
  }
}
</script>

<style scoped>

</style>
