<template>
  <el-card shadow="always" class="widthPC-100">
    <template #header>
      <div class="rowSS">
        <img src="@/assets/LSDV_images/earth.png" class="title-logo" />
        <div class="ml-1">
          <h4><b>古树资源</b></h4>
          <span class="font-sizePx12">Ancient tree resources</span>
        </div>
      </div>
    </template>
    <div class="rowSS">
      <div id="echartsb1" class="chart-b-1"></div>
      <div style="position: relative">
        <div class="chart-tips"><b>提示</b></div>
        <div id="echartsb2" class="chart-b-2 mt-1"></div>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
/*折线图*/
let echarts1 = ref(null)
let echarts2 = ref(null)
const initEchartsF = () => {
  echarts1.value = echarts.init(document.getElementById('echartsb1'))
  echarts2.value = echarts.init(document.getElementById('echartsb2'))
  let option1 = {
    color: ['#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80', '#8d98b3', '#97b552'],
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['50%', '60%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '40',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ]
      }
    ]
  }
  let option2 = {
    color: ['#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80', '#8d98b3', '#97b552'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Direct',
        type: 'bar',
        barWidth: '60%',
        data: [10, 52, 200, 334, 390, 330, 220]
      }
    ]
  }
  echarts1.value.setOption(option1)
  echarts2.value.setOption(option2)
}

onMounted(() => {
  initEchartsF()
})
</script>

<style lang="scss" scoped>
.widthPC-100 {
  height: 300px;
}
.title-logo {
  width: 30px;
}

.group-item {
  width: 33%;
}
.group-num {
  font-size: 26px;
}
.group-desc {
  .icon {
    width: 12px;
    height: 12px;
    margin-top: -2px;
    margin-right: -3px;
    vertical-align: middle;
  }
  span:nth-child(1) {
    color: #666;
  }
  span:nth-child(2) {
    color: #67c23a;
  }
}

.chart-tips {
  position: absolute;
  top: 16px;
}
.chart-b-1 {
  width: 150px;
  height: 150px;
}
.chart-b-2 {
  width: 300px;
  height: 150px;
}

:deep(.el-card__header) {
  border: none !important;
  padding-bottom: 0;
}
:deep(.el-card__body) {
  padding-top: 0 !important;
}
</style>
