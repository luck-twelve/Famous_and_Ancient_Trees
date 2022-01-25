<template>
  <div id="echartsContainerLineF" style="width: 100%; height: 400px"></div>
  <div id="echartsContainerLineS" style="width: 100%; height: 400px"></div>
  <div id="echartsContainerPieF" style="width: 550px; height: 400px"></div>
</template>
<script setup>
//echarts 例子地址 https://echarts.apache.org/examples/zh/index.html#chart-type-line
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
/*折线图*/
let echartsInstanceF = ref(null)
const initEchartsF = () => {
  echartsInstanceF.value = echarts.init(document.getElementById('echartsContainerLineF'))
  let option = {
    title: {
      text: '一天用电量分布',
      subtext: '纯属虚构'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    toolbox: {
      show: true,
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: [
        '00:00',
        '01:15',
        '02:30',
        '03:45',
        '05:00',
        '06:15',
        '07:30',
        '08:45',
        '10:00',
        '11:15',
        '12:30',
        '13:45',
        '15:00',
        '16:15',
        '17:30',
        '18:45',
        '20:00',
        '21:15',
        '22:30',
        '23:45'
      ]
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} W'
      },
      axisPointer: {
        snap: true
      }
    },
    visualMap: {
      show: false,
      dimension: 0,
      pieces: [
        {
          lte: 6,
          color: 'green'
        },
        {
          gt: 6,
          lte: 8,
          color: 'red'
        },
        {
          gt: 8,
          lte: 14,
          color: 'green'
        },
        {
          gt: 14,
          lte: 17,
          color: 'red'
        },
        {
          gt: 17,
          color: 'green'
        }
      ]
    },
    series: [
      {
        name: '用电量',
        type: 'line',
        smooth: true,
        data: [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390, 400, 500, 600, 750, 800, 700, 600, 400],
        markArea: {
          itemStyle: {
            color: 'rgba(255, 173, 177, 0.4)'
          },
          data: [
            [
              {
                name: '早高峰',
                xAxis: '07:30'
              },
              {
                xAxis: '10:00'
              }
            ],
            [
              {
                name: '晚高峰',
                xAxis: '17:30'
              },
              {
                xAxis: '21:15'
              }
            ]
          ]
        }
      }
    ]
  }
  echartsInstanceF.value.setOption(option)
}
let echartsInstanceS = ref(null)
const initEchartsS = () => {
  echartsInstanceS.value = echarts.init(document.getElementById('echartsContainerLineS'))
  let option = {
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        areaStyle: {}
      }
    ]
  }
  echartsInstanceS.value.setOption(option)
}

/*饼图*/
let echartsPieF = ref(null)
const initPieF = () => {
  echartsPieF.value = echarts.init(document.getElementById('echartsContainerPieF'))
  let option = {
    title: {
      text: '某站点用户访问来源',
      subtext: '纯属虚构',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: '搜索引擎' },
          { value: 735, name: '直接访问' },
          { value: 580, name: '邮件营销' },
          { value: 484, name: '联盟广告' },
          { value: 300, name: '视频广告' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
  echartsPieF.value.setOption(option)
}
onMounted(() => {
  initEchartsF()
  initEchartsS()
  initPieF()
})
</script>

<style scoped lang="scss"></style>
