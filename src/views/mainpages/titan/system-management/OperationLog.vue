<template>
  <div class="app-container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="formInline.name" clearable>
          <template #prepend>项目名称</template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
      </el-form-item>
    </el-form>
    <tt-table :list="list" :loading="listLoading" :column="tableColumn" refresh @pagination="getList"></tt-table>
  </div>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
import { toRefs, reactive, onBeforeMount } from 'vue'
import { getList } from '@/api/titan/project/list'
import TtTable from '@/components/tt-components/table'

/**
 * 搜索
 */
const formInline = reactive({
  name: ''
})
const handleSearch = () => {
  console.log(formInline)
}

/**
 * 新增弹窗
 */
const dialog = reactive({
  dialogVisible: false
})
let { dialogVisible } = toRefs(dialog)
const handleAdd = () => {
  dialogVisible.value = true
}

/**
 * table
 */
const state = reactive({
  list: {},
  tableColumn: [
    { label: 'ID', prop: 'id' },
    { label: 'UID', prop: 'uid' },
    { label: '用户名', prop: 'name' },
    { label: '操作', prop: 'controll' },
    { label: 'IP', prop: 'ip' },
    { label: '位置', prop: 'address' },
    { label: '时间', prop: 'time' }
  ],
  listLoading: true
})

onBeforeMount(() => {
  fetchData()
})

const fetchData = () => {
  state.listLoading = true
  getList().then((response) => {
    state.list = response.data
    state.listLoading = false
  })
}

//导出属性到页面中使用
let { list, listLoading, tableColumn } = toRefs(state)
</script>

<style scoped lang="scss"></style>
