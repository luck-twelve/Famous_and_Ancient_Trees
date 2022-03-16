<template>
  <el-card shadow="always" class="widthPC-100">
    <template #header>
      <div class="rowSS">
        <img src="@/assets/LSDV_images/analysis_l.png" class="title-logo" />
        <div class="ml-1">
          <h4><b>古树名木分布分析</b></h4>
          <span class="font-sizePx12">Ancient tree resources</span>
        </div>
      </div>
    </template>
    <div class="rowSC">
      <div style="position: relative">
        <div class="chart-tips-1"><b>全国古树数量Top10</b></div>
        <div id="echartsb1" class="chart-b-1 ml mt-2"></div>
      </div>
      <div style="position: relative">
        <div class="chart-tips"><b>2022年录入情况</b></div>
        <div id="echartsb2" class="chart-b-2"></div>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
import { getArchivesListEMReq } from '@/api/archives'

const props = defineProps({
  topTen: {
    type: Array,
    default: () => []
  }
})

onMounted(async () => {
  const EMData = await getArchivesListEMReq()
  initEchartsF(EMData.data.data)
})

let echarts1 = ref(null)
let echarts2 = ref(null)
const initEchartsF = (EMData) => {
  echarts1.value = echarts.init(document.getElementById('echartsb1'))
  echarts2.value = echarts.init(document.getElementById('echartsb2'))
  let option1 = {
    color: [
      '#a50026',
      '#d73027',
      '#f46d43',
      '#fdae61',
      '#fee090',
      '#abd9e9',
      '#74add1',
      '#5ab1ef',
      '#4575b4',
      '#313695'
    ],
    legend: {
      orient: 'vertical',
      left: 'right'
    },
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: '',
        type: 'pie',
        radius: ['60%', '83%'],
        center: ['26%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 1
        },
        label: {
          show: false,
          position: 'center',
          normal: {
            show: true,
            position: 'center', // 设置居中
            formatter: function (data) {
              let html = `${data.value}(${data.percent}%)`
              html += `${data.name}`
              // 设置圆饼图中间文字排版
              return data.name + '\n' + `${data.value}(${data.percent}%)` // 对应的名字和值
            },
            textStyle: {
              fontSize: '0'
            }
          },
          emphasis: {
            show: true, // 文字至于中间时，这里需为true
            textStyle: {
              // 设置文字样式
              fontSize: '14',
              fontWeight: 600
            }
          }
        },
        labelLine: {
          show: false
        },
        data: props.topTen
      }
    ]
  }
  let option2 = {
    color: ['#4575b4'],
    tooltip: {
      trigger: 'item'
    },
    grid: {
      left: '3%',
      right: '4%',
      top: '30px',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        axisTick: {
          alignWithLabel: true
        },
        axisLabel: {
          color: '#666'
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.6)',
            opacity: 0
          }
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          show: false,
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
      }
    ],
    series: [
      {
        name: '',
        type: 'bar',
        barWidth: '30%',
        barGap: 0,
        label: {
          show: true,
          position: 'top',
          distance: '12',
          align: 'center',
          verticalAlign: 'bottem',
          rotate: 0,
          formatter: '  {c}  {name|{a}}',
          fontSize: 12,
          rich: {
            name: {}
          }
        },
        emphasis: {
          focus: 'series'
        },
        data: EMData
      }
    ]
  }
  echarts1.value.setOption(option1)
  echarts2.value.setOption(option2)
}
</script>

<style lang="scss" scoped>
// .widthPC-100 {
//   height: 300px;
// }
.title-logo {
  width: 30px;
}

.chart-tips-1 {
  position: absolute;
  top: 12px;
  left: 16px;
}
.chart-tips {
  position: absolute;
  top: 0;
  left: 16px;
}
.chart-b-1 {
  width: 280px;
  height: 150px;
}
.chart-b-2 {
  width: 380px;
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
