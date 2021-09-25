<template>
  <div class="high-wrapper">
    <div id="left-charts" ref="scoreTypeRef"></div>
  </div>
</template>

<script>

export default {
  name: "leftTop",
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
        title: {
          text: '2021 ~ 2022 年度第一学期语文成绩测试走势'
          },
        subtitle: {
          text: '数据来源：各次成绩检测'
        },
        xAxis: {
          title: {
              text: '测评次数'
          }
        },
        yAxis: {
          text: '分数'
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle'
        },
        plotOptions: {
          series: {
            label: {
              connectorAllowed: false
            },
            pointStart: 1
          }
        },
        series: [{
          name: '男生',
          data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
        },
        {
          name: '女生',
          data: [43955, 53503, 55177, 72658, 79031, 139931, 117133, 174175]
        }],
        responsive: {
          rules: [{
              condition: {
                maxWidth: 500
              },
              chartOptions: {
                legend: {
                  layout: 'horizontal',
                  align: 'center',
                  verticalAlign: 'bottom'
                }
              }
          }]
        }
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
