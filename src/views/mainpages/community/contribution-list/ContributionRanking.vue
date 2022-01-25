<template>
  <div class="app-container">
    <tt-table :list="list" :loading="listLoading" :column="tableColumn" no-header @pagination="getList"></tt-table>
  </div>
</template>

<script setup>
import { toRefs, reactive, onBeforeMount } from 'vue'
import { getList } from '@/api/titan/project/list'
import TtTable from '@/components/tt-components/table'

/**
 * table
 */
const state = reactive({
  list: {},
  tableColumn: [
    { label: '排行', prop: 'pid' },
    { label: '用户名', prop: 'name' },
    { label: '积分', prop: 'start_time' },
    { label: '有效指纹提交数', prop: 'end_time', sortable: true },
    { label: '有效POC提交数', prop: 'uid', sortable: true }
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

/**
 * 操作
 */
const handleControll = (row) => {
  console.log(row.name)
}

//导出属性到页面中使用
let { list, listLoading, tableColumn } = toRefs(state)
</script>

<style scoped lang="scss"></style>
