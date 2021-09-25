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
            type: 'pie'
        },
        title: {
            text: '男女生占比图'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (this.$hightCharts.theme && this.$hightCharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: [{
                name: '男',
                y: 61.41,
                sliced: true,
                selected: true
            }, {
                name: '女',
                y: 11.84
            }]
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
