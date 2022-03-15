<template>
  <el-card shadow="always" class="widthPC-45">
    <template #header>
      <div class="rowSS">
        <img src="@/assets/LSDV_images/earth.png" class="title-logo" />
        <div class="ml-1">
          <h4><b>古树资源</b></h4>
          <span class="font-sizePx12">Ancient tree resources</span>
        </div>
      </div>
    </template>
    <div class="rowBS">
      <div class="group-item font-sizePx12">
        <span class="mb-1"><b>古树总数</b></span>
        <div class="rowSE">
          <span class="group-num"><b>5,018</b></span>
          <span class="group-num-text"><b>起</b></span>
        </div>
        <div class="group-desc mt">
          <span>较上个月</span>
          <span>
            <top class="icon" />
            9.4%
          </span>
        </div>
      </div>
      <div class="group-item font-sizePx12">
        <span class="mb-1"><b>古树总数</b></span>
        <div class="rowSE">
          <span class="group-num"><b>5,018</b></span>
          <span class="group-num-text"><b>起</b></span>
        </div>
        <div class="group-desc mt">
          <span>较上个月</span>
          <span style="color: #f56c6c">
            <bottom class="icon" />
            9.4%
          </span>
        </div>
      </div>
      <div class="group-item font-sizePx12">
        <span class="mb-1"><b>古树总数</b></span>
        <div class="rowSE">
          <span class="group-num"><b>5,018</b></span>
          <span class="group-num-text"><b>起</b></span>
        </div>
        <div class="group-desc mt">
          <span>较上个月</span>
          <span>
            <top class="icon" />
            9.4%
          </span>
        </div>
      </div>
    </div>
    <div style="position: relative">
      <div class="chart-tips"><b>最近一周</b></div>
      <div id="echarts1" class="chart-1 mt-1"></div>
    </div>
    <div style="position: relative">
      <div class="chart-tips"><b>一线城市古树分布（城市/农村）</b></div>
      <div id="echarts2" class="chart-2"></div>
    </div>
  </el-card>
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
import { Top, Bottom } from '@element-plus/icons-vue'
let echarts1 = ref(null)
let echarts2 = ref(null)
const initEchartsF = () => {
  echarts1.value = echarts.init(document.getElementById('echarts1'))
  echarts2.value = echarts.init(document.getElementById('echarts2'))
  let option1 = {
    color: ['#4575b4', '#abd9e9', '#ffb980', '#d87a80', '#8d98b3', '#97b552'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#304156'
        }
      }
    },
    grid: {
      left: '16px',
      right: '16px',
      top: '55px',
      bottom: '3%',
      containLabel: true
    },
    legend: {
      data: ['Line 1', 'Line 2'],
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
        color: '#666'
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.6)',
          opacity: 0
        }
      },
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        show: false
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.6)',
          opacity: 0
        }
      }
    },
    series: [
      {
        name: 'Line 1',
        data: [103, 204, 82, 901, 537, 727, 539, 428],
        type: 'line',
        smooth: true,
        showSymbol: false
      },
      {
        name: 'Line 2',
        data: [203, 104, 182, 101, 237, 927, 839, 850],
        type: 'line',
        smooth: true,
        showSymbol: false
      }
    ]
  }
  let option2 = {
    color: ['#4575b4', '#abd9e9'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#304156'
        }
      }
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
        data: [1023, 389, 934, 1070, 1314, 603, 124]
      },
      {
        name: '农村',
        type: 'bar',
        data: [925, 1348, 300, 124, 131, 687, 234]
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
.widthPC-45 {
  height: calc(100vh - 34.5px - 10px * 2);
}
.title-logo {
  width: 30px;
}

.group-item {
  width: 110px;
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
.chart-1 {
  width: 520px;
  height: 220px;
}
.chart-2 {
  width: 520px;
  height: 280px;
}

:deep(.el-card__header) {
  border: none !important;
}
:deep(.el-card__body) {
  padding-top: 0 !important;
}
</style>
