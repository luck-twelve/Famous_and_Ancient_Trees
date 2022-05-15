<template>
  <div class="ctr-dialog">
    <el-dialog v-model="visible" title="异常处理" width="450px" :before-close="handleClose">
      <el-radio v-model="state.radio" label="1" size="large">接受</el-radio>
      <el-radio v-model="state.radio" label="2" size="large">不予处理</el-radio>
      <el-form v-if="state.radio == 1" :model="state.form1">
        <el-form-item label="选择处理人员">
          <el-input v-model="state.form1.name" disabled>
            <template #append>
              <el-button type="primary" :icon="Search" @click="state.workerVisible = true"></el-button>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <el-form v-if="state.radio == 2" :model="state.form2">
        <el-form-item label="拒绝原因">
          <el-input v-model="state.form2.name" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="handleClose">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
  <worker-dialog
    v-if="state.workerVisible"
    v-model:visible="state.workerVisible"
    @before-close="state.workerVisible = false"
    @comfirm="
      (val) => {
        state.form1.name = val.real_name
      }
    "
  ></worker-dialog>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
import { reactive, toRefs } from 'vue'
import WorkerDialog from './dialog-worker.vue'

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
  radio: '',
  form1: {},
  form2: {},
  workerVisible: false
})

const emit = defineEmits(['beforeClose', 'submit'])
const handleClose = () => {
  emit('beforeClose')
}
</script>

<style lang="scss" scoped>
// .ctr-dialog {
//   &:deep(.el-dialog) {
//     margin: 10px auto 0 auto !important;
//   }
// }
</style>
