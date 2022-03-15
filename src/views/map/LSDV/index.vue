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
import { onMounted, ref, getCurrentInstance, reactive, inject, toRefs } from 'vue'
import ChartBottom from './chart-bottom.vue'
import ChartRight from './chart-right.vue'

let { proxy } = getCurrentInstance()

let defaultData = [
  { name: '北京', value: 0 },
  { name: '天津', value: 0 },
  { name: '上海', value: 0 },
  { name: '重庆', value: 0 },
  { name: '河北', value: 0 },
  { name: '河南', value: 0 },
  { name: '云南', value: 0 },
  { name: '辽宁', value: 0 },
  { name: '黑龙江', value: 0 },
  { name: '湖南', value: 0 },
  { name: '安徽', value: 0 },
  { name: '山东', value: 0 },
  { name: '新疆', value: 0 },
  { name: '江苏', value: 0 },
  { name: '浙江', value: 0 },
  { name: '江西', value: 0 },
  { name: '湖北', value: 0 },
  { name: '广西', value: 0 },
  { name: '甘肃', value: 0 },
  { name: '山西', value: 0 },
  { name: '内蒙古', value: 0 },
  { name: '陕西', value: 0 },
  { name: '吉林', value: 0 },
  { name: '福建', value: 0 },
  { name: '贵州', value: 0 },
  { name: '广东', value: 0 },
  { name: '青海', value: 0 },
  { name: '西藏', value: 0 },
  { name: '四川', value: 0 },
  { name: '宁夏', value: 0 },
  { name: '海南', value: 0 },
  { name: '台湾', value: 0 },
  { name: '香港', value: 0 },
  { name: '澳门', value: 0 }
]
const maps = reactive(inject('maps'))
const mapData = []
maps.list.forEach((item) => {
  mapData.push(item.company_province)
})
function getWordCnt(arr) {
  // 计算重复省份的个数
  return arr.reduce(function (prev, next) {
    prev[next] = prev[next] + 1 || 1
    return prev
  }, {})
}
let allProvince = Object.keys(getWordCnt(mapData))
console.log(allProvince)
allProvince.forEach((item) => {
  let show = defaultData.find((itm) => itm.name === item)
  if (show) {
    show.value = getWordCnt(mapData)[item]
  }
})

const chart = ref(null)
const mapOption = ref({
  backgroundColor: '#fff',
  geo: {
    map: 'china',
    roam: false, // 拖拽和缩放 move / scale
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
  visualMap: {
    left: 'right',
    min: 0,
    max: 5,
    inRange: {
      // '#ffffbf',
      // '#fee090',
      // '#fdae61',
      // '#f46d43',
      // '#d73027',
      // '#a50026'
      color: ['#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
    },
    text: ['High', 'Low'],
    calculable: true
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
      data: defaultData //数据
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
  #myMap {
    width: 670px;
    // min-width: calc(100vw - 45% - 10px * 3);
    height: calc(100vh - 34.5px - 10px * 2 - 10px - 208px) !important;
  }
}
.card-map:deep(.el-card__body) {
  padding: 0;
}
</style>
