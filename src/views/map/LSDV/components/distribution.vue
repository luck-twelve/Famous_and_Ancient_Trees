<template>
  <div style="position: relative">
    <div class="chart-tips"><b>一线城市古树分布（城市/农村）</b></div>
    <div id="echarts_dis" class="chart_dis"></div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted, ref, inject } from 'vue'
// import { getArchivesNumberEYReq } from '@/api/archives'
const defaultCityList = ['北京', '上海', '广州', '深圳', '杭州', '成都', '重庆']
const topTen = inject('topTen')

onMounted(async () => {
  // await getArchivesNumberEYReq()
  initEchartsF()
})

let echarts_dis = ref(null)
const initEchartsF = () => {
  echarts_dis.value = echarts.init(document.getElementById('echarts_dis'))
  let option_dis = {
    color: ['#4575b4', '#abd9e9'],
    tooltip: {
      trigger: 'item'
    },
    grid: {
      left: '3%',
      right: '4%',
      top: '45px',
      bottom: '3%',
      containLabel: true
    },
    legend: {
      data: ['城市', '农村'],
      left: 'right',
      textStyle: {
        fontSize: 10, // 字体大小
        color: '#666'
      },
      padding: [20, 0]
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01],
      axisLabel: {
        color: '#666'
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.6)',
          opacity: 0
        }
      },
      splitLine: {
        //修改背景线条样式
        show: true, //是否展示
        lineStyle: {
          color: '#eee' //线条颜色
          // type: 'dashed' //线条样式，默认是实现，dashed是虚线
        }
      }
    },
    yAxis: {
      type: 'category',
      axisLabel: {
        color: '#666'
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.6)',
          opacity: 0
        }
      },
      data: ['重庆', '成都', '杭州', '深圳', '广州', '上海', '北京']
    },
    series: [
      {
        name: '城市',
        type: 'bar',
        label: {
          show: true,
          fontSize: 10
        },
        data: [3, 3, 4, 1, 4, 3, 2]
      },
      {
        name: '农村',
        type: 'bar',
        label: {
          show: true,
          fontSize: 10
        },
        data: [5, 2, 1, 4, 1, 2, 4]
      }
    ]
  }
  echarts_dis.value.setOption(option_dis)
}
</script>

<style lang="scss" scoped>
.chart-tips {
  position: absolute;
  top: 16px;
}
.chart_dis {
  width: 520px;
  height: 280px;
}
</style>
