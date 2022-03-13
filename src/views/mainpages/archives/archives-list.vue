<template>
  <div class="app-container">
    <el-form :inline="true" :model="formData" class="demo-form-inline">
      <el-form-item prop="tree_nameZh">
        <el-input v-model="formData.tree_nameZh" clearable>
          <template #prepend>树名</template>
        </el-input>
      </el-form-item>
      <el-form-item prop="tree_species">
        <tt-select v-model="formData.tree_species" label="树种" :options="speciesOptions" op-label="name"></tt-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
      </el-form-item>
    </el-form>
    <tt-table :list="list" :loading="listLoading" :column="tableColumn" :search-data="formData" @pagination="getList">
      <template #header>
        <el-button type="primary" :icon="Plus" @click="handleAdd">新增</el-button>
      </template>
      <el-table-column label="状态" width="80px" align="center">
        <template #default="{ row }">
          <el-tag v-if="row.isShow == 1" type="success">正常</el-tag>
          <el-tag v-if="row.isShow == 0" type="warning">草稿</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="140px" align="center" fixed="right">
        <template #default="{ row }">
          <el-button type="text" :icon="Edit" @click="handleEdit(row)">编辑</el-button>
          <el-popconfirm
            :icon="InfoFilled"
            placement="left"
            title="删除后将无法恢复，是否确认删除?"
            @confirm="handleDelete(row)"
          >
            <template #reference>
              <el-button type="text" :icon="Delete" style="color: red">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </tt-table>
  </div>
  <archives-list-dialog
    v-model:visible="visible"
    @handle-close="handleClose"
    @handle-save="handleSave"
    @handle-submit="handleSubmit"
  ></archives-list-dialog>
</template>

<script setup>
import { Search, Plus, Edit, Delete, InfoFilled } from '@element-plus/icons-vue'
import TtSelect from '@/components/tt-components/select'
import { ref, toRefs, reactive, onBeforeMount, provide } from 'vue'
import {
  getArchivesTreeListReq,
  updateArchivesTreeReq,
  updateArchivesStatusReq,
  deleteArchivesTreeReq
} from '@/api/archives'
import { getArchivesSpeciesListReq } from '@/api/archives'
import TtTable from '@/components/tt-components/table'
import ArchivesListDialog from './archives-list-dialog.vue'
import { ElMessage } from 'element-plus'

const speciesOptions = ref([])

/**
 * 搜索
 */
const formData = reactive({
  tree_nameZh: '',
  tree_species: ''
})
const handleSearch = () => {
  getList(formData)
}

/**
 * table
 */
const state = reactive({
  list: {},
  tableColumn: [
    { label: '编号', prop: 'id', width: '250px', align: 'center', sortable: true },
    { label: '古树命名', prop: 'tree_nameZh', minWidth: '130px' },
    { label: '树种', prop: 'tree_speciesStr', width: '120px', sortable: true },
    { label: '省份', prop: 'company_province', align: 'center', width: '80px', sortable: true },
    { label: '权属', prop: 'tree_owner', align: 'center', width: '80px', sortable: true }
  ],
  listLoading: true
})

// 弹窗
const dialog = reactive({
  visible: false,
  type: 'add',
  data: {}
})
const handleClose = () => {
  dialog.visible = false
  getList(formData)
}
/**
 * 新增
 */
const handleAdd = () => {
  dialog.visible = true
  dialog.type = 'add'
  dialog.data = initForm()
}
/**
 * 编辑
 */
const handleEdit = (row) => {
  dialog.visible = true
  dialog.type = 'edit'
  dialog.data = row
}
provide('dialogInfo', dialog)
/**
 * 保存
 */
const handleSave = async (saveData) => {
  return new Promise((resolve, reject) => {
    dialog.data.tree_speciesStr = undefined
    updateArchivesTreeReq(saveData || dialog.data).then(({ data }) => {
      if (data.flag) {
        dialog.data = Object.assign(initForm(), data.data)
        resolve(data.data.id)
      } else {
        reject()
      }
    })
  })
}
/**
 * 提交
 */
const handleSubmit = async () => {
  let row = dialog.data
  if (
    !row.tree_species ||
    !row.tree_owner ||
    !row.longitude ||
    !row.latitude ||
    !row.tree_area ||
    !row.tree_location ||
    !row.keeper
  ) {
    ElMessage({ message: '请填写完整表单', type: 'warning' })
    return
  }
  if (checkLong(row.longitude) !== true) {
    ElMessage({ message: checkLong(row.longitude), type: 'warning' })
    return
  }
  if (checkLat(row.latitude) !== true) {
    ElMessage({ message: checkLat(row.latitude), type: 'warning' })
    return
  }
  const { province, city, district } = await getAddr(row)
  dialog.data.company_province = province
  dialog.data.company_city = city
  dialog.data.company_district = district
  const insertId = await handleSave(dialog.data)
  await updateArchivesStatusReq({ id: insertId })
  handleClose()
}
// 获取经纬度下省份
const getAddr = (row) => {
  return new Promise((resolve, reject) => {
    let point = new BMapGL.Point(row.longitude, row.latitude)
    const gc = new BMapGL.Geocoder()
    gc.getLocation(point, function (rs) {
      let addComp = rs.addressComponents
      let province = addComp.province[0] + addComp.province[1]
      if (addComp.province[2] === '江' || addComp.province[2] === '古') {
        province += addComp.province[2]
      }
      addComp.province = province
      resolve(addComp)
    })
  })
}

