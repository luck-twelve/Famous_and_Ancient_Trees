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
    <tt-table :list="list" :loading="listLoading" :column="tableColumn" @pagination="getList">
      <template #header>
        <el-alert title="如有新的项目需使用Titan，请重新申请" type="warning" show-icon :closable="false"></el-alert>
        <!-- <el-button type="primary">如有新的项目需使用Titan，请重新申请</el-button> -->
      </template>
      <el-table-column label="操作" width="250px" align="center">
        <template #default="{ row }">
          <tt-mini-button type="primary" @click="handleControll(row)">厂商管理</tt-mini-button>
          <tt-mini-button type="success" @click="handleControll(row)">项目成员</tt-mini-button>
          <tt-mini-button @click="handleControll(row)">项目看板</tt-mini-button>
        </template>
      </el-table-column>
    </tt-table>
  </div>
  <dialog-add-project v-model:dialogVisible="dialogVisible"></dialog-add-project>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
import { toRefs, reactive, onBeforeMount } from 'vue'
import { getList } from '@/api/titan/project/list'
import TtTable from '@/components/tt-components/table'
import TtMiniButton from '@/components/tt-components/button/TtMiniButton.vue'
import DialogAddProject from './components/DialogAddProject.vue'

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
    { label: 'PID', prop: 'pid', sortable: true },
    { label: '项目名称', prop: 'name' },
    { label: '开始时间', prop: 'start_time', sortable: true },
    { label: '结束时间', prop: 'end_time' },
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
