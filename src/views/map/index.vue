<template>
  <div id="container"></div>
</template>

<script setup>
import { getMapInfo } from '@/api/map'
import { getMarkerImg } from '@/api/image'
import { onMounted } from 'vue'
onMounted(async () => {
  const map = new BMapGL.Map('container') // 创建地图实例
  let point = new BMapGL.Point(116.404, 39.915)

  map.centerAndZoom(point, 5) // 初始化地图，设置中心点坐标和地图级别
  map.enableScrollWheelZoom() //启用滚轮放大缩小
  map.addControl(new BMapGL.ScaleControl()) // 添加比例尺控件
  map.addControl(new BMapGL.ZoomControl()) // 添加缩放控件
  map.addControl(new BMapGL.CityListControl()) // 添加城市列表控件
  map.setMapStyleV2({
    styleId: 'fe459dd0763a4cb32ce06e07cdddc06a'
  })

  const markerIcon = await getMarkerImg()
  const myIcon = new BMapGL.Icon(markerIcon.data.data.value, new BMapGL.Size(15, 15)) // 标记样式和大小
  const mapInfo = await getMapInfo() // 档案数据
  console.log(mapInfo.data)
  if (mapInfo.data.data?.length) {
    mapInfo.data.data.forEach((item) => {
      const pointItem = new BMapGL.Point(item.longitude, item.latitude)
      const marker = new BMapGL.Marker(pointItem, { icon: myIcon }) // 创建标注对象并添加到地图

      let html = []
      html.push('<div>')
      html.push(`<div>挂牌号：${item.listing}</div>`)
      html.push(`<div>树名：${item.tree_nameZh}</div>`)
      html.push(`<div>树种：${item.tree_species}</div>`)
      html.push(`<div>经纬度：(${item.longitude}, ${item.latitude})</div>`)
      html.push('</div>')
      const infoOptions = {
        width: 100,
        height: 105,
        title: `<h4>${item.description}</h4>`
      }
      const infoContent = new BMapGL.InfoWindow(html.join(''), infoOptions)
      marker.addEventListener('click', function (e) {
        this.openInfoWindow(infoContent)
        // alert(item.description) // 监听点击事件
      })
      map.addOverlay(marker)
    })
  }
})
</script>

<style lang="scss">
#container {
  height: calc(100vh - 50px - 32px - 16px * 2) !important;
  widows: 100%;
  margin: 0px;
  padding: 0px;
}
.BMap_bubble_pop {
  border: none !important;
  border-radius: 4px !important;
}
.BMap_bubble_title {
  width: 100% !important;
  display: flex !important;
  align-items: center;
}
.BMap_bubble_center {
  width: 100% !important;
}
.BMap_bubble_content {
  font-size: 10px !important;
}
.BMap_bubble_pop img {
  left: 84px !important;
  top: 136px !important;
}
</style>
