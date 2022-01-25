<template>
  <div class="app-container">
    <el-form :inline="true" :model="searchData" class="demo-form-inline">
      <el-form-item>
        <tt-select v-model="searchData.pid" label="项目" :options="projectOptions"></tt-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchData.name" clearable>
          <template #prepend>厂商</template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <tt-select v-model="searchData.corp_type" label="类型" :options="typeOptions"></tt-select>
      </el-form-item>
      <el-form-item>
        <tt-select v-model="searchData.status" label="状态" :options="statusOptions"></tt-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
      </el-form-item>
    </el-form>
    <tt-table multiple :list="list" :loading="listLoading" :column="tableColumn">
      <template #header>
        <el-button type="primary" :icon="Plus" @click="handleAdd">添加厂商</el-button>
        <el-button type="danger" :icon="Delete">删除</el-button>
      </template>
      <el-table-column label="操作" width="180px" align="center">
        <template #default="{ row }">
          <tt-mini-button type="primary" @click="handleControll(row)">创建任务</tt-mini-button>
          <tt-mini-button @click="handleControll(row)">资产详情</tt-mini-button>
        </template>
      </el-table-column>
    </tt-table>
  </div>
  <dialog-add-vendor v-model:dialogVisible="dialogVisible"></dialog-add-vendor>
</template>

<script setup>
import { Search, Plus, Delete } from '@element-plus/icons-vue'
import { toRefs, reactive, onBeforeMount } from 'vue'
import { getVendorList } from '@/api/titan/project/list'
import TtSelect from '@/components/tt-components/select'
import TtTable from '@/components/tt-components/table'
import TtMiniButton from '@/components/tt-components/button/TtMiniButton.vue'
import DialogAddVendor from './components/DialogAddVendor.vue'

// 页码数据
const pageOptions = reactive({
  page: 1,
  pageSize: 10,
  total: 0
})

// 搜索表单
const searchData = reactive({
  pid: '38', // 项目
  name: '', // 厂商名称
  corp_type: '', // 类型
  status: '' // 状态
})
// 搜索
const handleSearch = () => {
  console.log(searchData)
}

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

// table数据
const state = reactive({
  list: {},
  tableColumn: [
    { label: '项目ID', prop: 'pid' },
    { label: '厂商ID', prop: 'cid' },
    { label: '厂商名称', prop: 'name' },
    { label: '厂商类型', prop: 'corp_type' },
    { label: '状态', prop: 'status' },
    { label: 'UID', prop: 'uid' },
    { label: '创建时间', prop: 'create_time' }
  ],
  listLoading: true
})

onBeforeMount(() => {
  fetchData()
})

const fetchData = () => {
  state.listLoading = true
  getVendorList().then((response) => {
    state.list = response.data
    state.listLoading = false
  })
}
/**
 * 操作
 * params
 * type--vendor
 * type--menber
 * type--panel
 */
const handleControll = (row, type) => {
  switch (type) {
    case 'vendor':
      console.log(row.name)
      break
    case 'menber':
      console.log(row.name)
      break
    case 'panel':
      console.log(row.name)
      break
  }
}

//导出属性到页面中使用
let { list, listLoading, tableColumn } = toRefs(state)

// 项目下拉列表
const projectOptions = [{ label: '测试项目', value: '38' }]
// 类型下拉列表
const typeOptions = [
  { label: '原厂', value: '0' },
  { label: '子公司', value: '1' },
  { label: '母公司', value: '2' },
  { label: '供应商', value: '3' },
  { label: 'C段', value: '4' }
]
// 状态下拉列表
const statusOptions = [
  { label: '正常', value: '0' },
  { label: '打点中', value: '1' },
  { label: '内网中', value: '2' },
  { label: '已打穿', value: '3' },
  { label: '已出局', value: '4' }
]
</script>

<style scoped lang="scss"></style>
