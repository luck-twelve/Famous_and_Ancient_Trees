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
        <el-button type="primary" :icon="Plus">新增</el-button>
      </template>
      <el-table-column label="操作" width="160px" align="center">
        <template #default="{ row }">
          <el-button type="text" :icon="Edit" @click="handleControll(row)">编辑</el-button>
          <el-button type="text" :icon="Delete" style="color: red" @click="handleControll(row)">删除</el-button>
        </template>
      </el-table-column>
    </tt-table>
  </div>
</template>

<script setup>
import { Search, Plus, Edit, Delete } from '@element-plus/icons-vue'
import { toRefs, reactive, onBeforeMount } from 'vue'
import { getArchivesListReq } from '@/api/archives'
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
    { label: 'ID', prop: 'tree_id', width: '80px', align: 'center', sortable: true },
    { label: '树名', prop: 'treeName', width: '140px' },
    { label: '树种', prop: 'treeType', width: '140px' },
    { label: '树龄', prop: 'treeAge', width: '100px' },
    { label: '地理位置', prop: 'treeLocation', width: '220px' },
    { label: '责任单位', prop: 'treeAdminister', width: '180px' },
    { label: '历史传说', prop: 'treeHistoryLegend' }
  ],
  listLoading: true
})

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
  getArchivesListReq(params).then(({ data }) => {
    state.list = data
    state.listLoading = false
  })
}

//导出属性到页面中使用
let { list, listLoading, tableColumn } = toRefs(state)
</script>

<style scoped lang="scss"></style>
