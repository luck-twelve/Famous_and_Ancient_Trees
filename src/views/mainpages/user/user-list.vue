<template>
  <div class="app-container">
    <el-form :inline="true" :model="formData" class="demo-form-inline">
      <el-form-item prop="id">
        <el-input v-model="formData.id" clearable>
          <template #prepend>编号</template>
        </el-input>
      </el-form-item>
      <el-form-item prop="username">
        <el-input v-model="formData.username" clearable>
          <template #prepend>用户名</template>
        </el-input>
      </el-form-item>
      <el-form-item prop="roles">
        <tt-select v-model="formData.roles" label="用户权限" :options="rolesOptions"></tt-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
      </el-form-item>
    </el-form>
    <tt-table
      v-model:list="list"
      :loading="listLoading"
      :column="tableColumn"
      :search-data="formData"
      @pagination="getList"
    >
      <template #header>
        <el-button type="primary" :icon="Plus" @click="handleAdd">新增</el-button>
      </template>
      <el-table-column label="头像" align="center">
        <template #default="{ row }">
          <el-avatar shape="square" :src="row.avatar" />
        </template>
      </el-table-column>
      <el-table-column label="用户权限" align="center">
        <template #default="{ row }">
          <el-tag :type="row.tag">{{ row.roles }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" width="160px">
        <template #default="{ row }">
          {{ row.create_time }}
        </template>
      </el-table-column>
      <el-table-column label="更新时间" align="center" width="160px">
        <template #default="{ row }">
          {{ row.update_time }}
        </template>
      </el-table-column>
      <el-table-column label="编号" min-width="260px">
        <template #default="{ row }">
          {{ row.id }}
        </template>
      </el-table-column>
      <el-table-column label="更多" align="center" width="55px" fixed="right">
        <template #default="{ row }">
          <el-dropdown v-if="sysUserName != row.username" trigger="click" placement="bottom-end">
            <el-button type="text" :icon="MoreFilled" style="color: #606266"></el-button>
            <template #dropdown>
              <el-dropdown-menu>
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
  <user-list-dialog
    v-model:dialogVisible="dialogVisible"
    :dialog-type="dialogType"
    :dialog-data="dialogData"
    @success="getList"
  ></user-list-dialog>
</template>

<script setup>
import { Search, Plus, Edit, Delete, MoreFilled } from '@element-plus/icons-vue'
import { toRefs, reactive, onBeforeMount } from 'vue'
import { getUserListReq, deleteUserReq } from '@/api/user'
import TtSelect from '@/components/tt-components/select'
import TtTable from '@/components/tt-components/table'
import UserListDialog from './user-list-dialog.vue'

import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const sysUserName = computed(() => {
  return store.state.user.username
})

/**
 * 搜索
 */
const formData = reactive({
  id: '',
  username: '',
  roles: ''
})
const rolesOptions = [
  { label: '管理员', value: 'admin' },
  { label: '工作人员', value: 'worker' },
  { label: '普通用户', value: 'people' }
]
const handleSearch = () => {
  getList(formData)
}

/**
 * table
 */
const state = reactive({
  list: {},
  tableColumn: [
    // { label: '编号', prop: 'id', minWidth: '260px' },
    { label: '用户名', prop: 'username', width: '120px' }
  ],
  listLoading: false
})

// 弹窗
const dialog = reactive({
  dialogType: 'add',
  dialogVisible: false,
  dialogData: {}
})

/**
 * 新增
 */
const handleAdd = () => {
  dialog.dialogType = 'add'
  dialog.dialogVisible = true
  dialog.dialogData = {
    avatar: 'http://ywcd.cc/wp-content/uploads/2022/04/1649139262-avatar01.png',
    roles: 'people'
  }
}

/**
 * 编辑
 */
const handleEdit = (row) => {
  dialog.dialogType = 'edit'
  dialog.dialogVisible = true
  dialog.dialogData = row
}

/**
 * 删除
 */
const handleDelete = (row) => {
  deleteUserReq(row.id).then(() => {
    getList()
  })
}

// 初始化
onBeforeMount(() => {
  getList()
})

const getList = (params = {}) => {
  state.listLoading = true
  getUserListReq(params).then(({ data }) => {
    state.list = data
    state.listLoading = false
  })
}

//导出属性到页面中使用
let { dialogVisible, dialogType, dialogData } = toRefs(dialog)
let { list, listLoading, tableColumn } = toRefs(state)
</script>

<style scoped lang="scss">
.el-avatar {
  --el-avatar-bg-color: none !important;
}
</style>
