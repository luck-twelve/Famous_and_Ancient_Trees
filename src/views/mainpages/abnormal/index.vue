<template>
  <div class="app-container">
    <el-form :inline="true" :model="formData">
      <el-form-item prop="username">
        <el-input v-model="formData.username" clearable>
          <template #prepend>上报人</template>
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
      <el-table-column label="操作" width="130px" align="center" fixed="right">
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
    <el-dialog v-model="visible" :title="`${dialogType}异常信息`" width="450px" :before-close="handleClose">
      <el-form v-if="visible" ref="dialogForm" :model="dialogData" label-width="80px">
        <el-form-item label="树名" prop="tree_name" :rules="formRulesMixin.isNotNull">
          <el-input v-model="dialogData.tree_name" clearable />
        </el-form-item>
        <el-form-item label="经度" prop="longitude" :rules="formRulesMixin.isNotNull">
          <el-input v-model="dialogData.longitude" clearable />
        </el-form-item>
        <el-form-item label="纬度" prop="latitude" :rules="formRulesMixin.isNotNull">
          <el-input v-model="dialogData.latitude" clearable />
        </el-form-item>
        <el-form-item label="异常情况" prop="ab_condition" :rules="formRulesMixin.isNotNull">
          <el-input v-model="dialogData.ab_condition" clearable />
        </el-form-item>
        <el-form-item label="造成原因" prop="reason" :rules="formRulesMixin.isNotNull">
          <el-input v-model="dialogData.reason" clearable placeholder="没有则填 “未知”" />
        </el-form-item>
        <el-form-item label="期望解决" prop="resolve" :rules="formRulesMixin.isNotNull">
          <el-input v-model="dialogData.resolve" clearable placeholder="没有则填 “无”" />
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
import { getAbnormalListReq, updateAbnormalReq, deleteAbnormalReq } from '@/api/abnormal'
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
    { label: '编号', prop: 'id', width: '160px' },
    { label: '树名', prop: 'tree_name', minWidth: '130px' },
    { label: '经度', prop: 'longitude', minWidth: '120px', sortable: true },
    { label: '纬度', prop: 'latitude', minWidth: '120px', sortable: true },
    { label: '上传用户', prop: 'uid', minWidth: '120px', sortable: true },
    { label: '上传时间', prop: 'create_time', minWidth: '150px', sortable: true }
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
  dialog.dialogType = '上传'
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
      updateAbnormalReq(dialog.dialogData).then(({ data }) => {
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
  deleteAbnormalReq(row.id).then(({ data }) => {
    getList(formData)
  })
}

// 初始化
onBeforeMount(() => {
  getList()
})

const getList = (params = {}) => {
  state.listLoading = true
  getAbnormalListReq(params).then(({ data }) => {
    state.list = data
    state.listLoading = false
  })
}

//导出属性到页面中使用
let { visible, dialogData, dialogType } = toRefs(dialog)
let { list, listLoading, tableColumn } = toRefs(state)

const initForm = () => {
  return {
    id: '', // 编号
    tree_name: '', // 树名
    longitude: '', // 经度
    latitude: '', // 纬度
    reason: '', // 造成原因
    ab_condition: '', // 异常情况
    resolve: '' // 期望解决
  }
}
</script>

<style scoped lang="scss"></style>
