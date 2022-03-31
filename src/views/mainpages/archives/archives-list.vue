<template>
  <div class="app-container">
    <el-form :inline="true" :model="formData" class="demo-form-inline">
      <el-form-item prop="id">
        <el-input v-model="formData.id" clearable>
          <template #prepend>编号</template>
        </el-input>
      </el-form-item>
      <el-form-item prop="tree_nameZh">
        <el-input v-model="formData.tree_nameZh" clearable>
          <template #prepend>树名</template>
        </el-input>
      </el-form-item>
      <el-form-item prop="tree_species">
        <tt-select
          v-model="formData.tree_species"
          class="widthPx-180"
          label="树种"
          :options="speciesOptions"
          op-label="name"
        ></tt-select>
      </el-form-item>
      <el-form-item prop="isShow">
        <tt-select v-model="formData.isShow" class="widthPx-180" label="状态" :options="statusOptions"></tt-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
      </el-form-item>
    </el-form>
    <tt-table
      :list="list"
      :loading="listLoading"
      :column="tableColumn"
      :search-data="formData"
      :no-header="isDialog"
      :multiple="isDialog"
      :default-page-size="isDialog ? 5 : 10"
      @pagination="getList"
      @selection-change="handleSelectionChange"
    >
      <template v-if="!isDialog" #header>
        <el-button type="primary" :icon="Plus" @click="handleAdd">新增</el-button>
      </template>
      <el-table-column label="状态" width="80px" align="center">
        <template #default="{ row }">
          <el-tag v-if="row.isShow == 0" type="warning">草稿</el-tag>
          <el-tag v-if="row.isShow == 1 && row.marker == 'marker_normal'" type="success">正常</el-tag>
          <el-tag v-if="row.isShow == 2" type="info">待审核</el-tag>
          <el-popover
            v-if="row.isShow == 3"
            placement="top-end"
            title=""
            trigger="hover"
            :content="`原因：${row.reason}`"
          >
            <template #reference>
              <el-tag type="danger">已驳回</el-tag>
            </template>
          </el-popover>
          <el-tag v-if="row.marker == 'marker_abnormal'" type="danger">异常</el-tag>
        </template>
      </el-table-column>
      <el-table-column v-if="!isDialog" label="更多" width="55px" align="center" fixed="right">
        <template #default="{ row }">
          <el-dropdown trigger="click" placement="bottom-end">
            <el-button type="text" :icon="MoreFilled" style="color: #606266"></el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <el-button
                    v-if="row.isShow == 2"
                    type="text"
                    :icon="Finished"
                    style="color: #e6a23c"
                    @click="handleVerify(row)"
                  >
                    审核
                  </el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button type="text" :icon="Document" style="color: #606266" @click="handleLook(row)">
                    查看
                  </el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button type="text" :icon="Edit" @click="handleEdit(row)">编辑</el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button type="text" :icon="Delete" style="color: red" @click="handleDelete(row)">删除</el-button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </el-table-column>
    </tt-table>
  </div>
  <archives-list-dialog
    v-model:visible="visible"
    @handle-close="handleClose"
    @handle-save="handleSave"
    @handle-submit="handleSubmit"
    @handle-verify-no="handleVerifyNo"
    @handle-verify-yes="handleVerifyYes"
  ></archives-list-dialog>
</template>

<script setup>
import { Search, Plus, MoreFilled, Document, Edit, Finished, Delete, InfoFilled } from '@element-plus/icons-vue'
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
import { ElMessage, ElMessageBox } from 'element-plus'
const emit = defineEmits(['selectionChange'])

const props = defineProps({
  isDialog: {
    type: Boolean,
    default: false
  }
})
let { isDialog } = toRefs(props)

/**
 * 搜索
 */
const formData = reactive({
  id: '',
  tree_nameZh: '',
  tree_species: '',
  isShow: ''
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
    { label: '编号', prop: 'id', width: '260px' },
    { label: '古树命名', prop: 'tree_nameZh', minWidth: '130px' },
    { label: '树种', prop: 'tree_speciesStr', width: '120px', sortable: true },
    { label: '省份', prop: 'company_province', align: 'center', width: '100px', sortable: true },
    { label: '权属', prop: 'tree_owner', align: 'center', width: '100px', sortable: true },
    { label: '建档人', prop: 'create_user', align: 'center', width: '100px', sortable: true }
  ],
  listLoading: true
})

/**
 * 多选
 */
const handleSelectionChange = (val) => {
  emit('selectionChange', val)
}

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
 * 查看
 */
const handleLook = (row) => {
  dialog.visible = true
  dialog.type = 'look'
  dialog.data = row
}
/**
 * 编辑
 */
const handleEdit = (row) => {
  dialog.visible = true
  dialog.type = 'edit'
  dialog.data = row
}
/**
 * 审核
 */
const handleVerify = (row) => {
  dialog.visible = true
  dialog.type = 'verify'
  dialog.data = row
}
provide('dialogInfo', dialog)
/**
 * 保存
 */
const handleSave = async (saveData) => {
  return new Promise((resolve, reject) => {
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
  await updateArchivesStatusReq({ id: insertId, isShow: 2 })
  handleClose()
}

/**
 * 驳回
 */
const handleVerifyNo = async (val) => {
  let { id, reason } = val
  await updateArchivesStatusReq({ id, reason, isShow: 3 })
  handleClose()
}

/**
 * 审批通过
 */
const handleVerifyYes = async (id) => {
  await updateArchivesStatusReq({ id, isShow: 1 })
  handleClose()
}

/**
 * 删除
 */
const handleDelete = (row) => {
  ElMessageBox.confirm('删除后将无法恢复，是否确认删除?', '警告', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
    showClose: false
  }).then(() => {
    deleteArchivesTreeReq(row.id).then(({ data }) => {
      getList(formData)
    })
  })
}

const statusOptions = ref([
  { label: '草稿', value: '0' },
  { label: '审核通过', value: '1' },
  { label: '待审核', value: '2' },
  { label: '已驳回', value: '3' }
])

// 初始化
const speciesOptions = ref([])
onBeforeMount(() => {
  getArchivesSpeciesListReq({
    pageNum: 1,
    pageSize: 1000
  }).then(({ data }) => {
    speciesOptions.value = data.data
    if (isDialog.value) {
      getList({
        pageNum: 1,
        pageSize: 5
      })
    } else getList()
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
