<template>
  <div class="app-container">
    <el-form v-if="store.state.user.roles.indexOf('admin') !== -1" :inline="true" :model="formData">
      <el-form-item prop="username">
        <el-input v-model="formData.username" clearable>
          <template #prepend>上报人</template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
      </el-form-item>
    </el-form>
    <tt-table :list="list" :loading="listLoading" :column="tableColumn" :search-data="formData" @pagination="getList">
      <template #header>
        <el-button type="primary" :icon="Plus" @click="handleAdd">新增反馈</el-button>
      </template>
      <el-table-column label="操作" width="130px" align="center" fixed="right">
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
    <el-dialog v-model="visible" :title="`${dialogType}异常反馈`" width="450px" :before-close="handleClose">
      <el-form v-if="visible" ref="dialogForm" :model="dialogData" label-width="80px">
        <el-form-item label="选择古树" prop="tree_name" :rules="formRulesMixin.isNotNull">
          <el-input v-model="dialogData.tree_name" disabled>
            <template #append>
              <el-button type="primary" :icon="Search" @click="abVisible = true">选择</el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="挂牌号" prop="listing" :rules="formRulesMixin.isNotNull">
          <el-input v-model="dialogData.listing" disabled />
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="经度" prop="longitude" :rules="formRulesMixin.isNotNull">
              <el-input v-model="dialogData.longitude" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="纬度" prop="latitude" :rules="formRulesMixin.isNotNull">
              <el-input v-model="dialogData.latitude" disabled />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="异常情况" prop="ab_condition" :rules="formRulesMixin.isNotNull">
          <el-input v-model="dialogData.ab_condition" :rows="2" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="造成原因" prop="reason">
          <el-input v-model="dialogData.reason" :rows="2" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="期望解决" prop="resolve">
          <el-input v-model="dialogData.resolve" :rows="2" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="handleCommit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <ab-dialog v-model:visible="abVisible" @submit="abSubmit" @before-close="handleAbClose"></ab-dialog>
  </div>
</template>

<script setup>
import { Search, Plus, Edit, Delete, InfoFilled } from '@element-plus/icons-vue'
import { toRefs, reactive, onBeforeMount, getCurrentInstance } from 'vue'
import { getAbnormalListReq, updateAbnormalReq, deleteAbnormalReq } from '@/api/abnormal'
import TtTable from '@/components/tt-components/table'
import AbDialog from './dialog.vue'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'
let { proxy } = getCurrentInstance()
const store = useStore()

/**
 * 搜索
 */
const formData = reactive({
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
    // { label: '编号', prop: 'id', width: '160px' },
    { label: '古树名称', prop: 'tree_name', minWidth: '130px' },
    { label: '挂牌号', prop: 'listing', minWidth: '130px' },
    { label: '经度', prop: 'longitude', minWidth: '120px', sortable: true },
    { label: '纬度', prop: 'latitude', minWidth: '120px', sortable: true },
    { label: '上传用户', prop: 'username', minWidth: '120px', sortable: true },
    { label: '上传时间', prop: 'create_time', minWidth: '150px', sortable: true }
  ],
  listLoading: true
})

const dialog = reactive({
  visible: false,
  abVisible: false,
  dialogData: {},
  dialogType: ''
})
const handleClose = () => {
  dialog.visible = false
  getList(formData)
}
const handleAbClose = () => {
  dialog.abVisible = false
}
/**
 * 选择档案
 */
const abSubmit = (val) => {
  dialog.dialogData.tree_name = val.tree_nameZh
  dialog.dialogData.listing = val.listing
  dialog.dialogData.longitude = val.longitude
  dialog.dialogData.latitude = val.latitude
}

/**
 * 新增
 */
const handleAdd = () => {
  dialog.visible = true
  dialog.dialogType = '上传'
  dialog.dialogData = initForm()
}
/**
 * 编辑
 */
const handleEdit = (row) => {
  dialog.visible = true
  dialog.dialogType = '编辑'
  dialog.dialogData = row
}
/**
 * 保存
 */
const handleCommit = async () => {
  proxy.$refs['dialogForm'].validate((valid) => {
    if (valid) {
      if (checkLong(dialog.dialogData.longitude) !== true) {
        ElMessage({ message: checkLong(dialog.dialogData.longitude), type: 'warning' })
        return
      }
      if (checkLat(dialog.dialogData.latitude) !== true) {
        ElMessage({ message: checkLat(dialog.dialogData.latitude), type: 'warning' })
        return
      }
      updateAbnormalReq(dialog.dialogData).then(({ data }) => {
        if (data.flag) {
          handleClose()
        }
      })
    } else {
      return false
    }
  })
}

/**
 * 删除
 */
const handleDelete = (row) => {
  deleteAbnormalReq(row).then(() => {
    getList(formData)
  })
}

// 初始化
onBeforeMount(() => {
  getList()
})

const getList = (params = {}) => {
  state.listLoading = true
  getAbnormalListReq(params).then(({ data }) => {
    state.list = data
    state.listLoading = false
  })
}

//导出属性到页面中使用
let { visible, abVisible, dialogData, dialogType } = toRefs(dialog)
let { list, listLoading, tableColumn } = toRefs(state)

const initForm = () => {
  return {
    id: '', // 编号
    tree_name: '', // 树名
    listing: '', // 挂牌号
    longitude: '', // 经度
    latitude: '', // 纬度
    reason: '', // 造成原因
    ab_condition: '', // 异常情况
    resolve: '' // 期望解决
  }
}

// 校验经度是否符合规范
function checkLong(lng) {
  var longrg = /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,6})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/
  if (lng < 73 || lng > 135) {
    return '请输入中国境内的经度(73°~135°)'
  } else if (!longrg.test(lng)) {
    return '经度整数部分不超过179,小数部分不超过6位!'
  }
  return true
}
// 校验纬度是否符合规范
function checkLat(lat) {
  var latreg = /^(\-|\+)?([0-8]?\d{1}\.\d{0,6}|90\.0{0,6}|[0-8]?\d{1}|90)$/
  if (lat < 4 || lat > 53) {
    return '请输入中国境内的纬度(4°~53°)'
  } else if (!latreg.test(lat)) {
    return '纬度整数部分不超过89,小数部分不超过6位!'
  }
  return true
}
</script>

<style scoped lang="scss">
.app-container {
  &:deep(.el-input-group__append) {
    background-color: var(--el-color-primary);
    color: var(--el-color-white);
    border: 1px solid var(--el-color-primary);
    &:hover {
      background-color: var(--el-color-primary-light-2);
      border: 1px solid var(--el-color-primary-light-2);
    }
  }
}
</style>
