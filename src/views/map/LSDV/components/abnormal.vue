<template>
  <div style="position: relative">
    <div class="chart-tips"><b>近30天新增异常情况</b></div>
    <!-- 上周新增异常反馈情况 -->
    <div id="echarts_ab" class="chart-ab mt-1"></div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
import { getAbnormalListEMReq } from '@/api/abnormal'

onMounted(async () => {
  const EMData = await getAbnormalListEMReq()
  const { dayMap, countMap } = EMData.data.data
  initEchartsF(dayMap, countMap)
})

let echarts_ab = ref(null)
const initEchartsF = (dayMap, countMap) => {
  echarts_ab.value = echarts.init(document.getElementById('echarts_ab'))
  let option_ab = {
    color: ['#4575b4', '#abd9e9', '#ffb980', '#d87a80', '#8d98b3', '#97b552'],
    tooltip: {
      trigger: 'item'
      // axisPointer: {
      //   type: 'cross',
      //   label: {
      //     backgroundColor: '#304156'
      //   }
      // }
    },
    grid: {
      left: '16px',
      right: '16px',
      top: '55px',
      bottom: '3%',
      containLabel: true
    },
    legend: {
      // data: ['新增', '已解决'],
      left: 'right',
      textStyle: {
        fontSize: 10, // 字体大小
        color: '#666'
      },
      padding: [20, 0]
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      axisLabel: {
        color: '#666',
        fontSize: 10
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.6)',
          opacity: 0
        }
      },
      data: dayMap
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        show: false
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#eee',
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
    series: [
      {
        name: '新增',
        data: countMap,
        type: 'line'
        // smooth: true
      }
      // {
      //   name: '已解决',
      //   data: countMap,
      //   type: 'line',
      //   smooth: true
      //   // markPoint: {
      //   //   data: [
      //   //     { type: 'max', name: '最多' },
      //   //     { type: 'min', name: '最少' }
      //   //   ]
      //   // },
      //   // markLine: {
      //   //   data: [{ type: 'average', name: '平均' }]
      //   // }
      // }
    ]
  }
  echarts_ab.value.setOption(option_ab)
}
</script>

<style lang="scss" scoped>
.chart-tips {
  position: absolute;
  top: 16px;
}
.chart-ab {
  width: 520px;
  height: 220px;
}
</style>
