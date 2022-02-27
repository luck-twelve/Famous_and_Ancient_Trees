<template>
  <div class="app-container">
    <el-form :inline="true" :model="formData" class="demo-form-inline">
      <el-form-item prop="tree_nameZh">
        <el-input v-model="formData.tree_nameZh" clearable>
          <template #prepend>树名</template>
        </el-input>
      </el-form-item>
      <el-form-item prop="tree_species">
        <el-input v-model="formData.tree_species" clearable>
          <template #prepend>树种</template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
      </el-form-item>
    </el-form>
    <tt-table :list="list" :loading="listLoading" :column="tableColumn" :search-data="formData" @pagination="getList">
      <template #header>
        <el-button type="primary" :icon="Plus" @click="handleAdd">新增</el-button>
      </template>
      <el-table-column label="操作" width="140px" align="center" fixed="right">
        <template #default="{ row }">
          <el-button type="text" :icon="Edit" @click="handleEdit(row)">编辑</el-button>
          <el-popconfirm
            :icon="InfoFilled"
            placement="left"
            title="删除后将无法恢复，是否确认删除?"
            @confirm="handleDelete(row)"
          >
            <template #reference>
              <el-button type="text" :icon="Delete" style="color: red">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </tt-table>
  </div>
  <archives-list-dialog
    v-model:dialogVisible="dialogVisible"
    :dialog-type="dialogType"
    :dialog-data="dialogData"
    @success="getList"
  ></archives-list-dialog>
</template>

<script setup>
import { Search, Plus, Edit, Delete, InfoFilled } from '@element-plus/icons-vue'
import { toRefs, reactive, onBeforeMount } from 'vue'
import { getArchivesTreeListReq, deleteArchivesTreeReq } from '@/api/archives'
import TtTable from '@/components/tt-components/table'
import ArchivesListDialog from './archives-list-dialog.vue'

/**
 * 搜索
 */
const formData = reactive({
  tree_nameZh: '',
  tree_species: ''
})
const handleSearch = () => {
  getList(formData)
}

/**
 * table
 */
const state = reactive({
  list: {},
  tableColumn: [
    { label: 'ID', prop: 'archive_id', width: '80px', align: 'center', sortable: true },
    { label: '树名', prop: 'tree_nameZh', width: '150px' },
    { label: '英文名', prop: 'tree_nameEn', width: '150px' },
    { label: '树龄', prop: 'tree_ageReal', width: '120px', sortable: true },
    { label: '树种', prop: 'tree_species', width: '150px', sortable: true },
    { label: '树高', prop: 'tree_height', minWidth: '150px' },
    { label: '地围', prop: 'ground_circumference', minWidth: '150px' }
  ],
  listLoading: true
})

// 弹窗
const dialog = reactive({
  dialogType: 'add',
  dialogVisible: false,
  dialogData: {}
})

/**
 * 新增
 */
const handleAdd = () => {
  dialog.dialogType = 'add'
  dialog.dialogVisible = true
  dialog.dialogData = {}
}

/**
 * 编辑
 */
const handleEdit = (row) => {
  dialog.dialogType = 'edit'
  dialog.dialogVisible = true
  dialog.dialogData = row
}

/**
 * 删除
 */
const handleDelete = (row) => {
  deleteArchivesTreeReq(row.archive_id).then(({ data }) => {
    getList()
  })
}

// 初始化
onBeforeMount(() => {
  getList()
})

const getList = (params = {}) => {
  state.listLoading = true
  // getArchivesTreeListReq(params)
  getArchivesTreeListReq(params).then(({ data }) => {
    state.list = data
    state.listLoading = false
  })
}

//导出属性到页面中使用
let { dialogVisible, dialogType, dialogData } = toRefs(dialog)
let { list, listLoading, tableColumn } = toRefs(state)
</script>

<style scoped lang="scss"></style>
