<template>
  <div class="app-container">
    <el-form :inline="true" :model="formData" class="demo-form-inline">
      <el-form-item prop="treeName">
        <el-input v-model="formData.treeName" clearable>
          <template #prepend>树名</template>
        </el-input>
      </el-form-item>
      <el-form-item prop="treeType">
        <el-input v-model="formData.treeType" clearable>
          <template #prepend>树种</template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
      </el-form-item>
    </el-form>
    <tt-table no-header :list="list" :loading="listLoading" :column="tableColumn" :search-data="formData"></tt-table>
  </div>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
import { toRefs, reactive } from 'vue'
import TtTable from '@/components/tt-components/table'

/**
 * 搜索
 */
const formData = reactive({
  treeName: '',
  treeType: ''
})
const handleSearch = () => {
  console.log(formData)
}

/**
 * table
 */
const state = reactive({
  list: {},
  tableColumn: [
    { label: 'ID', prop: 'tree_id', width: '80px', align: 'center', sortable: true },
    { label: '树名', prop: 'treeName', width: '140px' },
    { label: '树种', prop: 'treeType', width: '140px', sortable: true },
    { label: '树龄', prop: 'treeAge', width: '120px', sortable: true },
    { label: '地理位置', prop: 'treeLocation', minWidth: '220px' },
    { label: '责任单位', prop: 'treeAdminister', minWidth: '220px' }
    // { label: '历史传说', prop: 'treeHistoryLegend', minWidth: '300px' }
  ],
  listLoading: true
})

//导出属性到页面中使用
let { list, listLoading, tableColumn } = toRefs(state)
</script>

<style scoped lang="scss"></style>
