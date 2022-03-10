<template>
  <div id="container"></div>
  <div class="ttDialog">
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="400px">
      <el-form :model="formData" label-position="right" label-width="70px">
        <el-form-item label="挂牌号:">
          {{ formData.listing }}
        </el-form-item>
        <el-form-item label="树种:">
          {{ formData.tree_species }}
        </el-form-item>
        <el-form-item label="小地名:">
          {{ formData.location_aliasName }}
        </el-form-item>
        <el-form-item label="经纬度:">({{ formData.longitude }}, {{ formData.latitude }})</el-form-item>
      </el-form>
      <template #footer></template>
    </el-dialog>
  </div>
  <el-button class="ab-btn" @click="drawer = true">数据统计</el-button>
  <div class="drawer-wrap">
    <el-drawer v-model="drawer" size="100%" direction="ttb" :before-close="close">
      <template #title>
        <div class="rowBC">
          <b style="color: #333">数据统计</b>
          <div class="rowCC font-sizePx12 mr-1">
            <el-icon class="mr"><cloudy /></el-icon>
            22℃~30℃
            <el-divider direction="vertical"></el-divider>
            <span>{{ nowTime }}</span>
          </div>
        </div>
      </template>
      <LSDV v-if="drawer"></LSDV>
    </el-drawer>
  </div>
</template>

<script setup>
import { Cloudy } from '@element-plus/icons-vue'
import { getMapInfo } from '@/api/map'
import { getWhether } from '@/api/whether'
import { ref, onBeforeMount, onMounted, reactive, toRefs } from 'vue'
import dayjs from 'dayjs'
import LSDV from './LSDV/index.vue'

const drawer = ref(false)

const state = reactive({
  dialogTitle: '',
  dialogVisible: false,
  formData: {},
  nowTime: ''
})
let { dialogTitle, dialogVisible, formData, nowTime } = toRefs(state)
const weekEnum = {
  Mo: ' 星期一',
  Tu: ' 星期二',
  We: ' 星期三',
  Th: ' 星期四',
  Fr: ' 星期五',
  Sa: ' 星期六',
  Su: ' 星期七'
}
setInterval(() => {
  let time = dayjs().format('YYYY-MM-DD HH:mm:ss')
  let week = weekEnum[dayjs().format('dd')]
  state.nowTime = time + week
}, 1000)
const close = () => {
  drawer.value = false
}
onBeforeMount(() => {
  fetch('https://www.yiketianqi.com/free/day?appid=79875459&appsecret=jy5xrNDW&vue=1')
    .then((res) => {
      return res.json()
    })
    .then((res) => {
      console.log(res)
    })
  // getWhether().then((res) => {
  //   console.log(res)
  // })
})
onMounted(async () => {
  const map = new BMapGL.Map('container') // 创建地图实例
  let point = new BMapGL.Point(109.451, 34.956)
  map.centerAndZoom(point, 5) // 初始化地图，设置中心点坐标和地图级别
  map.enableScrollWheelZoom() //启用滚轮放大缩小
  map.addControl(new BMapGL.ScaleControl()) // 添加比例尺控件
  map.addControl(new BMapGL.ZoomControl()) // 添加缩放控件
  map.addControl(new BMapGL.CityListControl()) // 添加城市列表控件
  map.setMapStyleV2({
    styleId: 'fe459dd0763a4cb32ce06e07cdddc06a'
  })
  const mapInfo = await getMapInfo() // 档案数据
  if (mapInfo.data.data?.length) {
    mapInfo.data.data.forEach((item) => {
      const pointItem = new BMapGL.Point(item.longitude, item.latitude)
      const marker = new BMapGL.Marker(pointItem, { icon: new BMapGL.Icon(item.marker, new BMapGL.Size(15, 15)) }) // 创建标注对象并添加到地图
      marker.addEventListener('click', function (e) {
        state.dialogTitle = item.tree_nameZh
        state.formData = item
        state.dialogVisible = true
      })
      map.addOverlay(marker)
    })
  }
})
</script>

<style lang="scss">
#container {
  height: calc(100vh - 50px - 32px - 16px * 2) !important;
  width: 100%;
  margin: 0px;
  padding: 0px;
}
.ab-btn {
  position: absolute;
  top: 26px;
  right: 26px;
  z-index: 10;
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

<style lang="scss" scoped>
.drawer-wrap {
  height: 100%;
  cursor: default;

  &:deep(.el-drawer__header) {
    padding: 5px 5px 5px 20px !important;
    box-shadow: var(--el-box-shadow-light);
  }
  &:deep(.el-drawer__body) {
    height: 100%;
    padding: 10px;
  }
  &:deep(.el-drawer__header) {
    margin-bottom: 0;
  }
}
</style>
