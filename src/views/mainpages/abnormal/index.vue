<template>
  <div class="app-container">
    <el-form :inline="true" :model="formData">
      <el-form-item prop="name">
        <el-input v-model="formData.name" clearable>
          <template #prepend>树种名称</template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
      </el-form-item>
    </el-form>
    <tt-table :list="list" :loading="listLoading" :column="tableColumn" :search-data="formData" @pagination="getList">
      <template #header>
        <el-button type="primary" :icon="Plus" @click="handleAdd">异常上报</el-button>
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
    <el-dialog v-model="visible" :title="`${dialogType}树种`" width="450px" :before-close="handleClose">
      <el-form ref="dialogForm" :model="dialogData" label-width="80px">
        <el-form-item label="树种名称" prop="name" :rules="formRulesMixin.isNotNull">
          <el-input v-model="dialogData.name" clearable />
        </el-form-item>
        <el-form-item label="字典值" prop="value" :rules="formRulesMixin.isNotNull">
          <el-input v-model="dialogData.value" clearable />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="handleCommit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { Search, Plus, Edit, Delete, InfoFilled } from '@element-plus/icons-vue'
import { toRefs, reactive, onBeforeMount, getCurrentInstance } from 'vue'
import { getArchivesSpeciesListReq, updateArchivesSpeciesReq, deleteArchivesSpeciesReq } from '@/api/archives'
import TtTable from '@/components/tt-components/table'
let { proxy } = getCurrentInstance()

/**
 * 搜索
 */
const formData = reactive({
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
    { label: '编号', prop: 'id', width: '250px', sortable: true },
    { label: '树种名称', prop: 'name', minWidth: '130px' },
    { label: '字典值', prop: 'value', minWidth: '120px', sortable: true }
  ],
  listLoading: true
})

const dialog = reactive({
  visible: false,
  dialogData: {},
  dialogType: ''
})
const handleClose = () => {
  dialog.visible = false
  getList(formData)
}
/**
 * 新增
 */
const handleAdd = () => {
  dialog.visible = true
  dialog.dialogType = '新增'
  dialog.dialogData = initForm()
}
/**
 * 编辑
 */
const handleEdit = (row) => {
  dialog.visible = true
  dialog.dialogType = '编辑'
  dialog.dialogData = row
}
/**
 * 保存
 */
const handleCommit = async () => {
  proxy.$refs['dialogForm'].validate((valid) => {
    if (valid) {
      updateArchivesSpeciesReq(dialog.dialogData).then(({ data }) => {
        if (data.flag) {
          handleClose()
        }
      })
    } else {
      return false
    }
  })
}

/**
 * 删除
 */
const handleDelete = (row) => {
  deleteArchivesSpeciesReq(row.id).then(({ data }) => {
    getList(formData)
  })
}

// 初始化
onBeforeMount(() => {
  getList()
})

const getList = (params = {}) => {
  state.listLoading = true
  getArchivesSpeciesListReq(params).then(({ data }) => {
    state.list = data
    state.listLoading = false
  })
}

//导出属性到页面中使用
let { visible, dialogData, dialogType } = toRefs(dialog)
let { list, listLoading, tableColumn } = toRefs(state)

const initForm = () => {
  return {
    id: '', // 树种编号
    name: '', // 名称
    value: '' // 值
  }
}
</script>

<style scoped lang="scss"></style>
