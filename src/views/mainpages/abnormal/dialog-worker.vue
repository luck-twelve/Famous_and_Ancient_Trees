<template>
  <div class="worker-dialog">
    <el-dialog v-model="visible" title="选择工作人员" width="700px" :before-close="handleClose">
      <el-form :inline="true" :model="state.formData" class="demo-form-inline">
        <el-form-item prop="id">
          <el-input v-model="state.formData.id" clearable>
            <template #prepend>编号</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="real_name">
          <el-input v-model="state.formData.real_name" clearable>
            <template #prepend>姓名</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
        </el-form-item>
      </el-form>
      <tt-table
        :list="state.tableList"
        :loading="state.listLoading"
        :column="state.tableColumn"
        :search-data="state.formData"
        no-header
        multiple
        :default-page-size="5"
        @pagination="getTableList"
        @selection-change="selectionChange"
      >
        <el-table-column label="头像" align="center">
          <template #default="{ row }">
            <el-avatar shape="square" :src="row.avatar" />
          </template>
        </el-table-column>
        <el-table-column label="角色权限" align="center">
          <template #default="{ row }">
            <el-tag :type="row.tag">工作人员</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="注册时间" align="center">
          <template #default="{ row }">
            {{ row.create_time }}
          </template>
        </el-table-column>
      </tt-table>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="handleComfirm">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
import { reactive, toRefs, onBeforeMount } from 'vue'
import TtTable from '@/components/tt-components/table'
import { getWorkerListReq } from '@/api/user'

const props = defineProps({
  visible: {
    require: true,
    default: false,
    type: Boolean
  }
})
//导出属性到页面中使用
let { visible } = toRefs(props)

const state = reactive({
  formData: {},
  tableList: [],
  listLoading: false,
  tableColumn: [{ label: '姓名', prop: 'real_name', width: '100px' }],

  checkedWorker: {}
})

// 获取表格列表
const getTableList = () => {
  state.listLoading = true
  getWorkerListReq().then(({ data }) => {
    state.tableList = data
    state.listLoading = false
  })
}

// 点击多选框
const selectionChange = (val) => {
  state.checkedWorker = val
}

onBeforeMount(() => {
  getTableList()
})

const emit = defineEmits(['beforeClose', 'comfirm'])

// 提交
const handleComfirm = () => {
  emit('comfirm', state.checkedWorker)
  handleClose()
}

// 关闭
const handleClose = () => {
  emit('beforeClose')
}
</script>

<style lang="scss" scoped>
.worker-dialog {
  &:deep(.el-dialog) {
    margin: 70px auto 0 auto !important;
  }
}
</style>
