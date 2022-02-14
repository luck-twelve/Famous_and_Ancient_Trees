<template>
  <div class="app-container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item prop="username">
        <el-input v-model="formInline.username" clearable>
          <template #prepend>用户名</template>
        </el-input>
      </el-form-item>
      <el-form-item prop="roles">
        <el-input v-model="formInline.roles" clearable>
          <template #prepend>用户权限</template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
      </el-form-item>
    </el-form>
    <tt-table :list="list" :loading="listLoading" :column="tableColumn" @pagination="getUserListReq">
      <template #header>
        <el-button type="primary" :icon="Plus" @click="handleAdd">新增</el-button>
      </template>
      <el-table-column label="操作" width="160px" align="center">
        <template #default="{ row }">
          <el-button type="text" :icon="Edit" @click="handleControll(row)">编辑</el-button>
          <el-button type="text" :icon="Delete" style="color: red" @click="handleControll(row)">删除</el-button>
        </template>
      </el-table-column>
    </tt-table>
  </div>
  <user-list-dialog v-model:dialogVisible="dialogVisible"></user-list-dialog>
</template>

<script setup>
import { Search, Plus, Edit, Delete } from '@element-plus/icons-vue'
import { toRefs, reactive, onBeforeMount } from 'vue'
import { getUserListReq } from '@/api/user'
import TtTable from '@/components/tt-components/table'
import UserListDialog from './user-list-dialog.vue'

/**
 * 搜索
 */
const formInline = reactive({
  username: '',
  roles: ''
})
const handleSearch = () => {
  fetchData(formInline)
}

/**
 * table
 */
const state = reactive({
  list: {},
  tableColumn: [
    { label: 'ID', prop: 'uid', width: '80px', align: 'center', sortable: true },
    { label: '用户名', prop: 'username', width: '120px' },
    { label: '头像', prop: 'avatar' },
    { label: '用户权限', prop: 'roles', width: '120px', align: 'center' }
  ],
  listLoading: true
})

/**
 * 新增弹窗
 */
const dialog = reactive({
  dialogVisible: false
})
const handleAdd = () => {
  dialog.dialogVisible = true
}
let { dialogVisible } = toRefs(dialog)

/**
 * 操作
 */
const handleControll = (row) => {
  console.log(row.name)
}

onBeforeMount(() => {
  fetchData()
})

const fetchData = (params = {}) => {
  state.listLoading = true
  getUserListReq(params).then(({ data }) => {
    state.list = data
    state.listLoading = false
  })
}

//导出属性到页面中使用
let { list, listLoading, tableColumn } = toRefs(state)
</script>

<style scoped lang="scss"></style>
