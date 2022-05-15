<template>
  <div class="app-container">
    <el-form v-if="store.state.user.roles.indexOf('admin') !== -1" :inline="true" :model="formData">
      <el-form-item prop="create_user">
        <el-input v-model="formData.create_user" clearable>
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
      <el-table-column label="更多" align="center" width="55px" fixed="right">
        <template #default="{ row }">
          <el-dropdown trigger="click" placement="bottom-end">
            <el-button type="text" :icon="MoreFilled" style="color: #606266"></el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <el-button type="text" :icon="Document" style="color: #606266" @click="handleLook(row)">
                    查看
                  </el-button>
                </el-dropdown-item>
                <el-dropdown-item v-if="sysUserName === row.create_user">
                  <el-button type="text" :icon="Edit" @click="handleEdit(row)">编辑</el-button>
                </el-dropdown-item>
                <el-dropdown-item v-if="sysRoles.includes('admin')">
                  <el-button type="text" :icon="Finished" style="color: #e6a23c" @click="handleControll(row)">
                    处理
                  </el-button>
                </el-dropdown-item>
                <el-dropdown-item v-if="sysUserName === row.create_user">
                  <el-button type="text" :icon="Delete" style="color: red" @click="handleDelete(row)">删除</el-button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </el-table-column>
    </tt-table>
    <el-dialog v-model="visible" :title="`${dialogType}异常反馈`" width="450px" :before-close="handleClose">
      <el-form v-if="visible" ref="dialogForm" :model="dialogData" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="选择古树" prop="tree_name" :rules="formRulesMixin.isNotNull">
              <el-input v-if="dialogType" v-model="dialogData.tree_name" disabled>
                <template #append>
                  <el-button type="primary" :icon="Search" @click="abVisible = true"></el-button>
                </template>
              </el-input>
              <span v-else class="input-text">{{ dialogData.tree_name }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="挂牌号" prop="listing" :rules="formRulesMixin.isNotNull">
              <el-input v-if="dialogType" v-model="dialogData.listing" disabled />
              <span v-else class="input-text">{{ dialogData.listing }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="经度" prop="longitude" :rules="formRulesMixin.isNotNull">
              <el-input v-if="dialogType" v-model="dialogData.longitude" disabled />
              <span v-else class="input-text">{{ dialogData.longitude }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="纬度" prop="latitude" :rules="formRulesMixin.isNotNull">
              <el-input v-if="dialogType" v-model="dialogData.latitude" disabled />
              <span v-else class="input-text">{{ dialogData.latitude }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="异常情况" prop="ab_condition" :rules="formRulesMixin.isNotNull">
          <el-input v-if="dialogType" v-model="dialogData.ab_condition" :rows="2" type="textarea"></el-input>
          <span v-else class="input-text">{{ dialogData.ab_condition }}</span>
        </el-form-item>
        <el-form-item label="造成原因" prop="reason">
          <el-input v-if="dialogType" v-model="dialogData.reason" :rows="2" type="textarea"></el-input>
          <span v-else class="input-text">{{ dialogData.reason }}</span>
        </el-form-item>
        <el-form-item label="期望解决" prop="resolve">
          <el-input v-if="dialogType" v-model="dialogData.resolve" :rows="2" type="textarea"></el-input>
          <span v-else class="input-text">{{ dialogData.resolve }}</span>
        </el-form-item>
      </el-form>
      <template v-if="dialogType" #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="handleCommit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <ab-dialog v-model:visible="abVisible" @submit="abSubmit" @before-close="beforeAbClose"></ab-dialog>
    <ctr-dialog v-model:visible="ctrVisible" @before-close="beforeCtrClose"></ctr-dialog>
  </div>
</template>

<script setup>
import { Search, Plus, Edit, Delete, Document, MoreFilled, Finished } from '@element-plus/icons-vue'
import { toRefs, reactive, onBeforeMount, getCurrentInstance } from 'vue'
import { getAbnormalListReq, updateAbnormalReq, deleteAbnormalReq } from '@/api/abnormal'
import TtTable from '@/components/tt-components/table'
import AbDialog from './dialog.vue'
import CtrDialog from './dialog-controll.vue'
import { ElMessage } from 'element-plus'
import { computed } from 'vue'
import { useStore } from 'vuex'
let { proxy } = getCurrentInstance()
const store = useStore()

const sysUserName = computed(() => {
  return store.state.user.username
})
const sysRoles = computed(() => {
  return store.state.user.roles
})

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
    { label: '上传用户', prop: 'create_user', minWidth: '120px', sortable: true },
    { label: '上传时间', prop: 'create_time', minWidth: '150px', sortable: true }
  ],
  listLoading: true
})

const dialog = reactive({
  visible: false,
  abVisible: false,
  ctrVisible: false,
  dialogData: {},
  dialogType: ''
})
const handleClose = () => {
  dialog.visible = false
  getList(formData)
}
const beforeAbClose = () => {
  dialog.abVisible = false
}
const beforeCtrClose = () => {
  dialog.ctrVisible = false
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
 * 查看
 */
const handleLook = (row) => {
  dialog.visible = true
  dialog.dialogType = ''
  dialog.dialogData = row
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
 * 异常处理
 */
const handleControll = (row) => {
  dialog.ctrVisible = true
}
/**
 * 保存
 */
const handleCommit = async () => {
  proxy.$refs['dialogForm'].validate((valid) => {
    console.log(valid)
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
let { visible, abVisible, ctrVisible, dialogData, dialogType } = toRefs(dialog)
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
.input-text {
  font-size: 12px;
  margin-left: 10px;
}
</style>
