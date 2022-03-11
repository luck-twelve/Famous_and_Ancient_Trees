<template>
  <div class="app-container">
    <el-form :inline="true" :model="formData" class="demo-form-inline">
      <el-form-item prop="tree_nameZh">
        <el-input v-model="formData.tree_nameZh" clearable>
          <template #prepend>树名</template>
        </el-input>
      </el-form-item>
      <el-form-item prop="tree_species">
        <el-input v-model="formData.tree_species" clearable>
          <template #prepend>树种</template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
      </el-form-item>
    </el-form>
    <tt-table :list="list" :loading="listLoading" :column="tableColumn" :search-data="formData" @pagination="getList">
      <template #header>
        <el-button type="primary" :icon="Plus" @click="handleAdd">新增</el-button>
      </template>
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
    v-model:visiable="visiable"
    @handle-close="handleClose"
    @handle-save="handleSave"
    @handle-submit="handleSabmit"
  ></archives-list-dialog>
</template>

<script setup>
import { Search, Plus, Edit, Delete, InfoFilled } from '@element-plus/icons-vue'
import { toRefs, reactive, onBeforeMount, provide } from 'vue'
import {
  getArchivesTreeListReq,
  updateArchivesTreeReq,
  updateArchivesStatusReq,
  deleteArchivesTreeReq
} from '@/api/archives'
import TtTable from '@/components/tt-components/table'
import ArchivesListDialog from './archives-list-dialog.vue'
import { ElMessage } from 'element-plus'

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
    { label: '古树命名', prop: 'tree_nameZh', width: '150px' },
    { label: '树种', prop: 'tree_species', width: '150px', sortable: true },
    { label: '树龄', prop: 'tree_ageReal', width: '120px', sortable: true },
    { label: '权属', prop: 'tree_owner', minWidth: '150px' },
    { label: '管辖单位/个人', prop: 'keeper', minWidth: '150px' }
  ],
  listLoading: true
})

// 弹窗
const dialog = reactive({
  visiable: false,
  type: 'add',
  data: {}
})
const handleClose = () => {
  dialog.visiable = false
  getList(formData)
}
/**
 * 新增
 */
const handleAdd = () => {
  dialog.visiable = true
  dialog.type = 'add'
  dialog.data = initForm()
}
/**
 * 编辑
 */
const handleEdit = (row) => {
  dialog.visiable = true
  dialog.type = 'edit'
  dialog.data = row
}
provide('dialogInfo', dialog)
/**
 * 保存
 */
const handleSave = async (isSubmit) => {
  return new Promise((resolve, reject) => {
    updateArchivesTreeReq(dialog.data).then(({ data }) => {
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
const handleSabmit = async () => {
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
  let point = new BMapGL.Point(row.longitude, row.latitude)
  const gc = new BMapGL.Geocoder()
  gc.getLocation(point, function (rs) {
    const addComp = rs.addressComponents
    dialog.data.company_province = addComp.province
    dialog.data.company_city = addComp.city
    dialog.data.company_district = addComp.district
  })
  const insertId = await handleSave(true)
  await updateArchivesStatusReq({ id: insertId })
  handleClose()
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
  getList()
})

const getList = (params = {}) => {
  state.listLoading = true
  getArchivesTreeListReq(params).then(({ data }) => {
    state.list = data
    state.listLoading = false
  })
}

//导出属性到页面中使用
let { visiable } = toRefs(dialog)
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
  }
  return true
}
// 校验纬度是否符合规范
function checkLat(lat) {
  var latreg = /^(\-|\+)?([0-8]?\d{1}\.\d{0,6}|90\.0{0,6}|[0-8]?\d{1}|90)$/
  if (!latreg.test(lat)) {
    return '纬度整数部分不超过89,小数部分不超过6位!'
  }
  return true
}
</script>

<style scoped lang="scss"></style>
