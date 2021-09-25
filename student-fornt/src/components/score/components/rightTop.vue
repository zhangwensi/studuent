<template>
  <div class="high-wrapper">
    <div id="left-charts" ref="scoreTypeRef"></div>
  </div>
</template>

<script>

export default {
  name: "rightButtom",
  data() {
    return {
      chartInstance:null,
    }
  },
  mounted() {
    this.initHighCharts()
    this.getData()
    window.addEventListener('resize',this.screenAdapter)
    this.screenAdapter()
  },
  destroyed() {
    window.removeEventListener('resize',this.screenAdapter)
  },
  methods: {
    // 初始化图表
    initHighCharts() {
      const option = {
        chart: {
          type: 'column'
        },
        title: {
          text: '班级学生综合排行榜(top10)'
        },
        subtitle: {
          text: '数据来源: 总测评次数'
        },
        xAxis: {
          type: 'category',
          labels: {
            rotation: -45  // 设置轴标签旋转角度
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: '总得分 (等级)'
          }
        },
        legend: {
          enabled: false
        },
        tooltip: {
          pointFormat: '评分总数: <b>{point.y:.1f} 分</b>'
        },
        series: [{
          // name: '前top10',
          data: [
            ['成龙', 24.25],
            ['黎明', 23.50],
            ['周星驰', 21.51],
            ['向华强', 16.78],
            ['吴君如', 16.06],
            ['刘德华', 15.20],
            ['周杰伦', 14.16],
            ['吴宗宪', 13.51],
            ['李冰冰', 13.08],
            ['王宝强', 12.44]
          ],
          dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:.1f}', // :.1f 为保留 1 位小数
            y: 10
          }
        }]
      }
      this.chartInstance = this.$hightCharts.chart(this.$refs.scoreTypeRef,option)
    },
    // 获取数据
    getData() {},
    // 更新数据
    updateCharts() {},
    // 当浏览器大小窗口发生变化时
    screenAdapter() {
      // this.chartInstance.setOptions()
      let width = this.$refs.scoreTypeRef.offsetWidth * 0.9
      let height = this.$refs.scoreTypeRef.clientHeight *0.8
      const adpOption = {
        chart: {
          width: width,
          height: height
        }
      }
      this.chartInstance.redraw(adpOption)
      this.chartInstance.setSize()
    }
  }
}
</script>

<style lang="scss" scoped>
.high-wrapper {
  width: 100%;
  height: 100%;
  padding: 10px;
  #left-charts {
    text-align: center;
    border: 1px solid #ccc;
  }
}
</style>
