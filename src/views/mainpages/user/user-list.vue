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
    <tt-table :list="list" :loading="listLoading" :column="tableColumn" @pagination="getUserListReq"></tt-table>
  </div>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
import { toRefs, reactive, onBeforeMount } from 'vue'
import { getUserListReq } from '@/api/user'
import TtTable from '@/components/tt-components/table'

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
    { label: 'ID', prop: 'uid', sortable: true },
    { label: '用户名', prop: 'username' },
    { label: '头像', prop: 'avatar' },
    { label: '用户权限', prop: 'roles' }
  ],
  listLoading: true
})

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
