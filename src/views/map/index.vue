<template>
  <div id="container"></div>
  <input ref="inputCopy" value="" style="opacity: 0; position: absolute" />
  <div class="ttDialog">
    <el-dialog v-model="dialogVisible" width="450px">
      <template #title>
        <div>
          {{ formData.id }}
          <el-icon style="color: #303133; cursor: pointer" @click="() => copyText(formData.id)">
            <copy-document />
          </el-icon>
          <span v-if="formData.marker == 'marker_abnormal'" class="font-sizePx12 text-danger">异常</span>
        </div>
      </template>
      <el-form :model="formData" label-position="right" label-width="80px">
        <el-form-item label="树名:">
          {{ formData.tree_nameZh }}
        </el-form-item>
        <el-form-item label="树种:">
          {{ formData.tree_speciesStr }}
        </el-form-item>
        <el-form-item label="地理位置:">
          {{ formData.company_city }}{{ formData.company_district }}（{{ formData.company_province }}）
        </el-form-item>
        <el-form-item label="经纬度:">({{ formData.longitude }}, {{ formData.latitude }})</el-form-item>
      </el-form>
      <template #footer></template>
    </el-dialog>
  </div>
  <el-button class="ab-btn" @click="handleStac">数据统计</el-button>
  <div class="drawer-wrap">
    <el-drawer v-model="drawer" size="100%" direction="ttb" :before-close="close">
      <template #title>
        <div class="rowBC">
          <b style="color: #333">数据统计</b>
          <div class="rowCC font-sizePx12 mr-1">
            {{ weather.city }}
            {{ weather.wea }}
            <el-icon class="mx">
              <cloudy v-if="weather.wea_img == 'shachen'" />
              <drizzling v-if="weather.wea_img == 'xue'" />
              <lightning v-if="weather.wea_img == 'lei'" />
              <mostly-cloudy v-if="weather.wea_img == 'yin'" />
              <partly-cloudy v-if="weather.wea_img == 'yun'" />
              <pouring v-if="weather.wea_img == 'yu'" />
              <sunny v-if="weather.wea_img == 'qing'" />
              <sunrise v-if="weather.wea_img == 'wu'" />
            </el-icon>
            {{ weather.tem_night }}~{{ weather.tem_day }}℃
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
import {
  Cloudy,
  Drizzling,
  Lightning,
  MostlyCloudy,
  PartlyCloudy,
  Pouring,
  Sunny,
  Sunrise,
  CopyDocument
} from '@element-plus/icons-vue'
import { getMapInfo } from '@/api/map'
import { getImgByName } from '@/api/image'
import { ref, onMounted, reactive, toRefs, provide, getCurrentInstance } from 'vue'
import { ElMessage } from 'element-plus'
import dayjs from 'dayjs'
import LSDV from './LSDV/index.vue'
let { proxy } = getCurrentInstance()

const drawer = ref(false)
const maps = reactive({
  list: []
})

const state = reactive({
  dialogVisible: false,
  formData: {},
  nowTime: '',
  weather: {}
})
let { dialogVisible, formData, nowTime, weather } = toRefs(state)
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
  const mapInfos = await getMapInfo() // 档案数据
  const mapInfo = mapInfos.data.data
  maps.list = mapInfo
  if (mapInfo.length) {
    let marker_normal = await getImgByName('marker_normal')
    let marker_abnormal = await getImgByName('marker_abnormal')
    let markerIcon = {
      marker_normal: marker_normal.data.img,
      marker_abnormal: marker_abnormal.data.img
    }
    mapInfo.forEach((item) => {
      const pointItem = new BMapGL.Point(item.longitude, item.latitude)
      const marker = new BMapGL.Marker(pointItem, {
        icon: new BMapGL.Icon(markerIcon[item.marker], new BMapGL.Size(15, 15))
      }) // 创建标注对象并添加到地图
      marker.addEventListener('click', function (e) {
        state.formData = item
        state.dialogVisible = true
      })
      map.addOverlay(marker)
    })
  }

  // 初始化天气
  fetch('https://www.yiketianqi.com/free/day?appid=79875459&appsecret=jy5xrNDW&vue=1')
    .then((res) => {
      return res.json()
    })
    .then((res) => {
      state.weather = res
    })
})

provide('maps', maps)

const handleStac = () => {
  drawer.value = true
}

// 复制文本
const copyText = (text) => {
  const input = proxy.$refs.inputCopy
  input.value = text // 修改文本框的内容
  input.select() // 选中文本
  document.execCommand('copy') // 执行浏览器复制命令
  ElMessage({ message: '复制成功', type: 'success' })
}
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