/**
 * 删除
 */
const handleDelete = (row) => {
  deleteArchivesTreeReq(row.id).then(({ data }) => {
    getList(formData)
  })
}

// 初始化
onBeforeMount(() => {
  getArchivesSpeciesListReq({
    pageNum: 1,
    pageSize: 1000
  }).then(({ data }) => {
    speciesOptions.value = data.data
    getList()
  })
})

const getList = (params = {}) => {
  state.listLoading = true
  getArchivesTreeListReq(params).then(({ data }) => {
    data.data.forEach((item) => {
      let speries = speciesOptions.value.find((xx) => xx.value === item.tree_species)
      item.tree_speciesStr = speries?.name || item.tree_species
    })
    state.list = data
    state.listLoading = false
  })
}

//导出属性到页面中使用
let { visible } = toRefs(dialog)
let { list, listLoading, tableColumn } = toRefs(state)

const initForm = () => {
  return {
    id: '', // 档案号
    listing: '', // 挂牌号
    company_province: '', // 单位 - 省（市、区）
    company_city: '', // 单位 - 市（地、州）
    company_district: '', // 单位 - 区（市、区）
    location_township: '', // 位置 - 乡镇（街道）
    location_village: '', // 位置 - 村（居委会）
    location_social: '', // 位置 - 社（组、号）
    longitude: '', // 经度
    longitude_degree: '', // 经度 - 度
    longitude_branch: '', // 经度 - 分
    longitude_second: '', // 经度 - 秒
    latitude: '', // 纬度
    latitude_degree: '', // 纬度 - 度
    latitude_branch: '', // 纬度 - 分
    latitude_second: '', // 纬度 - 秒
    location_aliasName: '', // 小地名
    tree_area: '', // 区域 - CITY / COUNTRY_SIDE
    tree_location: '', // 坐落 - UNIT_COURTYYARD / PERSONAL_HOUSE / TEMPLE / OTHERS
    tree_type: '', // 类别 - ANCIENT / FAMOUS
    tree_distribution: '', // 分布 - GROW_SCATTERED / GROUP_SHAPE
    tree_species: '', // 树种
    tree_speciesStr: '',
    tree_nameZh: '', // 中文名
    tree_nameEn: '', // 英文名
    tree_nameAlias: '', // 别名
    tree_ageReal: '', // 真实树龄
    tree_ageLegend: '', // 传说树龄
    tree_ageEstimate: '', // 估测树龄
    tree_height: '', // 树高
    ground_circumference: '', // 林分平均胸围（地围）
    crown_widthAverage: '', // 平均冠幅
    crown_widthEW: '', // 东西冠幅
    crown_widthNS: '', // 南北冠幅
    crown_altitude: '', // 海拔
    crown_slopeDirection: '', // 坡向 - east / west / south / north
    crown_slopeDegree: '', // 坡度
    crown_slopePosition: '', // 坡位
    site_soilName: '', // 立地条件 - 土壤名称
    site_compactness: '', // 立地条件 - 紧密度 - TIGHT_QUITE / TIGHT / MODERATE / LOOSE / LOOSE_QUITE
    special_conditions: '', // 特殊状况描述
    tree_owner: '', // 权属 - STATE_OWNED / COLLECTIVE / PERSONAL / OTHERS
    keeper: '', // 管辖单位或个人
    status: '' // 保护现状及建议
  }
}

// 校验经度是否符合规范
function checkLong(lng) {
  var longrg = /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,6})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/
  if (!longrg.test(lng)) {
    return '经度整数部分不超过179,小数部分不超过6位!'
  } else if (lng < 73 || lng > 135) {
    return '请输入中国境内的经度(73°~135°)'
  }
  return true
}
// 校验纬度是否符合规范
function checkLat(lat) {
  var latreg = /^(\-|\+)?([0-8]?\d{1}\.\d{0,6}|90\.0{0,6}|[0-8]?\d{1}|90)$/
  if (!latreg.test(lat)) {
    return '纬度整数部分不超过89,小数部分不超过6位!'
  } else if (lat < 4 || lat > 53) {
    return '请输入中国境内的纬度(4°~53°)'
  }
  return true
}
</script>

<style scoped lang="scss"></style>
