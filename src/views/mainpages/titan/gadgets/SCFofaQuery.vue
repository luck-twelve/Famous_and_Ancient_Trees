<template>
  <div class="app-container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="formInline.name" clearable placeholder='ip="1.1.1.1" && title="百度"'>
          <template #prepend>FOFA查询语法</template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
      </el-form-item>
    </el-form>
    <tt-table :list="list" :loading="listLoading" :column="tableColumn" @pagination="getList"></tt-table>
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
 * table
 */
const state = reactive({
  list: {},
  tableColumn: [
    { label: 'IP', prop: 'pid', sortable: true },
    { label: '端口', prop: 'name' },
    { label: '协议', prop: 'start_time', sortable: true },
    { label: '标题', prop: 'end_time' },
    { label: 'URL', prop: 'uid' },
    { label: '主域名', prop: 'create_time' }
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
