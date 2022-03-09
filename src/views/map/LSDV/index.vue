<template>
  <div class="rowBS">
    <div class="card-map columnBS">
      <el-card shadow="always" class="widthPC-100 mb-1">
        <div id="myMap" ref="myMap"></div>
      </el-card>
      <chart-bottom></chart-bottom>
    </div>
    <chart-right></chart-right>
  </div>
</template>

<script setup>
import { onMounted, ref, getCurrentInstance } from 'vue'
import ChartBottom from './chart-bottom.vue'
import ChartRight from './chart-right.vue'

let { proxy } = getCurrentInstance()

const chart = ref(null)
const mapOption = ref({
  backgroundColor: '#FFFFFF',
  geo: {
    map: 'china',
    roam: true, // 拖拽和缩放 move / scale
    zoom: 1.2,
    scaleLimit: { min: 1, max: 3 }, // 缩放级别
    regions: [
      {
        name: '南海诸岛',
        value: 0,
        itemStyle: {
          normal: {
            opacity: 0,
            label: {
              show: false
            }
          }
        }
      }
    ],
    itemStyle: {
      areaColor: '#97b552', //默认的地图板块颜色
      borderWidth: 1,
      borderColor: '#666'
    }
  },
  title: {
    text: '全国古树分布统计',
    x: 'center',
    y: 10
  },
  tooltip: {
    trigger: 'item'
  },

  //配置属性
  series: [
    {
      name: '数据',
      type: 'map',
      mapType: 'china',
      roam: true,
      geoIndex: 0,
      label: {
        normal: {
          show: false //省份名称,
        },
        emphasis: {
          show: false
        }
      },
      data: [
        { name: '北京', value: Math.round(Math.random() * 500) },
        { name: '天津', value: Math.round(Math.random() * 500) },
        { name: '上海', value: Math.round(Math.random() * 500) },
        { name: '重庆', value: Math.round(Math.random() * 500) },
        { name: '河北', value: Math.round(Math.random() * 500) },
        { name: '河南', value: Math.round(Math.random() * 500) },
        { name: '云南', value: Math.round(Math.random() * 500) },
        { name: '辽宁', value: Math.round(Math.random() * 500) },
        { name: '黑龙江', value: Math.round(Math.random() * 500) },
        { name: '湖南', value: Math.round(Math.random() * 500) },
        { name: '安徽', value: Math.round(Math.random() * 500) },
        { name: '山东', value: Math.round(Math.random() * 500) },
        { name: '新疆', value: Math.round(Math.random() * 500) },
        { name: '江苏', value: Math.round(Math.random() * 500) },
        { name: '浙江', value: Math.round(Math.random() * 500) },
        { name: '江西', value: Math.round(Math.random() * 500) },
        { name: '湖北', value: Math.round(Math.random() * 500) },
        { name: '广西', value: Math.round(Math.random() * 500) },
        { name: '甘肃', value: Math.round(Math.random() * 500) },
        { name: '山西', value: Math.round(Math.random() * 500) },
        { name: '内蒙古', value: Math.round(Math.random() * 500) },
        { name: '陕西', value: Math.round(Math.random() * 500) },
        { name: '吉林', value: Math.round(Math.random() * 500) },
        { name: '福建', value: Math.round(Math.random() * 500) },
        { name: '贵州', value: Math.round(Math.random() * 500) },
        { name: '广东', value: Math.round(Math.random() * 500) },
        { name: '青海', value: Math.round(Math.random() * 500) },
        { name: '西藏', value: Math.round(Math.random() * 500) },
        { name: '四川', value: Math.round(Math.random() * 500) },
        { name: '宁夏', value: Math.round(Math.random() * 500) },
        { name: '海南', value: Math.round(Math.random() * 500) },
        { name: '台湾', value: Math.round(Math.random() * 500) },
        { name: '香港', value: Math.round(Math.random() * 500) },
        { name: '澳门', value: Math.round(Math.random() * 500) }
      ] //数据
    }
  ]
})
onMounted(() => {
  chart.value = proxy.$echarts.init(document.getElementById('myMap'), 'macarons')
  chart.value.setOption(mapOption.value)
})
</script>

<style lang="scss" scoped>
.card-map {
  height: calc(100vh - 34.5px - 10px * 2);
  width: calc(100vw - 45% - 10px * 3);
}
#myMap {
  width: 630px;
  min-width: calc(100vw - 45% - 10px * 3);
  height: calc(100vh - 50px - 32px - 16px * 2 - 40px) !important;
}
</style>
