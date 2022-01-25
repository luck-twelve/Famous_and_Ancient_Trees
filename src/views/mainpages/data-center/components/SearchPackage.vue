<template>
  <div class="app-container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item>
        <el-input
          v-model="formInline.name"
          clearable
          placeholder='url.host="abc.com" and url.port=80'
          style="width: 500px"
        >
          <template #prepend>查询语句</template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
      </el-form-item>
    </el-form>
    <tt-table :list="list" :loading="listLoading" :column="tableColumn" no-header @pagination="getList"></tt-table>
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
    { label: 'Method', prop: 'pid' },
    { label: 'Url', prop: 'name' },
    { label: 'Title', prop: 'start_time' },
    { label: 'cid', prop: 'end_time' },
    { label: 'Source', prop: 'uid' },
    { label: '加入时间', prop: 'create_time' }
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
