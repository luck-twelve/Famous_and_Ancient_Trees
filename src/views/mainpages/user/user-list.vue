<template>
  <div class="app-container">
    <el-form :inline="true" :model="formData" class="demo-form-inline">
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
  </div>
  <user-list-dialog
    v-model:dialogVisible="dialogVisible"
    :dialog-type="dialogType"
    :dialog-data="dialogData"
    @success="getList"
  ></user-list-dialog>
</template>

<script setup>
import { Search, Plus, Edit, Delete, InfoFilled } from '@element-plus/icons-vue'
import { toRefs, reactive, onBeforeMount } from 'vue'
import { getUserListReq, deleteUserReq } from '@/api/user'
import TtSelect from '@/components/tt-components/select'
import TtTable from '@/components/tt-components/table'
import UserListDialog from './user-list-dialog.vue'

/**
 * 搜索
 */
const formData = reactive({
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
    { label: '编号', prop: 'id', width: '260px' },
    { label: '用户名', prop: 'username', width: '120px' },
    { label: '头像', prop: 'avatar', minWidth: '450px' },
    { label: '用户权限', prop: 'roles', width: '110px', align: 'center', sortable: true }
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
  dialog.dialogData = {}
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

<style scoped lang="scss"></style>
