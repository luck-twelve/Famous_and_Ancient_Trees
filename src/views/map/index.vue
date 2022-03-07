<template>
  <div id="container"></div>
</template>

<script setup>
import { getMarkerImg } from '@/api/image'
import { onMounted } from 'vue'
onMounted(async () => {
  const map = new BMapGL.Map('container') // 创建地图实例
  let point = new BMapGL.Point(116.404, 39.915)

  map.centerAndZoom(point, 5) // 初始化地图，设置中心点坐标和地图级别
  map.addControl(new BMapGL.ScaleControl()) // 添加比例尺控件
  map.addControl(new BMapGL.ZoomControl()) // 添加缩放控件
  map.addControl(new BMapGL.CityListControl()) // 添加城市列表控件
  map.setMapStyleV2({
    styleId: 'fe459dd0763a4cb32ce06e07cdddc06a'
  })

  const pointDemo = new BMapGL.Point(116.404, 39.915)
  const markerIcon = await getMarkerImg()
  const myIcon = new BMapGL.Icon(markerIcon.data.data.value, new BMapGL.Size(20, 20)) // 图片样式和大小
  const marker = new BMapGL.Marker(pointDemo, { icon: myIcon }) // 创建标注对象并添加到地图
  map.addOverlay(marker)
  marker.addEventListener('click', function () {
    alert('您点击了标注')
  })
})
</script>

<style scoped>
#container {
  height: calc(100vh - 50px - 32px - 16px * 2) !important;
  widows: 100%;
  margin: 0px;
  padding: 0px;
}
</style>
