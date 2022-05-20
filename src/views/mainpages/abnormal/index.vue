<template>
  <input ref="inputCopy" value="" style="opacity: 0; position: absolute" />
  <div class="app-container ttDialog">
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
      <el-table-column label="状态" align="center" width="100px" fixed="right">
        <template #default="{ row }">
          <el-tag :type="tagsOptions(row.status).type" @click="handleLook(row)">
            {{ tagsOptions(row.status).label }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="更多" align="center" width="55px" fixed="right">
        <template #default="{ row }">
          <el-dropdown trigger="click" placement="bottom-end">
            <el-button type="text" :icon="MoreFilled" style="color: #606266"></el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-if="sysRoles.includes('admin') && !row.status">
                  <el-button type="text" :icon="Finished" style="color: #e6a23c" @click="handleControll(row)">
                    处理
                  </el-button>
                </el-dropdown-item>
                <el-dropdown-item
                  v-if="row.status == 'resolve' && (sysRealName == row.resolve_user || sysUserName == row.resolve_user)"
                >
                  <el-button type="text" :icon="Finished" style="color: #e6a23c" @click="handleControll(row, true)">
                    调整
                  </el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button type="text" :icon="Document" style="color: #606266" @click="handleLook(row)">
                    查看
                  </el-button>
                </el-dropdown-item>
                <el-dropdown-item v-if="sysUserName === row.create_user && !row.status">
                  <el-button type="text" :icon="Edit" @click="handleEdit(row)">编辑</el-button>
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
    <el-dialog v-model="visible" width="450px" :before-close="handleClose">
      <template #title>
        <span>异常反馈{{ dialogType }}</span>
        <el-tag v-if="!dialogType" :type="tagsOptions(dialogData.status).type" class="input-text">
          {{ tagsOptions(dialogData.status).label }}
        </el-tag>
        <span v-if="dialogData.status == 'resolve'">
          <span class="input-text">处理人: {{ dialogData.resolve_user }}</span>
          <span class="input-text">预计完成时间: {{ timeOptions(dialogData.expect_finish_time) }}</span>
        </span>
        <span v-if="dialogData.status == 'reject'" class="input-text">原因: {{ dialogData.reject_reason }}</span>
        <span v-if="dialogData.status == 'finish'">
          <span class="input-text">处理人: {{ dialogData.resolve_user }}</span>
          <span class="input-text">{{ dialogData.finish_time }}</span>
        </span>
      </template>
      <el-form v-if="visible" ref="dialogForm" :model="dialogData" label-width="80px">
        <el-form-item label="异常古树" prop="tree_name" :rules="formRulesMixin.isNotNull">
          <span v-if="dialogData.tree_name" class="input-text" style="padding-right: 10px">
            {{ dialogData.tree_name }}
          </span>
          <el-button
            v-if="dialogType"
            type="text"
            :icon="dialogData.tree_name ? Switch : Search"
            @click="abVisible = true"
          >
            <span v-if="dialogData.tree_name">重新选择</span>
            <span v-else>选择</span>
          </el-button>
          <span v-if="!dialogType" class="input-text">
            编号: {{ dialogData.tree_id }}
            <el-icon style="color: #303133; cursor: pointer" @click="() => copyText(dialogData.tree_id)">
              <copy-document />
            </el-icon>
          </span>
        </el-form-item>
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
    <ctr-dialog
      v-model:visible="ctrVisible"
      :row-data="dialog.dialogData"
      :is-controll="dialog.isControll"
      @submit="ctrSubmit"
      @before-close="beforeCtrClose"
    ></ctr-dialog>
  </div>
</template>

<script setup>
import {
  Search,
  Switch,
  Plus,
  Edit,
  Delete,
  Document,
  MoreFilled,
  Finished,
  CopyDocument
} from '@element-plus/icons-vue'
import { toRefs, reactive, computed, onBeforeMount, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import TtTable from '@/components/tt-components/table'
import AbDialog from './dialog.vue'
import CtrDialog from './dialog-controll.vue'
import { getAbnormalListReq, updateAbnormalReq, deleteAbnormalReq } from '@/api/abnormal'
let { proxy } = getCurrentInstance()
const store = useStore()

const sysUserName = computed(() => {
  return store.state.user.username
})
const sysRealName = computed(() => {
  return store.state.user.realname
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
    { label: '经度', prop: 'longitude', minWidth: '120px', sortable: true },
    { label: '纬度', prop: 'latitude', minWidth: '120px', sortable: true },
    { label: '反馈用户', prop: 'create_user', minWidth: '120px', sortable: true },
    { label: '反馈时间', prop: 'create_time', minWidth: '150px', sortable: true }
  ],
  listLoading: true
})

const dialog = reactive({
  visible: false,
  abVisible: false,
  ctrVisible: false,
  isControll: false,
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
  dialog.isControll = false
}
/**
 * 选择档案
 */
const abSubmit = (val) => {
  dialog.dialogData.tree_name = val.tree_nameZh
  dialog.dialogData.tree_id = val.id
  dialog.dialogData.longitude = val.longitude
  dialog.dialogData.latitude = val.latitude
}

// 提交处理后触发
const ctrSubmit = () => {
  handleSearch()
}

/**
 * 新增
 */
const handleAdd = () => {
  dialog.visible = true
  dialog.dialogType = '上报'
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
const handleControll = (row, isControll = false) => {
  dialog.dialogData = row
  dialog.ctrVisible = true
  dialog.isControll = isControll
}
/**
 * 保存
 */
const handleCommit = async () => {
  proxy.$refs['dialogForm'].validate((valid) => {
    if (valid) {
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
    tree_name: '', // 古树名称
    tree_id: '', // 古树编号
    longitude: '', // 经度
    latitude: '', // 纬度
    reason: '', // 造成原因
    ab_condition: '', // 异常情况
    resolve: '' // 期望解决
  }
}

const tagsOptions = (status) => {
  if (!status) {
    return { label: '待处理', type: 'info' }
  }
  const options = {
    resolve: {
      label: '处理中',
      type: ''
    },
    reject: {
      label: '不予解决',
      type: 'error'
    },
    finish: {
      label: '已解决',
      type: 'success'
    }
  }
  return {
    label: options[status].label,
    type: options[status].type
  }
}
const timeOptions = (time) => {
  if (!time) return '时间不定'
  return `${time}天后`
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
  &:deep(.el-tag) {
    cursor: pointer;
  }
}
.input-text {
  font-size: 12px;
  margin-left: 10px;
}
</style>
