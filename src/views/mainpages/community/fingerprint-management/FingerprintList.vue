<template>
  <div class="app-container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="formInline.name" clearable>
          <template #prepend>产品名称</template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="formInline.name" clearable>
          <template #prepend>提交人</template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <tt-select v-model="formInline.pid" label="等级" :options="projectOptions"></tt-select>
      </el-form-item>
      <el-form-item>
        <tt-select v-model="formInline.pid" label="状态" :options="projectOptions"></tt-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
      </el-form-item>
    </el-form>
    <tt-table :list="list" :loading="listLoading" :column="tableColumn" @pagination="getList">
      <template #header>
        <el-button type="primary" :icon="Plus" @click="handleAdd">新增指纹</el-button>
      </template>
    </tt-table>
    <el-dialog v-model="dialogVisible" width="70%" title="新增指纹">
      <el-scrollbar height="500px">
        <fingerprint-submit />
      </el-scrollbar>
    </el-dialog>
  </div>
</template>

<script setup>
import { Search, Plus } from '@element-plus/icons-vue'
import { toRefs, reactive, onBeforeMount } from 'vue'
import { getList } from '@/api/titan/project/list'
import TtSelect from '@/components/tt-components/select'
import TtTable from '@/components/tt-components/table'
import FingerprintSubmit from './FingerprintSubmit.vue'

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
    { label: 'ID', prop: 'pid', width: '60px', sortable: true },
    { label: '产品名称', prop: 'name', width: '200px' },
    { label: '开发单位', prop: 'name' },
    { label: '等级', prop: 'uid', width: '80px' },
    { label: '状态', prop: 'uid', width: '100px' },
    { label: '积分', prop: 'uid', width: '80px' },
    { label: '提交人', prop: 'uid', width: '120px' },
    { label: '提交时间', prop: 'create_time', width: '120px' }
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

<style scoped lang="scss">
.app-container:deep(.el-overlay) {
  top: auto;
  overflow: hidden;
}
.app-container:deep(.el-overlay-dialog) {
  top: -8vh;
  overflow: hidden;
}
</style>
